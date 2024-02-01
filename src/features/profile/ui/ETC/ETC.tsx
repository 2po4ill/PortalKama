import {Collapsible} from "shared/ui/Collapsible/Collapsible";
import {FC} from "react";
import {IHeader,Header} from "shared/ui/Header/Header";

export const ETC: FC<IHeader> = (props) => {
    const { className, ...other } = props;

    return (
        <Header title={props.title} openedWindow={props.openedWindow} isOpened={props.isOpened}>
            <Collapsible isOpened={props.title === props.openedWindow}>
                <label> Здесь что-то будет </label>
            </Collapsible>
        </Header>
    )
}