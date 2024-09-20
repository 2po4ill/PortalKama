

export interface Post {
    post_id: number;
    title: string;
    images: string[];
    text: string; // текст новости
    likes_amount?: number; // кол-во лайков
    tags?: Tag[];
    creation_date: string;
    update_date?: string;
    postDesc?: PostDesc;
}

export interface PostDesc{
    post_id: number;
    text: string;
    comments?: Comment[];
}

export interface PostSchema {
    posts: Post[] | [];
    post: PostDesc | undefined;
    tags: Tag[] | [];
    isLoading: boolean;
    isPostLoading: boolean;
    error: string | undefined;
}

export interface IPostData {
    status: boolean;
    articles: Post[];
}

export interface IPostTags {
    status: boolean;
    tags: Tag[];
}

export interface IPostInfo {
    status: boolean;
    article: PostDesc;
}

export interface Tag {
    tag_id: number;
    name: string;
    color: string;
}

export interface Comment {
    user_id: number;
    full_name: string;
    department: string;
    position: string;
    comment_id: number;
    post_id: number;
    text: string;
    creation_date: string;
    updated_at?: string;
}

