import {ICollapsible, Collapsible} from "shared/ui/Collapsible/Collapsible";
import {FC} from "react";

export const ETC: FC<ICollapsible> = (props) => {
    const { className, ...other } = props;

    return (
        <Collapsible header={props.header} state={props.state}>
            <label> Здесь что-то будет</label>
        </Collapsible>
    )
}