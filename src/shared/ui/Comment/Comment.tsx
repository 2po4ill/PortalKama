import React, {FC} from "react";
import {Comment} from "entities/Post/model/types/post";
import cls from "./Comment.module.scss"
import avatar from "/src/shared/assets/icons/avatar.png"
import {Text} from "shared/ui/Text/Text";

export interface IComment {
    className?: string;
    comment: Comment;
}

    export const CommentNode: FC<IComment> = (props) => {
    const {
        className,
        comment
    } = props;

    const date = new Date(comment.creation_date)

    return (
        <div className={cls.Comment}>
            <div className={cls.imgContainer}>
                <img src={avatar} alt={"avatar"}/>
            </div>
            <div className={cls.UserData}>
                <Text title={`${comment.full_name}`}/>
                <Text title={`${comment.department}`} text={comment.text}/>
            </div>
            <div className={cls.CommentData}>
                <Text text={date.getDate().toString() + "." + (date.getMonth() + 1).toString() + "." + date.getFullYear().toString()}/>
            </div>
        </div>
    );
};