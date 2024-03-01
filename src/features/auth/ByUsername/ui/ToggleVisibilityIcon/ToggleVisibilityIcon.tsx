import {FC, ImgHTMLAttributes, memo, useEffect} from "react";
import hide from "shared/assets/hide_password.png";
import show from "shared/assets/show_password.png";

export interface IToggleVisibilityIcon extends ImgHTMLAttributes<HTMLImageElement>{
    className?: string;
    visibility?: boolean;
    toggleVisibility: () => void;
}

export const ToggleVisibilityIcon: FC<IToggleVisibilityIcon> = memo(( props ) => {
    const {visibility = false, toggleVisibility, ...other} = props;

    return (
        <img
            src={visibility ? hide : show}
            alt='toggleVisibility'
            onClick={toggleVisibility}
            {...other}
        />
    )
});