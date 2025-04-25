import {FC, memo} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import cls from "./WofModal.module.scss";
import {Worker} from "entities/Post/model/types/post";
import QRCode from "react-qr-code";


interface IWofModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    selectedWorker: Worker | undefined;
}

const WofModal: FC<IWofModalProps> = memo((props) => {
    const { className,
        isOpen,
        onClose,
    selectedWorker} = props;

    return (
            <Modal isOpen={isOpen} onClose={onClose} className={cls.ModalProperties}>
                {selectedWorker ?
                    <div className={cls.Worker}>
                        <img src={selectedWorker.image_path} alt={selectedWorker.full_name} className={cls.photo}/>
                        <div className={cls.content_block}>
                            <div className={cls.qr_container}>
                                <QRCode value={selectedWorker.link} className={cls.qr} size={150}/>
                            </div>
                            <div className={cls.info_block}>
                                <label className={cls.name}> {selectedWorker.full_name} </label>
                                <label className={cls.position}> {selectedWorker.position} </label>
                            </div>
                        </div>
                    </div>
                    : <label> Произошла ошибка, попробуйте еще раз </label>
                        }
                    </Modal>
                    );
                });
WofModal.displayName = "WofModal";

export {WofModal};