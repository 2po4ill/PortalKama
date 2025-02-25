
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
import user_pic from "shared/assets/icons/userpic.png"

export interface IPostsPageProps {
    className?: string;
}

const PostsPage = ({ className }: IPostsPageProps ) => {
    const posts = useSelector(postSelectors.getPostsList);
    const uid = useSelector(userSelectors.getUser).uid;
    const tags = useSelector(postSelectors.getTags);
    const total_views = useSelector(postSelectors.getTotalViews);
    const comments = useSelector(postSelectors.checkComments)
    const isLoading = useSelector(postSelectors.getIsLoading);
    const userRole = useSelector(userSelectors.getUser).role;
    const dispatch = useAppDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post|undefined>(undefined);
    const [selectedDateStart, setSelectedDateStart] = useState<Date | undefined>(undefined);
    const [selectedDateEnd, setSelectedDateEnd] = useState<Date | undefined>(undefined);
    const [tagList, setSelectedTags] = useState<number[] | []>([]);

    useEffect(() => {
        dispatch(postActions.getTags());
    }, [dispatch]);
    useEffect(() => {
        dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd), user_id: uid}));
    }, [dispatch]);


    const postClickHandler = () => {
        setModalIsOpen(true);
    }

    const apiSearchCall = () => {
        dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd), user_id: uid}));
        setSelectedTags([])
    }

    const cancelApi = () => {
        setSelectedTags([])
        dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd), user_id: uid}))
    }
    const addLikeApiCall = (post_id: number) => {
        dispatch(postActions.addLike({post_id: post_id}));
        alert("Тема добавлена")
        setTimeout(() => dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd), user_id: uid})), 50);
    }

    const editTagApiCall = (tag_id: number, name: string, background_color: string, text_color: string) => {
        dispatch(postActions.editTag({tag_id: tag_id, name: name, background_color: background_color, text_color: text_color}));
        alert("Тема изменена")
        setTimeout(() => dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd), user_id: uid})), 50);
    }

    const createTagApiCall = (name: string, background_color: string, text_color: string) => {
        dispatch(postActions.createTag({name: name, background_color: background_color, text_color: text_color}));
        alert("Тема добавлена")
        setTimeout(() => dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd), user_id: uid})), 50);
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
        setTimeout(() => dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd), user_id: uid})), 50);
    }

    const editArticleApiCall = (post_id: number, title: string, text: string, images: File | undefined, tags: number[]) => {
        dispatch(postActions.editArticle({post_id: post_id, title: title, text: text, images: images, tags: tags}));
        alert("Новость изменена")
        setTimeout(() => dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd), user_id: uid})), 50);
    }

    const deleteArticleApiCall = (post_id: number) => {
        dispatch(postActions.deleteArticle({post_id: post_id}));
        alert("Новость удалена")
        setTimeout(() => dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd), user_id: uid})), 50);
    }

    const createArticleApiCall = (title: string, text: string, images: File | undefined, tags: number[]) => {
        dispatch(postActions.createArticle({title: title, text: text, images: images, tags: tags}));
        alert("Новость создана и записана")
        setTimeout(() => dispatch(postActions.getPostsList({tags: tagList, start: Number(selectedDateStart), finish: Number(selectedDateEnd), user_id: uid})), 50);
    }


    return (
        <AsyncReducerProvider name={'post'} reducer={postReducer} destroy={false} >
            {!isLoading ?
            <div className={classNames(cls.IPostsPageProps, {}, [className])}>
                <h1>Новости</h1>
                <PostsPageLayout
                    header={<PostsHeader />}
                    content={<PostsList posts={posts}
                                        postClickHandler={postClickHandler}
                                        setSelectedPost={setSelectedPost}
                                        apiCall = {createArticleApiCall}
                                        approveCommentApiCall={approveCommentApiCall}
                                        deleteApiCall={deleteCommentApiCall}
                                        addLikeApiCall={addLikeApiCall}
                                        role={userRole}
                                        tags={tags}
                                        comments={comments}/>}
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
                <div className={cls.total_views}>
                    <img src={user_pic} alt={"user_pic"} className={cls.img}/>
                    <label> {total_views ? total_views : 0} </label>
                </div>
            </div>
                : <PageLoader/>}
        </AsyncReducerProvider>
    );
};

export default PostsPage;