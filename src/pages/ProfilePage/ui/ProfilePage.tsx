import {classNames} from "shared/lib/classNames";
import cls from './ProfilePage.module.scss'
import React, {useEffect} from "react";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {profileActions, profileReducer, profileSelectors} from "features/profile";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {PageLoader} from "widgets/PageLoader";
import {PageError} from "widgets/PageError/ui/PageError";
import img from "shared/assets/images/profile-pic.png"
import {Text} from "shared/ui/Text/Text";

export interface IProfilePageProps {
    className?: string;
}


const ProfilePage = ( { className }: IProfilePageProps ) => {
    const dispatch = useAppDispatch();
    const user = useSelector(profileSelectors.getProfile)
    const isLoading = useSelector(profileSelectors.getIsLoading);
    const error = useSelector(profileSelectors.getError);

    useEffect(() => {
        dispatch(profileActions.getProfileData());
    }, [dispatch]);

    return (
        <AsyncReducerProvider name={"profile"} reducer={profileReducer}>
            {
                isLoading
                    ? <PageLoader />
                    : error
                        ? <PageError />
                        : (
                            <div className={classNames(cls.ProfilePage, {}, [className])}>
                                <div className={cls.FirstSection}>
                                    <div className={classNames(cls.Info,{}, [cls.Box])}>
                                        <div className={cls.PhotoContainer}>
                                            <img src={img} alt={"user"}/>
                                        </div>
                                        <div className={cls.InfoContainer}>
                                            <Text title={user.full_name}/>
                                            <div className={cls.AdditonalInfo}>
                                                <Text text={user.position}/>
                                                <Text text={user.department}/>
                                                <Text text={user.mail}/>
                                                <Text text={"Непосредственный руководитель"}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={classNames(cls.UtilityButtons, {}, [cls.Box])}>
                                        <Text title={"Баланс: 99999"}/>
                                        <Text title={"Уведомления: 3"}/>
                                        <Text title={"Бронирования: 1"}/>
                                        <Text title={"Мероприятия: 0"}/>
                                    </div>
                                </div>

                                <div className={classNames(cls.QueriesNotifications, {}, [cls.Box])}>
                                    <Text title={"Заявления и уведомления"}/>
                                    <div className={cls.BoxContainer}>
                                        <div className={cls.FirstPart}>
                                            <Text text={"Документы на ознакомление"}/>
                                            <Text text={"Расчетные листы"}/>
                                            <Text text={"Расчет отпуска"}/>
                                            <Text text={"Запросить справку"}/>
                                        </div>
                                        <div className={cls.SecondPart}>
                                            <Text text={"Подать заявление"}/>
                                            <Text text={"Заявить об отсутствии"}/>
                                            <Text text={"Обратиться к генеральному директору"}/>
                                        </div>
                                    </div>
                                </div>

                                <div className={cls.SecondSection}>
                                    <div className={classNames(cls.Events, {}, [cls.Box])}>
                                        <Text title={"События"}/>
                                        <Text text={"Предстоящие события: 0"}/>
                                        <Text text={"Архив событий"}/>
                                    </div>

                                    <div className={classNames(cls.ShopSection, {}, [cls.Box])}>
                                        <Text title={"Магазин"}/>
                                        <Text text={"История заказов"}/>
                                        <Text text={"Товары в корзине: 0"}/>
                                    </div>
                                </div>

                                <div className={classNames(cls.Data, {}, [cls.Box])}>
                                    <Text title={"Корпоративные данные"}/>
                                    <div className={cls.DataContainer}>
                                        <Text text={"Тренинги и обучения"}/>
                                        <Text text={"Награды и достижения"}/>
                                    </div>
                                </div>
                            </div>
                        )
            }
        </AsyncReducerProvider>
    );
};

export default ProfilePage;