import { FC, lazy } from 'react';

export const LoginFormAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // Это только для проверки
    setTimeout(() => resolve(import('./LoginForm')), 1500);
}));