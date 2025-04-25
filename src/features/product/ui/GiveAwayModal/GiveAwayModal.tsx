import {FC, memo, useState} from "react";
import {IModalProps, Modal} from "shared/ui/Modal/Modal";
import {classNames} from "shared/lib/classNames";
import cls from './GiveAwayModal.module.scss';
import {Shop_Users} from "entities/Product/model/types/product";
import {Input} from "shared/ui/Input/Input";
import {Button} from "shared/ui/Button/Button";

export interface IProductModalProps extends IModalProps {
    presentApi: (user_id: number, amount: number) => void;
    users: Shop_Users[];
    makeApi: (user_id: number, description: string, amount: number) => void;
    role?: number;
}

export const GiveAwayModal: FC<IProductModalProps> = memo((props) => {
    const { presentApi, users, role, makeApi,...other } = props;

    const [selectedUser, setSelectedUser] = useState<string | undefined>( undefined);
    const [selectedAmount, setSelectedAmount] = useState<string>( "0");

    const [selectedUserAdmin, setSelectedUserAdmin] = useState<string | undefined>( undefined);
    const [selectedAmountAdmin, setSelectedAmountAdmin] = useState<string>( "0");
    const [selectedDescAdmin, setSelectedDescAdmin] = useState<string>( "0");

    const currentUser = users.find(user => user.full_name == selectedUser)
    const currentUserAdmin = users.find(user => user.full_name == selectedUserAdmin)
    return (
        <Modal
            className={classNames(cls.ProductModal, {}, [])}
            {...other}
        >
            <label> Выберите пользователя </label>
            <select onChange={e => setSelectedUser(e.target.value)}>
                {users ? users.map(user => <option> {user.full_name} </option>)
                    : <option> Произошла ошибка, обратитесь к техническому специалисту </option>}
            </select>
            <Input onChange={setSelectedAmount} placeholder={"Напишите кол-во баллов для пользователя"}/>
            <Button onClick={() => currentUser ? presentApi(currentUser.user_id, Number(selectedAmount)) : console.log(selectedUser)}> Отправить подарок </Button>
            {role == 1 ? <div>
                <label> Выберите пользователя </label>
                <select onChange={e => setSelectedUserAdmin(e.target.value)}>
                    {users ? users.map(user => <option> {user.full_name} </option>)
                        : <option> Произошла ошибка, обратитесь к техническому специалисту </option>}
                </select>
                <Input onChange={setSelectedDescAdmin} placeholder={"Укажите причину начисления"}/>
                <Input onChange={setSelectedAmountAdmin} placeholder={"Напишите кол-во баллов для пользователя"}/>
                <Button onClick={() => currentUserAdmin ? makeApi(currentUserAdmin.user_id, selectedDescAdmin , Number(selectedAmountAdmin)) : console.log(selectedUser)}> Отправить баллы </Button>
            </div> : null}
        </Modal>
    );
});