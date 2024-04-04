
import {classNames} from "shared/lib/classNames";
import cls from './PostsPage.module.scss'
import {memo, useState} from "react";
import {PostsList} from "widgets/post/PostsList";
import {PostsPageLayout} from "shared/layouts/PostsPageLayout/PostsPageLayout";
import {PostModal} from "features/post/PostModal";
import {PostsHeader} from "widgets/post/PostsHeader";
import {PostsAside} from "widgets/post/PostsAside";

export interface IPostsPageProps {
    className?: string;
}

const PostsPage = (props: IPostsPageProps ) => {
    const { className } = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(undefined);

    const postClickHandler = () => {
        setModalIsOpen(true);
    }

    return (
        <div className={classNames(cls.IPostsPageProps, {}, [className])}>
            <PostsPageLayout
                header={<PostsHeader />}
                content={<PostsList />}
                aside={<PostsAside />} />
            <PostModal isOpen={modalIsOpen} onClose={() => {setModalIsOpen(false);}} />
        </div>
    );
};

export default memo(PostsPage);