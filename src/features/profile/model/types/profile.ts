
// Данные с сервера
export interface Profile {
    fullname: string;
    position: string;
    department: string;
}

export interface IProfileData {
    status: string;
    profile: Profile
}

export interface ProfileSchema {
    profile: Profile;
    isLoading: boolean;
    error: string | undefined;
}