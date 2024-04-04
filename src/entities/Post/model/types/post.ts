
export interface Post {
    id: string;
    title: string;
    img: string[];
    text: string; // текст новости
    views?: number; // кол-во просмотров
    tags?: string[];
    // blocks: IArticleBlock[];
    createdAt?: string;
    updatedAt?: string;
}

export interface PostSchema {
    posts: Post[] | [];
    isLoading: boolean;
    error: string | undefined;
}

