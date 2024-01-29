import React, {useState} from 'react';
import {useTheme} from "./providers/ThemeProvider";
import {classNames} from "shared/lib/classNames";
import {Navbar} from "widgets/Navbar";
import {AppRouter} from "./router";
import {LoginModal} from "features/auth/ByUsername";


function App() {
    const {theme} = useTheme();
    const [isOpen, setOpen] = useState<boolean>(false);

    const openModal = () => {
        setOpen(prevState => !prevState)
    }

    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar setModalOpen={openModal}/>
            <LoginModal isOpen={isOpen} onClose={ () => {setOpen(false)} } />
            <AppRouter />
        </div>
    );
}

export default App;