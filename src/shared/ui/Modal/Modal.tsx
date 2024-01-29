import React, {
    FC,
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import cls from './Modal.module.scss';
import {classNames} from "shared/lib/classNames";

export interface IModalProps {
    className?: string;
    children?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    lazy?: boolean
}

const ANIMATION_DELAY = 300;

/**
 * Все стрелочные функции-калбэки при каждом рендере компонента
 * создают новую ссылку и в целях оптимизации по хорошему оборачивать
 * их в хук useCallback(callback: () => void, deps: [])
 * TODO добавить eslint-правило на обязательное использование хуков(пакет: eslint-plugin-react-hooks)
 */

/**
 *
 * @param props
 * @constructor
 */
export const Modal: FC<IModalProps> = (props) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy = true
    } = props;
    const [mounted, setMounted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    // Ссылка на таймаут, на случай если таймаут запустят, а компонент внезапно пропадет
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const closeHandler = useCallback(() => {
        setIsClosing(true);
        timerRef.current = setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, ANIMATION_DELAY);
    }, [onClose]);

    const keydownHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', keydownHandler);
            setMounted(true)
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', keydownHandler);
        };
    }, [isOpen, keydownHandler]);

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !mounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
