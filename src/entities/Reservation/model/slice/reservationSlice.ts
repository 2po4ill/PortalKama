import {IReservationData, IReservationMade, ReservationSchema} from "../types/reservation";
import {createAppSlice} from "shared/lib/createAppSlice/createAppSlice";
import {IThunkConfig} from "app/providers/StoreProvider";

const initialState: ReservationSchema = {
    reservations: [],
    userReservationList: [],
    lockerReservations: [],
    employees: [],
    isLoading: false,
    error: undefined
}


const reservationSlice = createAppSlice({
    name: "reservation",
    initialState,
    reducers: (create) => {
        const createAThunk = create.asyncThunk.withTypes<IThunkConfig<string>>();

        return {
            getReservationList: createAThunk<{start: number, finish: number} | undefined, IReservationData>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    const placeData = await extra.api.get<IReservationData>("/reservation_list?start=" + data?.start + "&finish=" + data?.finish);
                    return placeData.data;
                } catch (err) {
                    console.log("Something went wrong" + err);
                    return rejectWithValue(String(err));
                }
            },{
                pending: state => {
                    return {
                        ...state,
                        isLoading: true,
                        error: undefined
                    }
                },
                fulfilled: (state, action) => {
                    const reservationList = action.payload.reservation_list;
                    return {
                        ...state,
                        reservations: reservationList,
                        error: undefined,
                        isLoading: false
                    }
                },
                rejected: (state, action) => {
                    return {
                        ...state,
                        error: String(action.payload),
                        isLoading: false
                    }
                }
            }),
            getReservationLockerList: createAThunk<{start: number, finish: number} | undefined, IReservationData>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    const lockerData = await extra.api.get<IReservationData>("/locker_reservation_list?start=" + data?.start + "&finish=" + data?.finish);
                    return lockerData.data;
                } catch (err) {
                    console.log("Something went wrong" + err);
                    return rejectWithValue(String(err));
                }
            },{
                pending: state => {
                    return {
                        ...state,
                        isLoading: true,
                        error: undefined
                    }
                },
                fulfilled: (state, action) => {
                    const reservationList = action.payload.locker_reservation_list;
                    return {
                        ...state,
                        lockerReservations: reservationList,
                        error: undefined,
                        isLoading: false
                    }
                },
                rejected: (state, action) => {
                    return {
                        ...state,
                        error: String(action.payload),
                        isLoading: false
                    }
                }
            }),
            getUserReservations: createAThunk<undefined, IReservationData>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    const userData = await extra.api.get<IReservationData>("/user_reservations");
                    return userData.data;
                } catch (err) {
                    console.log("Something went wrong" + err);
                    return rejectWithValue(String(err));
                }
            },{
                pending: state => {
                    return {
                        ...state,
                        isLoading: true,
                        error: undefined
                    }
                },
                fulfilled: (state, action) => {
                    const userReservationList = action.payload.user_reservations;
                    return {
                        ...state,
                        userReservationList: userReservationList,
                        error: undefined,
                        isLoading: false
                    }
                },
                rejected: (state, action) => {
                    return {
                        ...state,
                        error: String(action.payload),
                        isLoading: false
                    }
                }
            }),
            getPhoneBook: createAThunk<undefined, IReservationData>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    const userData = await extra.api.get<IReservationData>("/phone_book");
                    return userData.data;
                } catch (err) {
                    console.log("Something went wrong" + err);
                    return rejectWithValue(String(err));
                }
            },{
                pending: state => {
                    return {
                        ...state,
                        isLoading: true,
                        error: undefined
                    }
                },
                fulfilled: (state, action) => {
                    const employees = action.payload.employees;
                    return {
                        ...state,
                        employees: employees,
                        error: undefined,
                        isLoading: false
                    }
                },
                rejected: (state, action) => {
                    return {
                        ...state,
                        error: String(action.payload),
                        isLoading: false
                    }
                }
            }),
            reservation: createAThunk<{ place_id: number, start: number, finish: number }, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                const {place_id, finish, start} = data;
                try {
                    return await extra.api.post("/reservation", {"place_id": place_id, "start": start, "finish": finish});
                } catch (err) {
                    console.log("Something went wrong" + err);
                    return rejectWithValue(String(err));
                }
            },{
                pending: state => {
                    state.error = undefined;
                },
                fulfilled: (state, action) => {
                    state.error = undefined;
                },
                rejected: (state, action) => {
                    state.error = String(action.payload);
                }
            }),
            locker_reservation: createAThunk<IReservationMade, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                const {place_id, finish, start} = data;
                try {
                    return await extra.api.post("/locker_reservation", {"locker_id": place_id, "start": start, "finish": finish});
                } catch (err) {
                    console.log("Something went wrong" + err);
                    return rejectWithValue(String(err));
                }
            },{
                pending: state => {
                    state.error = undefined;
                },
                fulfilled: (state, action) => {
                    state.error = undefined;
                },
                rejected: (state, action) => {
                    state.error = String(action.payload);
                }
            }),
            drop_reservation: createAThunk<number, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    return await extra.api.post("/reservation_drop", {"reservation_id": data});
                } catch (err) {
                    console.log("Something went wrong" + err);
                    return rejectWithValue(String(err));
                }
            },{
                pending: state => {
                    state.error = undefined;
                },
                fulfilled: (state, action) => {
                    state.error = undefined;
                },
                rejected: (state, action) => {
                    state.error = String(action.payload);
                }
            }),
            personal_mail: createAThunk<string, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    return await extra.api.post("/update_personal_mail", {"personal_mail": data});
                } catch (err) {
                    console.log("Something went wrong" + err);
                    return rejectWithValue(String(err));
                }
            },{
                pending: state => {
                    state.error = undefined;
                },
                fulfilled: (state, action) => {
                    state.error = undefined;
                },
                rejected: (state, action) => {
                    state.error = String(action.payload);
                }
            }),
            personal_mobile: createAThunk<string, void>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    return await extra.api.post("/update_personal_mobile", {"personal_mobile": data});
                } catch (err) {
                    console.log("Something went wrong" + err);
                    return rejectWithValue(String(err));
                }
            },{
                pending: state => {
                    state.error = undefined;
                },
                fulfilled: (state, action) => {
                    state.error = undefined;
                },
                rejected: (state, action) => {
                    state.error = String(action.payload);
                }
            })
        }
    }
})

export const { actions: reservationActions, reducer: reservationReducer } = reservationSlice;