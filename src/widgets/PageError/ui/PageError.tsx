import React from 'react';
import {classNames} from "shared/lib/classNames";
import cls from './PageError.module.scss';
import {FallbackProps} from 'react-error-boundary'

export interface IPageErrorProps{
    className?: string;
}

export const PageError = ( { className }: IPageErrorProps ) => {
    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <p>Something went wrong</p>
        </div>
    );
};