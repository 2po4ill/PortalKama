import {ClassAttributes, FC, FormEvent, FormHTMLAttributes, memo, useCallback, useEffect, useState} from "react";
import cls from './LoginForm.module.scss'
import hide from 'shared/assets/hide_password.png'
import show from 'shared/assets/show_password.png'
import {Button} from "shared/ui/Button/Button";
import {classNames} from "shared/lib/classNames";
import {Input} from "shared/ui/Input/Input";
import {useSelector} from "react-redux";
import {authActions, authReducer} from "../../model/slice/authSlice";
import {getError, getIsLoading, getPassword, getUsername} from "../../model/selectors/authSelectors";
import {loginByUsername} from "../../model/services/authServices";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {ToggleVisibilityIcon} from "features/auth/ByUsername/ui/ToggleVisibilityIcon/ToggleVisibilityIcon";


export interface ILoginForm extends FormHTMLAttributes<HTMLFormElement>, ClassAttributes<HTMLElement>{
    className?: string;
    close: () => void;
}

const LoginForm: FC<ILoginForm> = ( props ) => {
    const { className, children, close, ...other } = props;
    const [ visibility, setVisibility ] = useState(false);
    const username = useSelector(getUsername);
    const password = useSelector(getPassword);
    const idLoading = useSelector(getIsLoading);
    const error = useSelector(getError);
    const dispatch = useAppDispatch();

    const loginChangeHandler = useCallback((value: string) => {
        dispatch(authActions.setUsername(value));
    }, [dispatch]);


    const passwordChangeHandler = useCallback((value: string) => {
        dispatch(authActions.setPassword(value));
    }, [dispatch]);

    const toggleVisibilityHandler = useCallback( () => {
        setVisibility(prev => !prev);
    }, [setVisibility]);

    const submitHandler = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        const result = await dispatch(loginByUsername({username, password}));
        if (result.meta.requestStatus == "fulfilled") {
            close();
        }
    }, [dispatch, username, password]);

    return (
        <AsyncReducerProvider name={'auth'} reducer={authReducer}>
            <form className={classNames(cls.LoginForm)} onSubmit={submitHandler}>
                <div>
                    <label className={cls.FormLabel}> Войти в аккаунт </label>
                    {/*<Text title={"Войти в аккаунт"} />*/}
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
                            <ToggleVisibilityIcon
                                visibility={visibility}
                                className={cls.ShowPassword}
                                toggleVisibility={toggleVisibilityHandler}
                                id="show"
                            />
                        }
                        value={password}
                        onChange={passwordChangeHandler}
                    />

                </div>
                <Button type="submit" className={cls.FormButton} disabled={idLoading} loading={idLoading}>Войти</Button>
            </form>
        </AsyncReducerProvider>
    );
};

export default LoginForm;