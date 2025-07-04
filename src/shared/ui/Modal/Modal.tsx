import React, {
    FC,
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import cls from './Modal.module.scss';
import {classNames} from "shared/lib/classNames";
import {Button} from "shared/ui/Button/Button";
import CloseSVG from "shared/assets/icons/close-bold.svg";

export interface IModalProps {
    className?: string;
    children?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    lazy?: boolean;
    unmount?: boolean;
    closeButton?: boolean;
    closeButtonContent?: ReactNode | string;
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
        lazy = true,
        unmount = false,
        closeButton = true,
        closeButtonContent = <CloseSVG />,
    } = props;
    const [mounted, setMounted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setOpening] = useState(false);
    // Ссылка на таймаут, на случай если таймаут запустят, а компонент внезапно пропадет
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const closeHandler = useCallback(() => {
        setIsClosing(true);
        timerRef.current = setTimeout(() => {
            onClose();
            setOpening(false);
            setIsClosing(false);
            if (unmount) setMounted(false);
            // Костыль TODO исправит
            document.body.style.overflow = "unset";
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
            // Костыль TODO исправит
            document.body.style.overflow = "hidden";
            setMounted(true);
            timerRef.current = setTimeout(() => setOpening(true), 0);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', keydownHandler);
            // Костыль TODO исправит
            document.body.style.overflow = "unset";
        };
    }, [isOpen, keydownHandler]);

    const renderCloseButton = () => {
        if (props.closeButtonContent == undefined) {
            props.closeButtonContent = <CloseSVG />
        }

        return (
            <Button onClick={closeHandler}> {props.closeButtonContent} </Button>
        )
    }

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpening,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !mounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, ["modal"])}>
                <div className={cls.overlay}>
                    <div className={classNames(cls.content, {}, [className])} onClick={onContentClick}>
                        <header>
                            <div className={cls.x}>
                                <Button onClick={closeHandler}> {closeButtonContent} </Button>
                            </div>
                        </header>
                        <main>
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </Portal>
    );
};
