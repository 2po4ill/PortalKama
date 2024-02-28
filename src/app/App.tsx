import React, {useEffect, useState} from 'react';
import {useTheme} from "./providers/ThemeProvider";
import {classNames} from "shared/lib/classNames";
import {Navbar} from "widgets/Navbar";
import {AppRouter} from "./router";
import {LoginModal} from "features/auth/ByUsername";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {userActions, userSelectors} from "entities/User";
import {useSelector} from "react-redux";
import {MainLayout} from "shared/layouts/MainLayout/MainLayout";
import {Sidebar} from "widgets/Sidebar/ui/Sidebar/Sidebar";


function App() {
    const {theme} = useTheme();
    const [isOpen, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isAuthorized = useSelector(userSelectors.getIsAuthorized);

    useEffect(() => {
        dispatch(userActions.initUser());
    }, [dispatch])

    const openModal = () => {
        setOpen(prevState => !prevState)
    }

    return (
        <div className={classNames('app', {}, [theme])}>

            {!isAuthorized && <LoginModal isOpen={isOpen} onClose={ () => {setOpen(false)} } />}
            <MainLayout
                header={<Navbar setModalOpen={openModal}/>}
                content={<AppRouter />}
                sidebar={<Sidebar />}
            />
        </div>
    );
}

export default App;