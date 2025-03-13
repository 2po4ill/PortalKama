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

export interface ITopWorkersPageProps {
    className?: string;
}



const TopWorkersPage = (props: ITopWorkersPageProps ) => {
    const { className } = props;

    const workers = useSelector(postSelectors.getTopWorkers);
    const isLoading = useSelector(postSelectors.getIsLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(postActions.getTopWorkers());
    }, [dispatch]);

    const renderWorker = (worker: Worker) => {
        return <div className={cls.Worker}>
            <img className={cls.img} src={worker.image_path} alt={worker.full_name}/>
            <div className={cls.content}>
                <QRCode value={worker.link} className={cls.qr}/>
                <div className={cls.textInfo}>
                    <Text title={worker.full_name} text={worker.position}/>
                </div>
            </div>
        </div>
    }

    return (
        <AsyncReducerProvider name={'post'} reducer={postReducer} destroy={false} >
            <div className={classNames(cls.TopWorkersPage, {}, [className])}>
                <Text title={"Лучшие сотрудники месяца"} className={cls.title}/>

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