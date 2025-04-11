import {FC, memo} from "react";
import {IModalProps, Modal} from "shared/ui/Modal/Modal";
import {classNames} from "shared/lib/classNames";
import cls from './UserPolicy.module.scss';
import {Button} from "shared/ui/Button/Button";

export interface IUserPolicyModalProps extends IModalProps {
    stateChanger: (state: boolean) => void;
    modalStateChanger: (state: boolean) => void;
}

export const UserPolicy: FC<IUserPolicyModalProps> = memo((props) => {
    const { stateChanger, modalStateChanger, ...other } = props;
    return (
        <Modal
            className={classNames(cls.ProductModal, {}, [])}
            {...other}
        >
            <div>
                <label> Я даю согласие на использование персональных данных:</label>
                <Button onClick={() => {stateChanger(true); modalStateChanger(false)}}> Да </Button>
                <Button onClick={() => {stateChanger(false); modalStateChanger(false)}}> Нет </Button>
            </div>
        </Modal>
    );
});