import {FC, memo, useState} from "react";
import cls from "./AddImageInput.scss";
import {Input} from "shared/ui/Input/Input";
import {Button} from "shared/ui/Button/Button";
import {Post} from "entities/Post";


interface IPostModalProps {
    className?: string;
    setSubmittedImg: (submittedImg:  string[]) => void;

}

const AddImageInput: FC<IPostModalProps> = memo((props) => {
    const { className,
    setSubmittedImg} = props;

    return (
            <div>
                <Input placeholder={"Введите url адрес изображения"}/>
            </div>
    );
});
AddImageInput.displayName = "AddImageInput";

export {AddImageInput};