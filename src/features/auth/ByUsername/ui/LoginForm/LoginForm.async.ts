import { FC, lazy } from 'react';

export const LoginFormAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // Это только для проверки
    __IS_DEV__ ? setTimeout(() => resolve(import('./LoginForm')), 1500) : resolve(import('./LoginForm'));
}));