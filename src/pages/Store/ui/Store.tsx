import {classNames} from "shared/lib/classNames";
import cls from './Store.module.scss'
import {Counter} from "entities/Counter";

export interface IStoreProps {
    className?: string;
}

const Store = ( { className }: IStoreProps ) => {
    return (
        <div className={classNames(cls.Store, {}, [className])}>
            <h1>Store</h1>
            <div>
                <Counter />
            </div>
        </div>
    );
};

export default Store;