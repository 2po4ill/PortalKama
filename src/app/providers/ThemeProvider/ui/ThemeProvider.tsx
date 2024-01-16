import React, {FC, useMemo, useState} from 'react';
import { ThemeContext } from "../lib/ThemeContext";
import {Theme} from "shared/const/theme";
import {LOCAL_STORAGE_THEME_KEY} from "shared/const/localstorage";

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.DEFAULT;

export interface IThemeProviderProps {
    children?: React.ReactNode
}

const ThemeProvider: FC<IThemeProviderProps> = ({children}) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    const defaultProps = useMemo(() => ({
        theme, setTheme
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;