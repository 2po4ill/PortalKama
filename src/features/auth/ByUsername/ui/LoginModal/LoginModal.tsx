import {IModalProps, Modal} from "shared/ui/Modal/Modal";
import {LoginForm} from "../LoginForm/LoginForm";
import {classNames} from "shared/lib/classNames";
import cls from './Login.module.scss';
import {FC} from "react";


export const LoginModal: FC<IModalProps> = (props) => {
    const { className, ...other } = props;

    return (
        <Modal className={classNames(cls.LoginModal, {}, [className])} {...other}>
            <LoginForm />
        </Modal>
    )
}