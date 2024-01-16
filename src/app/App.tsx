import React from 'react';
import './styles/index.scss'
import {useTheme} from "./providers/ThemeProvider";
import {classNames} from "shared/lib/classNames";
import {Navbar} from "widgets/Navbar";
import {AppRouter} from "./router";


function App() {
    const {theme} = useTheme();

    return (
        <div className={classNames('app', {"hovered": true}, [theme])}>
            <Navbar />
            <AppRouter />
        </div>
    );
}

export default App;