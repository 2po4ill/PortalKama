

export interface Post {
    post_id: number;
    title: string;
    images: string[];
    text: string; // текст новости
    likes_amount?: number; // кол-во лайков
    tags?: string[];
    creation_date?: string;
    update_date?: string;
}

export interface PostSchema {
    posts: Post[] | [];
    post: Post | undefined;
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
    article: Post;
}

export interface Tag {
    tag_id: number;
    name: string;
    color: string;
}

