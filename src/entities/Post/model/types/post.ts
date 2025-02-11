

export interface Post {
    post_id: number;
    title: string;
    images: string[];
    text: string; // текст новости
    likes_amount?: number; // кол-во лайков
    tags?: Tag[];
    views: number;
    comments_amount: number;
    is_liked: boolean;
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
    comments: Comment[] | [];
    total_views: number;
    isLoading: boolean;
    isPostLoading: boolean;
    error: string | undefined;
}

export interface IPostData {
    status: boolean;
    articles: Post[];
    total_views: number;
}

export interface IPostTags {
    status: boolean;
    tags: Tag[];
}

export interface IPostComments {
    status: boolean;
    comments: Comment[];
}

export interface IPostInfo {
    status: boolean;
    article: PostDesc;
}

export interface Tag {
    tag_id: number;
    name: string;
    background_color: string;
    text_color: string;
}

export interface Comment {
    user_id: number;
    full_name: string;
    department: string;
    image_path?: string;
    position: string;
    comment_id: number;
    post_id: number;
    text: string;
    creation_date: string;
    updated_at?: string;
}

