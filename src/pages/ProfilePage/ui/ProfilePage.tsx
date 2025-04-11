import {classNames} from "shared/lib/classNames";
import cls from './ProfilePage.module.scss'
import React, {useEffect, useState} from "react";
import {AsyncReducerProvider} from "shared/lib/AsyncReducerProvider/AsyncReducerProvider";
import {profileActions, profileReducer, profileSelectors} from "features/profile";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {PageLoader} from "widgets/PageLoader";
import {PageError} from "widgets/PageError/ui/PageError";
import img from "shared/assets/icons/avatar.png"
import testimg from "shared/assets/images/image.png"
import {Text} from "shared/ui/Text/Text";
import {userActions, userSelectors} from "entities/User";
import {Button} from "shared/ui/Button/Button";
import {Input} from "shared/ui/Input/Input";
import {CreatePostModal} from "features/post/CreatePostModal";
import {postActions} from "entities/Post/model/slice/postSlice";
import {reservationActions} from "entities/Reservation/model/slice/reservationSlice";
import {UserPolicy} from "features/profile/ui/UserPolicy/UserPolicy";

export interface IProfilePageProps {
    className?: string;
}


const ProfilePage = ( { className }: IProfilePageProps ) => {
    const dispatch = useAppDispatch();
    const user = useSelector(profileSelectors.getProfile)
    const userData = useSelector(userSelectors.getUser);
    const isLoading = useSelector(profileSelectors.getIsLoading);
    const error = useSelector(profileSelectors.getError);

    const [submittedNumber, setSubmittedNumber] = useState(user.personal_mobile ? user.personal_mobile : "");
    const [submittedEmail, setSubmittedEmail] = useState(user.personal_mail ? user.personal_mail : "");

    const [userPolicyState, setUserPolicyState] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [numberState, setNumberState] = useState(false);
    const [emailState, setEmailState] = useState(false);
    useEffect(() => {
        dispatch(profileActions.getProfileData());
    }, [dispatch]);

    const EmailApi = (mail: string) => {
        dispatch(reservationActions.personal_mail(mail))
    }

    const NumberApi = (number: string) => {
        dispatch(reservationActions.personal_mobile(number))
    }

    const ChangeEmail = () => {
        if(emailState) {
            EmailApi(submittedEmail)
            setEmailState(!emailState)
        }
        else if(userPolicyState){
            setEmailState(!emailState)
        }
        else{
            setModalIsOpen(true)
        }
    }

    const ChangeNumber = () => {
        if(numberState) {
            NumberApi(submittedNumber)
            setNumberState(!numberState)
        }
        else if(userPolicyState){
            setNumberState(!numberState)
        }
        else{
            setModalIsOpen(true)
        }
    }


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
                                            <img src={userData.image_path ? userData.image_path : img} alt={"user"}/>
                                        </div>
                                        <div className={cls.InfoContainer}>
                                            <Text title={user.full_name}/>
                                            <div className={cls.AdditonalInfo}>
                                                <Text text={user.position}/>
                                                <Text text={user.department}/>
                                                <Text text={user.mail}/>
                                                <Text text={user.mobile}/>

                                                <div className={cls.personalData}>
                                                    <div className={cls.inputs}>
                                                        <label> Личный номер телефона: </label>
                                                        <Input placeholder={"Введите номер телефона"} onChange={setSubmittedNumber} disabled={!numberState}/>
                                                        <Button onClick={ChangeNumber}> {numberState ? "Сохранить" : "Изменить"} </Button>
                                                    </div>
                                                    <div className={cls.inputs}>
                                                        <label> Личный почтовый адрес: </label>
                                                        <Input placeholder={"Введите почтовый адрес"} onChange={setSubmittedEmail} disabled={!emailState}/>
                                                        <Button onClick={ChangeEmail}> {emailState ? "Сохранить" : "Изменить"} </Button>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={classNames(cls.UtilityButtons, {}, [cls.Box, cls.padding])}>
                                        <Text title={"Баланс: 0"}/>
                                        <Text title={"Уведомления: 0"}/>
                                        <Text title={"Бронирования: 0"}/>
                                        <Text title={"Мероприятия: 0"}/>
                                    </div>
                                </div>

                                <div className={classNames(cls.QueriesNotifications, {}, [cls.Box, cls.padding])}>
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
                                    <div className={classNames(cls.Events, {}, [cls.Box, cls.padding])}>
                                        <Text title={"События"}/>
                                        <Text text={"Предстоящие события: 0"}/>
                                        <Text text={"Архив событий"}/>
                                    </div>

                                    <div className={classNames(cls.ShopSection, {}, [cls.Box, cls.padding])}>
                                        <Text title={"Магазин"}/>
                                        <Text text={"История заказов"}/>
                                        <Text text={"Товары в корзине: 0"}/>
                                    </div>
                                </div>

                                <div className={classNames(cls.Data, {}, [cls.Box, cls.padding])}>
                                    <Text title={"Корпоративные данные"}/>
                                    <div className={cls.DataContainer}>
                                        <Text text={"Тренинги и обучения"}/>
                                        <Text text={"Награды и достижения"}/>
                                    </div>
                                </div>

                            </div>
                        )
            }
            {modalIsOpen ? <UserPolicy isOpen={modalIsOpen} onClose={() => {setModalIsOpen(false);}} stateChanger={setUserPolicyState} modalStateChanger = {setModalIsOpen}/> : null}
        </AsyncReducerProvider>
    );
};

export default ProfilePage;