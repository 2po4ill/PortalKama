
import { useState } from 'react';
import {IModalProps, Modal} from "shared/ui/Modal/Modal";

// Интерфейс для кастомного алерта
interface IAlertProps {
    title: string;
    message: string;
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
    };

    // Создаем пропсы для Modal
    const modalProps: IModalProps = {
        isOpen,
        onClose: closeAlert,
        closeButton: false, // убираем стандартную кнопку закрытия
        unmount: true,
    };

    return (
        <>
            {/* Кнопка для открытия алерта (можно использовать программно) */}
            <button onClick={showAlert}>Показать алерт</button>

            {/* Сам алерт */}
            <Modal {...modalProps}>
                <div className="alert-container">
                    <div className="alert-header">{title}</div>
                    <div className="alert-message">{message}</div>
                    <div className="alert-buttons">
                        {showCancel && (
                            <button className="cancel-button" onClick={() => {
                                closeAlert();
                                onCancel && onCancel();
                            }}>
                                {cancelText}
                            </button>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};
