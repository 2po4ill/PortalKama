
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
import {Tag} from "entities/Post/model/types/post";

export interface IPostsPageProps {
    className?: string;
}

const PostsPage = ({ className }: IPostsPageProps ) => {
    const posts = useSelector(postSelectors.getPostsList);
    const tags = useSelector(postSelectors.getTags);
    const isLoading = useSelector(postSelectors.getIsLoading);
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
    const [tagList, setSelectedTags] = useState<string[] | []>([]);

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

    return (
        <AsyncReducerProvider name={'post'} reducer={postReducer} destroy={false} >
            {!isLoading ?
            <div className={classNames(cls.IPostsPageProps, {}, [className])}>
                <PostsPageLayout
                    header={<PostsHeader />}
                    content={<PostsList posts={posts}
                                        postClickHandler={postClickHandler}
                                        setSelectedPost={setSelectedPost}/>}
                    aside={<PostsAside setSelectedDateEnd={setSelectedDateEnd}
                                       setSelectedDateStart={setSelectedDateStart}
                                       selectedDateEnd={selectedDateEnd}
                                       selectedDateStart={selectedDateStart}
                                       tags={tags}
                                       tagList={tagList}
                                       apiCall={apiSearchCall}
                                       apiCancel={cancelApi}
                                       setSelectedTags={setSelectedTags}/>} />
                {modalIsOpen ? <PostModal isOpen={modalIsOpen} onClose={() => {setModalIsOpen(false);}} selectedPost={selectedPost} /> : null}
            </div>
                : <PageLoader/>}
        </AsyncReducerProvider>
    );
};

export default PostsPage;