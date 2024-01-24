import {ClassAttributes, FC, FormHTMLAttributes, useState} from "react";
import cls from './LoginForm.module.scss'
import hide from 'shared/assets/hide_password.png'
import show from 'shared/assets/show_password.png'


export interface ILoginForm extends FormHTMLAttributes<HTMLFormElement>, ClassAttributes<HTMLElement>{
    className?: string;
}

export const LoginForm: FC<ILoginForm> = ( props ) => {
    const { className, children, ...other } = props;

    function showPassword() {
        if ((document.getElementById("show") as HTMLImageElement).src == show) {
            (document.getElementById("password") as HTMLInputElement).type = 'text';
            (document.getElementById("show") as HTMLImageElement).src = hide;
        } else {
            (document.getElementById("password") as HTMLInputElement).type = 'password';
            (document.getElementById("show") as HTMLImageElement).src = show;
        }
    }

    function loginComplete() {
        alert("Успешно вошли в аккаунт")
    }

    return (
        <form>
            <div>
                <label className={cls.FormLabel}> Войти в аккаунт </label>
            </div>
            <div>
                <input type="text" name="login" placeholder="Введите логин" className={cls.Credentials}/>
            </div>
            <div>
                <input type="password" name="password" placeholder="Введите пароль" id="password" className={cls.Credentials}/>
            </div>
            <img src={show} alt='show' className={cls.ShowPassword} id="show" onClick={showPassword}/>
            <button type="submit" className={cls.FormButton} onClick={loginComplete}>Войти</button>
        </form>
    );
};