import {classNames} from "shared/lib/classNames";
import cls from './ReservationListItem.scss';
import {FC, memo, useCallback} from "react";
import {Text} from "shared/ui/Text/Text";
import {Button} from "shared/ui/Button/Button";
import img from 'shared/assets/placeholder-image.webp'
import bin from 'shared/assets/icons/Vector.png'
import {ICartItem, IShopItem} from "entities/Product/model/types/product";
import {imageSrc} from "shared/lib/ImageSrc/imageSrc";
import {useLocation} from "react-router-dom";
import {Input} from "shared/ui/Input/Input";
import {Navbar} from "widgets/Navbar";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch";
import {productActions} from "entities/Product";
import {IReservationMade} from "entities/Reservation/model/types/reservation";

export interface ICartItemProps {
    className?: string;
    reservation: IReservationMade;
}

export const ReservationListItem: FC<ICartItemProps> = memo((props) => {
    const { reservation, className } = props;

    const start = new Date(reservation.start)
    const finish = new Date(reservation.finish)

    return (
        <div>
            <div>
                <div>
                    <Text
                        title={reservation.place_id.toString()}

                    />
                    <a> {start.getFullYear()} </a>
                    <a> {finish.getFullYear()} </a>
                </div>
            </div>
            <div>
                <Text text={"в наличии"}/>

                <div>
                    <Button children={<img alt={"bin_image"} src={bin}/>} onClick={() => {
                    }}></Button>
                    <Button> - </Button>
                    <Button> + </Button>
                </div>
            </div>
        </div>
    );
});