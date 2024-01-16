import {useTheme} from "app/providers/ThemeProvider";
import DarkIcon from "shared/assets/logo.jpg";

export interface IThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ( { className }: IThemeSwitcherProps ) => {
    const {theme, setTheme} = useTheme();
    return (
        <img src={DarkIcon} alt="logo" className={"logo"}/>
    );
};