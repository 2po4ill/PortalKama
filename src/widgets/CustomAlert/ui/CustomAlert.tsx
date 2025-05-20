import cls from './CustomAlert.module.scss';
import {ReactNode, useState} from 'react';
import {IModalProps, Modal} from "shared/ui/Modal/Modal";
import {Button} from "shared/ui/Button/Button";

// Интерфейс для кастомного алерта
interface IAlertProps {
    title: string;
    message: string;
    setNewAlert: (node: ReactNode) => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
}

// Кастомный алерт компонент
export const CustomAlert = (props: IAlertProps) => {
    const {
        title,
        message,
        onConfirm,
        onCancel,
        setNewAlert,
        confirmText = 'OK',
        cancelText = 'Отмена',
        showCancel = true,
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    // Функция для открытия алерта
    const showAlert = () => {
        setIsOpen(true);
    };

    // Функция для закрытия алерта
    const closeAlert = () => {
        setIsOpen(false);
        setNewAlert(null)
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
            {/* Кнопка для открытия алерта (можно использовать программно) */}
            <button onClick={showAlert}>Показать алерт</button>

            {/* Сам алерт */}
            <Modal className={cls.ModalClassname} {...modalProps}>
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
                </div>
            </Modal>
        </>
    );
};
