import {createContext} from "react";
import {Theme} from "shared/const/theme";

export interface IThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<IThemeContextProps>({});