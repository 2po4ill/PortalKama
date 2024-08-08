import React, {FC} from "react";
import {Comment} from "entities/Post/model/types/post";

export interface IComment {
    className?: string;
    comment: Comment;
}

    export const CommentNode: FC<IComment> = (props) => {
    const {
        className,
        comment
    } = props;



    return (
        <div className={className}>
            {comment.user_id}
            {comment.body}
        </div>
    );
};