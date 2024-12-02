import React, {FC} from "react";
import {Comment} from "entities/Post/model/types/post";
import cls from "./Comment.module.scss"
import avatar from "/src/shared/assets/icons/avatar.png"
import {Text} from "shared/ui/Text/Text";
import {Button} from "shared/ui/Button/Button";

export interface IComment {
    className?: string;
    role?: number;
    apiCall?: (comment_id: number) => void;
    deleteApiCall?: (comment_id: number) => void;
    comment: Comment;
}

    export const CommentNode: FC<IComment> = (props) => {
    const {
        className,
        comment,
        role,
        apiCall,
        deleteApiCall,
    } = props;

    const date = new Date(comment.creation_date)

    return (
        <div className={cls.Comment}>
            <div className={cls.imgContainer}>
                <img src={avatar} alt={"avatar"} className={cls.avatar}/>
            </div>
            <div className={cls.UserData}>
                <Text title={`${comment.full_name}`}/>
                <Text title={`${comment.department}`} text={comment.text}/>
            </div>
            <div className={cls.CommentData}>
                <Text text={date.getDate().toString() + "." + (date.getMonth() + 1).toString() + "." + date.getFullYear().toString()}/>
                {role == 1 && apiCall ? <Button onClick={() => {
                     apiCall(comment.comment_id)
                }}> Подветрдить </Button> : null}
                {role == 1 && deleteApiCall ? <Button onClick={() => {
                    deleteApiCall(comment.comment_id)
                }}> Удалить </Button> : null}
            </div>
        </div>
    );
};