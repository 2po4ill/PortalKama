import React from 'react';
import {classNames} from "shared/lib/classNames";
import cls from './PageError.module.scss';
import {ErrorBoundary} from "react-error-boundary";
import {PageError} from "widgets/PageError/ui/PageError";

export const ErrorProvider = () => {
    return (
        <ErrorBoundary fallback={<PageError />}>

        </ErrorBoundary>
    );
};