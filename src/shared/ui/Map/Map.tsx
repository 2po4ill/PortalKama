import React, {FC} from "react";
import cls from "shared/ui/Map/Map.module.scss";
export interface IMap {
    className?: string;
    image: string;
    title?: string;
}

export const Map: FC<IMap> = (props) => {
    const {
        className,
        image,
        title
    } = props;



    return (
        <div>
            <img src={image} alt={title}></img>
        </div>
    );
};