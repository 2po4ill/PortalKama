import {classNames} from "shared/lib/classNames";
import cls from './Shop.module.scss'
import {Counter} from "entities/Counter";
import {ProductList} from "features/product";
import {Product} from "entities/Product";

export interface IShopProps {
    className?: string;
}

const Shop = ({ className }: IShopProps ) => {
    const products = new Array(10).fill(0).map((e, i) => {
        return {
            id: `${i}`,
            name: "Lorem ipsum dolor sit amet, consectetur",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            price: 10000000,
            isService: false,
            available: true
        } as Product
    })

    return (
        <div className={classNames(cls.Shop, {}, [className])}>
            <h1>Store</h1>
            <div>
                <ProductList products={products}/>
            </div>
        </div>
    );
};

export default Shop;