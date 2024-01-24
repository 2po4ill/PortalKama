import React, {useState} from 'react';
import {useTheme} from "./providers/ThemeProvider";
import {classNames} from "shared/lib/classNames";
import {Navbar} from "widgets/Navbar";
import {AppRouter} from "./router";
import {Modal} from "shared/ui/Modal/Modal";
import {Button} from "shared/ui/Button/Button";
import {LoginForm} from "shared/ui/LoginForm/LoginForm";


function App() {
    const {theme} = useTheme();
    const [isOpen, setOpen] = useState<boolean>(false);

    const openModal = () => {
        setOpen(prevState => !prevState)
    }

    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar setModalOpen={openModal}/>
            <Modal isOpen={isOpen} onClose={ () => {setOpen(false)} }>
            <LoginForm/>
            </Modal>
            <AppRouter />
        </div>
    );
}

export default App;