import {ClassAttributes, FC, FormEvent, FormHTMLAttributes, memo, useCallback, useEffect, useState} from "react";
import cls from './LoginForm.module.scss'
import hide from 'shared/assets/hide_password.png'
import show from 'shared/assets/show_password.png'
import {Button} from "shared/ui/Button/Button";
import {classNames} from "shared/lib/classNames";
import {Input} from "shared/ui/Input/Input";
import {useSelector} from "react-redux";
import {authActions} from "../../model/slice/authSlice";
import {getError, getIsLoading, getPassword, getUsername} from "../../model/selectors/authSelectors";
import {loginByUsername} from "../../model/services/authServices";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {getAuthData} from "entities/User";


export interface ILoginForm extends FormHTMLAttributes<HTMLFormElement>, ClassAttributes<HTMLElement>{
    className?: string;
    close: () => void;
}

export const LoginForm: FC<ILoginForm> = memo(( props ) => {
    const { className, children, close, ...other } = props;
    const [ visibility, setVisibility ] = useState(false);
    const username = useSelector(getUsername);
    const password = useSelector(getPassword);
    const idLoading = useSelector(getIsLoading);
    const error = useSelector(getError);
    const authData = useSelector(getAuthData);
    const dispatch = useAppDispatch();

    const loginChangeHandler = useCallback((value: string) => {
        // setLoginValue(value);
        dispatch(authActions.setUsername(value));
    }, [dispatch]);


    const passwordChangeHandler = useCallback((value: string) => {
        // setPasswordValue(value);
        dispatch(authActions.setPassword(value));
    }, [dispatch]);

    const toggleVisibility = () => {
        setVisibility(prev => !prev);
    }

    const submitHandler = useCallback((e: FormEvent) => {
        e.preventDefault();
        dispatch(loginByUsername({ username, password }));
        // alert("Успешно вошли в аккаунт " + loginValue);
    }, [dispatch, username, password]);

    useEffect(() => {
        if (authData) close();
    }, [authData]);


    return (
        <form className={classNames(cls.LoginForm)} onSubmit={submitHandler}>
            <div>
                <label className={cls.FormLabel}> Войти в аккаунт </label>
            </div>
            {error && <Text text={String(error)} theme={TextTheme.ERROR} />}
            <div>
                <Input
                    type="text"
                    name="login"
                    placeholder="Введите логин"
                    className={cls.Credentials}
                    autofocus
                    value={username}
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
                    value={password}
                    onChange={passwordChangeHandler}
                />

            </div>
            <Button type="submit" className={cls.FormButton} disabled={idLoading} loading={idLoading}>Войти</Button>
        </form>
    );
});