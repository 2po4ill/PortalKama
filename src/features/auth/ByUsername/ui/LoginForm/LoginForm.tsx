import {ClassAttributes, FC, EventHandler, FormHTMLAttributes, useState, FormEvent} from "react";
import cls from './LoginForm.module.scss'
import hide from 'shared/assets/hide_password.png'
import show from 'shared/assets/show_password.png'
import {Button} from "shared/ui/Button/Button";
import {classNames} from "shared/lib/classNames";
import {Input} from "shared/ui/Input/Input";


export interface ILoginForm extends FormHTMLAttributes<HTMLFormElement>, ClassAttributes<HTMLElement>{
    className?: string;
}

export const LoginForm: FC<ILoginForm> = ( props ) => {
    const { className, children, ...other } = props;
    const [ visibility, setVisibility ] = useState(false);
    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const loginChangeHandler = (value: string) => {
        setLoginValue(value);
    }

    const passwordChangeHandler = (value: string) => {
        setPasswordValue(value);
    }

    const toggleVisibility = () => {
        setVisibility(prev => !prev);
    }

    function submitHandler(e: FormEvent) {
        e.preventDefault();
        alert("Успешно вошли в аккаунт " + loginValue);
    }

    return (
        <form className={classNames(cls.LoginForm)} onSubmit={submitHandler}>
            <div>
                <label className={cls.FormLabel}> Войти в аккаунт </label>
            </div>
            <div>
                <Input
                    type="text"
                    name="login"
                    placeholder="Введите логин"
                    className={cls.Credentials}
                    autofocus
                    value={loginValue}
                    onChange={loginChangeHandler}
                />
            </div>
            <div>
                <Input
                    type={visibility ? "text" : "password"}
                    name="password"
                    placeholder="Введите пароль"
                    id="password" className={cls.Credentials}
                    adornment={
                        <img src={ visibility ? hide : show} alt='show' className={cls.ShowPassword} id="show" onClick={toggleVisibility}/>
                    }
                    value={passwordValue}
                    onChange={passwordChangeHandler}
                />

            </div>
            <Button type="submit" className={cls.FormButton}>Войти</Button>
        </form>
    );
};