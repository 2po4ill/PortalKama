import {IReservationItem} from "entities/Reservation/model/types/reservation";

export interface Post {
    post_id: number;
    title: string;
    images: string[];
    text: string; // текст новости
    likes_amount?: number; // кол-во лайков
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface PostSchema {
    posts: Post[] | [];
    isLoading: boolean;
    error: string | undefined;
}

export interface IPostData {
    status: boolean;
    articles: Post[];
}

