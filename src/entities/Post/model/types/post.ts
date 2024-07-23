

export interface Post {
    post_id: number;
    title: string;
    images: string[];
    text: string; // текст новости
    likes_amount?: number; // кол-во лайков
    tags?: string[];
    creation_date?: string;
    update_date?: string;
    postDesc?: PostDesc;
}

export interface PostDesc{
    text: string;
    comments?: string[];
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

export interface IPostInfo {
    status: boolean;
    article: PostDesc;
}

export interface Tag {
    tag_id: number;
    name: string;
    color: string;
}

