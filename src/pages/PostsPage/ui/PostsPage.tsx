
import {classNames} from "shared/lib/classNames";
import cls from './PostsPage.module.scss'
import {useEffect, useState} from "react";
import {PostsList} from "widgets/post/PostsList";
import {PostsPageLayout} from "shared/layouts/PostsPageLayout/PostsPageLayout";
import {PostModal} from "features/post/PostModal";
import {PostsHeader} from "widgets/post/PostsHeader";
import {PostsAside} from "widgets/post/PostsAside";
import {useSelector} from "react-redux";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {postSelectors} from "entities/Post/model/selectors/postSelectors";
import {postActions, postReducer} from "entities/Post/model/slice/postSlice";
import {PageLoader} from "widgets/PageLoader";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {Post} from "entities/Post";
import {userSelectors} from "entities/User";

export interface IPostsPageProps {
    className?: string;
}

const PostsPage = ({ className }: IPostsPageProps ) => {
    const posts = useSelector(postSelectors.getPostsList);
    const tags = useSelector(postSelectors.getTags);
    const isLoading = useSelector(postSelectors.getIsLoading);
    const userRole = useSelector(userSelectors.getUser).role;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(postActions.getTags());
    }, [dispatch]);
    useEffect(() => {
        dispatch(postActions.getPostsList());
    }, [dispatch]);


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post|undefined>(undefined);
    const [selectedDateStart, setSelectedDateStart] = useState<Date | undefined>(undefined);
    const [selectedDateEnd, setSelectedDateEnd] = useState<Date | undefined>(undefined);
    const [tagList, setSelectedTags] = useState<number[] | []>([]);

    const postClickHandler = () => {
        setModalIsOpen(true);
    }

    const apiSearchCall = () => {
        dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd)}));
        setSelectedTags([])
    }

    const cancelApi = () => {
        setSelectedTags([])
        dispatch(postActions.getPostsList())
    }

    const editTagApiCall = (tag_id: number, name: string, background_color: string, text_color: string) => {
        dispatch(postActions.editTag({tag_id: tag_id, name: name, background_color: background_color, text_color: text_color}));
        alert("Тема изменена")
        setTimeout(() => dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd)})), 50);
    }

    const createTagApiCall = (name: string, background_color: string, text_color: string) => {
        dispatch(postActions.createTag({name: name, background_color: background_color, text_color: text_color}));
        alert("Тема добавлена")
        setTimeout(() => dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd)})), 50);
    }

    const approveCommentApiCall = (comment_id: number) => {
        dispatch(postActions.approveComment({comment_id: comment_id}));
        alert("Комментарий подтвержден")
        setTimeout(() => dispatch(postActions.checkComments()), 50);
    }

    const deleteCommentApiCall = (comment_id: number) => {
        dispatch(postActions.deleteComment({comment_id: comment_id}));
        alert("Комментарий удален")
        setTimeout(() => dispatch(postActions.checkComments()), 50);
    }

    const deleteTagApiCall = (tag_id: number) => {
        dispatch(postActions.deleteTag({tag_id: tag_id}));
        alert("Новость удалена")
        setTimeout(() => dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd)})), 50);
    }

    const editArticleApiCall = (post_id: number, title: string, text: string, images: string[], tags: number[]) => {
        dispatch(postActions.editArticle({post_id: post_id, title: title, text: text, images: images, tags: tags}));
        alert("Новость изменена")
        setTimeout(() => dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd)})), 50);
    }

    const deleteArticleApiCall = (post_id: number) => {
        dispatch(postActions.deleteArticle({post_id: post_id}));
        alert("Новость удалена")
        setTimeout(() => dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd)})), 50);
    }

    const createArticleApiCall = (title: string, text: string, images: string[], tags: number[]) => {
        dispatch(postActions.createArticle({title: title, text: text, images: images, tags: tags}));
        alert("Новость создана и записана")
        setTimeout(() => dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd)})), 50);
    }


    return (
        <AsyncReducerProvider name={'post'} reducer={postReducer} destroy={false} >
            {!isLoading ?
            <div className={classNames(cls.IPostsPageProps, {}, [className])}>
                <PostsPageLayout
                    header={<PostsHeader />}
                    content={<PostsList posts={posts}
                                        postClickHandler={postClickHandler}
                                        setSelectedPost={setSelectedPost}
                                        apiCall = {createArticleApiCall}
                                        approveCommentApiCall={approveCommentApiCall}
                                        deleteApiCall={deleteCommentApiCall}
                                        role={userRole}
                                        tags={tags}/>}
                    aside={<PostsAside setSelectedDateEnd={setSelectedDateEnd}
                                       setSelectedDateStart={setSelectedDateStart}
                                       selectedDateEnd={selectedDateEnd}
                                       selectedDateStart={selectedDateStart}
                                       tags={tags}
                                       tagList={tagList}
                                       apiCall={apiSearchCall}
                                       apiCancel={cancelApi}
                                       setSelectedTags={setSelectedTags}
                                       createTagApiCall={createTagApiCall}
                                       editTagApiCall={editTagApiCall}
                                       deleteTagApiCall={deleteTagApiCall}
                                        role={userRole}/>} />
                {modalIsOpen ?
                    <PostModal isOpen={modalIsOpen}
                               onClose={() => {setModalIsOpen(false);}}
                               selectedPost={selectedPost}
                               deleteApiCall={deleteArticleApiCall}
                               role={userRole}
                               deleteCommentApiCall={deleteCommentApiCall}
                               editApiCall={editArticleApiCall}
                                tags={tags}/>
                    : null}
            </div>
                : <PageLoader/>}
        </AsyncReducerProvider>
    );
};

export default PostsPage;