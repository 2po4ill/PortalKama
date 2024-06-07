import {IReservationData, ReservationSchema} from "../types/reservation";
import {createAppSlice} from "shared/lib/createAppSlice/createAppSlice";
import {IThunkConfig} from "app/providers/StoreProvider";

const initialState: ReservationSchema = {
    reservations: [],
    isLoading: false,
    error: undefined
}


const reservationSlice = createAppSlice({
    name: "reservation",
    initialState,
    reducers: (create) => {
        const createAThunk = create.asyncThunk.withTypes<IThunkConfig<string>>();

        return {
            getReservationList: createAThunk<undefined, IReservationData>(async (data, thunkAPI) => {
                const {rejectWithValue, extra} = thunkAPI;
                try {
                    const placeData = await extra.api.get<IReservationData>("/reservation_list");
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
            })
        }
    }
})

export const { actions: reservationActions, reducer: reservationReducer } = reservationSlice;