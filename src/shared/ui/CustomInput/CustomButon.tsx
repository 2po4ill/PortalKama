import {FC} from "react";
import {IButtonProps} from "shared/ui/Button/Button";

export const Button: FC<IButtonProps> = ( props ) => {
    const { className, children, ...other } = props;
    return (
        <button className={"button"} {...other}>
            {children}
        </button>
    );
};