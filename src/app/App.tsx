import React, {useEffect, useState} from 'react';
import {useTheme} from "./providers/ThemeProvider";
import {classNames} from "shared/lib/classNames";
import {Navbar} from "widgets/Navbar";
import {AppRouter} from "./router";
import {LoginModal} from "features/auth/ByUsername";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {getAuthData, userActions} from "entities/User";
import {useSelector} from "react-redux";


function App() {
    const {theme} = useTheme();
    const [isOpen, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const userData = useSelector(getAuthData);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch])

    const openModal = () => {
        setOpen(prevState => !prevState)
    }

    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar setModalOpen={openModal}/>
            {!userData && <LoginModal isOpen={isOpen} onClose={ () => {setOpen(false)} } />}
            <AppRouter />
        </div>
    );
}

export default App;