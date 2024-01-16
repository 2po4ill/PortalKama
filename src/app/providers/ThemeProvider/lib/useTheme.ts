import { ThemeContext} from "./ThemeContext";
import {useContext} from "react";
import {Theme} from "shared/const/theme";

interface IUseThemeResult {
    setTheme: (theme: Theme) => void;
    theme: Theme
}

export function useTheme(): IUseThemeResult {
    const {theme, setTheme} = useContext(ThemeContext);

    return {theme, setTheme};
}