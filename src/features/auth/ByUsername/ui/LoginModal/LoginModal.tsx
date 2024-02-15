import {IModalProps, Modal} from "shared/ui/Modal/Modal";
import {LoginFormAsync} from "../LoginForm/LoginForm.async";
import {classNames} from "shared/lib/classNames";
import cls from './Login.module.scss';
import {FC, Suspense} from "react";
import {Spinner} from "shared/ui/Spinner/Spinner";


export const LoginModal: FC<IModalProps> = (props) => {
    const { className, onClose, ...other } = props;

    return (
        <Modal className={classNames(cls.LoginModal, {}, [className])} onClose={onClose} {...other}>
            <Suspense fallback={<Spinner size={"l"} color={"default"} /> }>
                <LoginFormAsync  close={onClose}/>
            </Suspense>
        </Modal>
    )
}