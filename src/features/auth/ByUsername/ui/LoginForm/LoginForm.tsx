import {ClassAttributes, FC, FormHTMLAttributes, useState} from "react";
import cls from './LoginForm.module.scss'
import hide from 'shared/assets/hide_password.png'
import show from 'shared/assets/show_password.png'


export interface ILoginForm extends FormHTMLAttributes<HTMLFormElement>, ClassAttributes<HTMLElement>{
    className?: string;
}

export const LoginForm: FC<ILoginForm> = ( props ) => {
    const { className, children, ...other } = props;
    const [ visibility, setVisibility ] = useState(false);

    const toggleVisibility = () => {
        setVisibility(prev => !prev);
    }

    function loginComplete() {
        alert("Успешно вошли в аккаунт")
    }

    return (
        <form >
            <div>
                <label className={cls.FormLabel}> Войти в аккаунт </label>
            </div>
            <div>
                <input type="text" name="login" placeholder="Введите логин" className={cls.Credentials}/>
            </div>
            <div>
                <input type={visibility ? "text" : "password"} name="password" placeholder="Введите пароль" id="password" className={cls.Credentials}/>
            </div>
            <img src={visibility ? hide : show} alt='show' className={cls.ShowPassword} id="show" onClick={toggleVisibility}/>
            <button type="submit" className={cls.FormButton} onClick={loginComplete}>Войти</button>
        </form>
    );
};