
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

export interface IPostsPageProps {
    className?: string;
}

const PostsPage = ({ className }: IPostsPageProps ) => {
    const posts = useSelector(postSelectors.getPostsList);
    const isLoading = useSelector(postSelectors.getIsLoading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(postActions.getPostsList());
    }, [dispatch]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(undefined);

    const postClickHandler = () => {
        setModalIsOpen(true);
    }

    return (
        <AsyncReducerProvider name={'post'} reducer={postReducer} destroy={false} >
            {!isLoading ?
            <div className={classNames(cls.IPostsPageProps, {}, [className])}>
                <PostsPageLayout
                    header={<PostsHeader />}
                    content={<PostsList posts={posts}/>}
                    aside={<PostsAside />} />
                <PostModal isOpen={modalIsOpen} onClose={() => {setModalIsOpen(false);}} />
            </div>
                : <PageLoader/>}
        </AsyncReducerProvider>
    );
};

export default PostsPage;