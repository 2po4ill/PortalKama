import {ThemeContext} from "./ThemeContext";
import {useContext} from "react";
import {Theme} from "shared/const/theme";

interface IUseThemeResult {
    toggleTheme: () => void;
    theme: Theme
}

export function useTheme(): IUseThemeResult {
    const {theme, setTheme} = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme?.(Theme.DEFAULT);
    }

    return {
        theme: theme || Theme.DEFAULT,
        toggleTheme
    };
}