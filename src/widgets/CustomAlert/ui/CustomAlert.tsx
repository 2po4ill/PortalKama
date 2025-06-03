import cls from './CustomAlert.module.scss';
import {ReactNode, useState} from 'react';
import {IModalProps, Modal} from "shared/ui/Modal/Modal";
import {Button} from "shared/ui/Button/Button";
import {PageLoader} from "widgets/PageLoader";

// Интерфейс для кастомного алерта
interface IAlertProps {
    title: string;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    setShowAlert?: (showAlert: boolean) => void;
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
    isLoading?: boolean;
}

// Кастомный алерт компонент
export const CustomAlert = (props: IAlertProps) => {
    const {
        title,
        message,
        onConfirm,
        onCancel,
        confirmText = 'OK',
        cancelText = 'Отмена',
        showCancel = true,
        setShowAlert,
        isLoading = false
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    // Функция для открытия алерта
    const showAlert = () => {
        setIsOpen(true);
    };

    // Функция для закрытия алерта
    const closeAlert = () => {
        setIsOpen(false);
        if (setShowAlert){
            setShowAlert(false)
        }
    };

    // Создаем пропсы для Modal
    const modalProps: IModalProps = {
        isOpen: true,
        onClose: closeAlert,
        closeButton: false, // убираем стандартную кнопку закрытия
        unmount: true,
    };

    return (
        <>
            {/* Сам алерт */}
            <Modal className={cls.ModalClassname} {...modalProps}>
                {
                    !isLoading ?
                <div className={cls.alertContainer}>
                    <div className={cls.alertHeader}>{title}</div>
                    <div className={cls.alertMessage}>{message}</div>
                    <div className={cls.alertButtons}>
                            <Button className={cls.confirmButton} onClick={() => {
                                closeAlert();
                                onConfirm && onConfirm();
                            }}>
                                {confirmText}
                            </Button>
                    </div>
                </div> : <PageLoader className={cls.AlertLoader}/>
                }
            </Modal>
        </>
    );
};
