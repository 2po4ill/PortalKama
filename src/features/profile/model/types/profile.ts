
// Данные с сервера
export interface Profile {
    full_name: string;
    position: string;
    photo_path: string;
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