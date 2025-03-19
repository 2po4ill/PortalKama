import {classNames} from "shared/lib/classNames";
import cls from './TopWorkersPage.module.scss'
import {memo, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {postSelectors} from "entities/Post/model/selectors/postSelectors";
import {postActions, postReducer} from "entities/Post/model/slice/postSlice";
import {Event} from "entities/Product/model/types/product";
import {Button} from "shared/ui/Button/Button";
import {Worker} from "entities/Post/model/types/post";
import {Text} from "shared/ui/Text/Text";
import {Input} from "shared/ui/Input/Input";
import {PageLoader} from "widgets/PageLoader";
import QRCode from "react-qr-code"
import UserBalancePage from "pages/UserBalancePage/ui/UserBalancePage";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import logo from "shared/assets/icons/logo_top_workers.png"

export interface ITopWorkersPageProps {
    className?: string;
}



const TopWorkersPage = (props: ITopWorkersPageProps ) => {
    const { className } = props;

    const workers = useSelector(postSelectors.getTopWorkers);
    const isLoading = useSelector(postSelectors.getIsLoading);
    const dispatch = useAppDispatch();
    let increment = 0;

    useEffect(() => {
        dispatch(postActions.getTopWorkers());
    }, [dispatch]);

    const renderWorker = (worker: Worker) => {
        if (increment != 2) {
            increment += 1
            return <div className={cls.Worker}>
                <div className={cls.img_container}>
                    <img className={cls.img} src={worker.image_path} alt={worker.full_name}/>
                </div>
                <div className={cls.content}>
                    <div>
                        <QRCode value={worker.link} size={15} className={cls.qr}/>
                    </div>
                    <div className={cls.textInfo}>
                        <label className={cls.title}> {worker.full_name} </label>
                        <label className={cls.text}> {worker.position} </label>
                    </div>
                </div>
            </div>
        } else {
            increment += 1
            return <div className={cls.logo}>
                <img src={logo} alt={'logo'} className={cls.logo_img}/>
            </div>
        }
    }

    return (
        <AsyncReducerProvider name={'post'} reducer={postReducer} destroy={false}>
            <div className={classNames(cls.TopWorkersPage, {}, [className])}>
                <div className={cls.header}>
                </div>
                <div className={cls.title_container}>
                    <label className={cls.title}> СТЕНА ПОЧЕТА И СЛАВЫ </label>
                </div>
                <div>
                    { !isLoading ?
                        <div className={cls.WorkerList}>
                            {workers ? workers.map(worker => renderWorker(worker)) : "Произошла ошибка, зайдите позже"}
                        </div>
                        : <PageLoader/>}
                </div>
            </div>
        </AsyncReducerProvider>
    );
};

export default TopWorkersPage;