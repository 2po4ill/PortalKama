import React, {FC} from "react";
import cls from "shared/ui/Map/Map.module.scss";
import mapImage21 from "shared/assets/images/2-1.png";
import mapImage11 from "shared/assets/images/1-1.png";
import mapImage22 from "shared/assets/images/2-2.png";
import mapImage306 from "shared/assets/images/306-2.png";
import mapImage307 from "shared/assets/images/307.png";
import {Point} from "shared/ui/Point/Point";
import {classNames} from "shared/lib/classNames"
import {IReservationItem} from "entities/Reservation/model/types/reservation";
import {Text} from "shared/ui/Text/Text";
export interface IMap {
    className?: string;
    title: string;
    places: IReservationItem[];
    selectedPoint: number;
    setSelectedPoint: (number: number) => void;
    setSelectedPlace: (place: IReservationItem) => void;
}

export const Map: FC<IMap> = (props) => {
    const {
        className,
        title,
        places,
        selectedPoint,
        setSelectedPoint,
        setSelectedPlace
    } = props;

    const phoneList = ['3-87-20', '7-17-07', '7-17-83', '-', '3-87-30', '3-98-57', '7-17-51', '7-17-44', '3-98-92', '3-87-39', '7-17-46', ' 3-87-34', '7-17-45', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '6-83-38', '7-17-76', '7-17-70', '7-17-03', '7-17-84', '7-17-49', '3-87-35', '3-87-32', '6-83-37', '7-17-84', '7-17-49', '3-87-35', '3-87-32', '6-83-37', '3-87-33', '7-17-92', '7-17-20', '7-17-89', '7-17-66', '7-17-95', '3-98-58', '7-17-54', '7-17-54', '7-17-54', '6-83-36', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '6-83-32', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '7-17-22', '6-83-35', '-', '6-83-32', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53', '6-83-53']



    const mapImage = () => {
        switch (title) {
            case "1_1":
                return mapImage11
            case "2_1":
                return mapImage21
            case "2_2":
                return mapImage22
            case "306-2":
                return mapImage306
            case "307":
                return mapImage307
        }
    }

    const titleHandler = () =>
    {
        switch (title) {
            case "1_1":
                return "Зона Л-1"
            case "2_1":
                return "Зона Л-2"
            case "2_2":
                return "Зона П-2"
            case "306-2":
                return "АБК 306-2"
            case "307":
                return "АБК 307"
        }
    }

    const pointsArrayPlace = [
        // 2 этаж 1 крыло
        {id: 1, name: "Л-201", position: [cls.L201]},
        {id: 2, name: "Л-202", position: [cls.L202]},
        {id: 3, name: "Л-203", position: [cls.L203]},
        {id: 4, name: "Л-204", position: [cls.L204]},
        {id: 5, name: "Л-205", position: [cls.L205]},
        {id: 6, name: "Л-206", position: [cls.L206]},
        {id: 7, name: "Л-207", position: [cls.L207]},
        {id: 8, name: "Л-208", position: [cls.L208]},
        {id: 9, name: "Л-209", position: [cls.L209]},
        {id: 10, name: "Л-210", position: [cls.L210]},
        {id: 11, name: "Л-211", position: [cls.L211]},
        {id: 12, name: "Л-212", position: [cls.L212]},
        {id: 13, name: "Л-213", position: [cls.L213]},
        {id: 14, name: "Л-214", position: [cls.L214]},
        {id: 15, name: "Л-215", position: [cls.L215]},
        {id: 16, name: "Л-216", position: [cls.L216]},
        {id: 17, name: "Л-217", position: [cls.L217]},
        {id: 18, name: "Л-218", position: [cls.L218]},
        {id: 19, name: "Л-219", position: [cls.L219]},
        {id: 20, name: "Л-220", position: [cls.L220]},
        {id: 21, name: "Л-221", position: [cls.L221]},
        {id: 22, name: "Л-222", position: [cls.L222]},
        {id: 23, name: "Л-223", position: [cls.L223]},
        {id: 24, name: "Л-224", position: [cls.L224]},
        {id: 25, name: "Л-225", position: [cls.L225]},
        {id: 26, name: "Л-226", position: [cls.L226]},
        {id: 27, name: "Л-227", position: [cls.L227]},
        {id: 28, name: "Л-228", position: [cls.L228]},
        {id: 29, name: "Л-229", position: [cls.L229]},
        {id: 30, name: "Л-230", position: [cls.L230]},
        {id: 31, name: "Л-231", position: [cls.L231]},
        {id: 32, name: "Л-232", position: [cls.L232]},
        {id: 33, name: "Л-233", position: [cls.L233]},
        {id: 34, name: "Л-234", position: [cls.L234]},
        {id: 35, name: "Л-235", position: [cls.L235]},
        {id: 36, name: "Л-236", position: [cls.L236]},
        {id: 37, name: "Л-237", position: [cls.L237]},
        {id: 38, name: "Л-238", position: [cls.L238]},
        {id: 39, name: "Л-239", position: [cls.L239]},
        {id: 40, name: "Л-240", position: [cls.L240]},
        {id: 41, name: "Л-241", position: [cls.L241]},
        {id: 42, name: "Л-242", position: [cls.L242]},
        {id: 43, name: "Л-243", position: [cls.L243]},
        {id: 44, name: "Л-244", position: [cls.L244]},
        {id: 45, name: "Л-245", position: [cls.L245]},
        {id: 46, name: "Л-246", position: [cls.L246]},
        {id: 47, name: "Л-247", position: [cls.L247]},
        {id: 48, name: "Л-248", position: [cls.L248]},
        {id: 49, name: "Л-249", position: [cls.L249]},
        {id: 50, name: "Л-250", position: [cls.L250]},
        {id: 51, name: "Л-251", position: [cls.L251]},
        {id: 52, name: "Л-252", position: [cls.L252]},

        // 2 этаж 2 крыло
        {id: 53, name: "П-201", position: [cls.R201]},
        {id: 54, name: "П-202", position: [cls.R202]},
        {id: 55, name: "П-203", position: [cls.R203]},
        {id: 56, name: "П-204", position: [cls.R204]},
        {id: 57, name: "П-205", position: [cls.R205]},
        {id: 58, name: "П-206", position: [cls.R206]},
        {id: 59, name: "П-207", position: [cls.R207]},
        {id: 60, name: "П-208", position: [cls.R208]},
        {id: 61, name: "П-209", position: [cls.R209]},
        {id: 62, name: "П-210", position: [cls.R210]},
        {id: 63, name: "П-211", position: [cls.R211]},
        {id: 64, name: "П-212", position: [cls.R212]},
        {id: 65, name: "П-213", position: [cls.R213]},
        {id: 66, name: "П-214", position: [cls.R214]},
        {id: 67, name: "П-215", position: [cls.R215]},
        {id: 68, name: "П-216", position: [cls.R216]},
        {id: 69, name: "П-217", position: [cls.R217]},
        {id: 70, name: "П-218", position: [cls.R218]},
        {id: 71, name: "П-219", position: [cls.R219]},
        {id: 72, name: "П-220", position: [cls.R220]},
        {id: 73, name: "П-221", position: [cls.R221]},
        {id: 74, name: "П-222", position: [cls.R222]},
        {id: 75, name: "П-223", position: [cls.R223]},
        {id: 76, name: "П-224", position: [cls.R224]},
        {id: 77, name: "П-225", position: [cls.R225]},
        {id: 78, name: "П-226", position: [cls.R226]},
        {id: 79, name: "П-227", position: [cls.R227]},
        {id: 80, name: "П-228", position: [cls.R228]},
        {id: 81, name: "П-229", position: [cls.R229]},
        {id: 82, name: "П-230", position: [cls.R230]},
        {id: 83, name: "П-231", position: [cls.R231]},
        {id: 84, name: "П-232", position: [cls.R232]},
        {id: 85, name: "П-233", position: [cls.R233]},
        {id: 86, name: "П-234", position: [cls.R234]},
        {id: 87, name: "П-235", position: [cls.R235]},
        {id: 88, name: "П-236", position: [cls.R236]},
        {id: 89, name: "П-237", position: [cls.R237]},
        {id: 90, name: "П-238", position: [cls.R238]},
        {id: 91, name: "П-239", position: [cls.R239]},
        {id: 92, name: "П-240", position: [cls.R240]},
        {id: 93, name: "П-241", position: [cls.R241]},
        {id: 94, name: "П-242", position: [cls.R242]},
        {id: 95, name: "П-243", position: [cls.R243]},
        {id: 96, name: "П-244", position: [cls.R244]},
        {id: 97, name: "П-245", position: [cls.R245]},
        {id: 98, name: "П-246", position: [cls.R246]},
        {id: 99, name: "П-247", position: [cls.R247]},
        {id: 100, name: "П-248", position: [cls.R248]},
        {id: 101, name: "П-249", position: [cls.R249]},
        {id: 102, name: "П-250", position: [cls.R250]},
        {id: 103, name: "П-251", position: [cls.R251]},
        {id: 104, name: "П-252", position: [cls.R252]},
        {id: 105, name: "П-253", position: [cls.R253]},
        {id: 106, name: "П-254", position: [cls.R254]},

        // 1 этаж
        {id: 107, name: "Л-101", position: [cls.L101]},
        {id: 108, name: "Л-102", position: [cls.L102]},
        {id: 109, name: "Л-103", position: [cls.L103]},
        {id: 110, name: "Л-104", position: [cls.L104]},
        {id: 111, name: "Л-105", position: [cls.L105]},
        {id: 112, name: "Л-106", position: [cls.L106]},
        {id: 113, name: "Л-107", position: [cls.L107]},
        {id: 114, name: "Л-108", position: [cls.L108]},
        {id: 115, name: "Л-109", position: [cls.L109]},
        {id: 116, name: "Л-110", position: [cls.L110]},
        {id: 117, name: "Л-111", position: [cls.L111]},
        {id: 118, name: "Л-112", position: [cls.L112]},
        {id: 119, name: "Л-113", position: [cls.L113]},
        {id: 120, name: "Л-114", position: [cls.L114]},
        {id: 121, name: "Л-115", position: [cls.L115]},
        {id: 122, name: "Л-116", position: [cls.L116]},
        {id: 123, name: "Л-117", position: [cls.L117]},
        {id: 124, name: "Л-118", position: [cls.L118]},
        {id: 125, name: "Л-119", position: [cls.L119]},
        {id: 126, name: "Л-120", position: [cls.L120]},
        {id: 127, name: "Л-121", position: [cls.L121]},
        {id: 128, name: "Л-122", position: [cls.L122]},
        {id: 129, name: "Л-123", position: [cls.L123]},
        {id: 130, name: "Л-124", position: [cls.L124]},
        {id: 131, name: "Л-125", position: [cls.L125]},
        {id: 132, name: "Л-126", position: [cls.L126]},
        {id: 133, name: "Л-127", position: [cls.L127]},
        {id: 134, name: "Л-128", position: [cls.L128]},
        {id: 135, name: "Л-129", position: [cls.L129]},
        {id: 136, name: "Л-130", position: [cls.L130]},
        {id: 137, name: "Л-131", position: [cls.L131]},
        {id: 138, name: "Л-132", position: [cls.L132]},
        {id: 139, name: "Л-133", position: [cls.L133]},
        {id: 140, name: "Л-134", position: [cls.L134]},
        {id: 141, name: "Л-135", position: [cls.L135]},
        {id: 142, name: "Л-136", position: [cls.L136]},
    ]

    const renderPoint = (place: IReservationItem, position: string[], floor: string, phone?: string) => {
        if (floor === "2_1" && place.place_id < 53) {
            return (
                <Point place={place} className={classNames(cls.Point, {}, position)} selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} setSelectedPlace={setSelectedPlace} phone={phone}/>
            )
        }
        if (floor === "2_2" && place.place_id > 52 && place.place_id < 107) {
            return (
                <Point place={place} className={classNames(cls.Point, {}, position)} selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} setSelectedPlace={setSelectedPlace} phone={phone}/>
            )
        }
        if (floor === "1_1" && place.place_id > 106) {
            return (
                <Point place={place} className={classNames(cls.Point, {}, position)} selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} setSelectedPlace={setSelectedPlace} phone={phone}/>
            )
        }
    }

    return (
        <div>
            <div className={cls.title}>
                <Text title={titleHandler()}/>
            </div>
            <div className={cls.Map}>
                <img src={mapImage()} alt={title} className={cls.img}/>
                {places.map(place => renderPoint(place, pointsArrayPlace[place.place_id - 1].position, title, phoneList[place.place_id - 1]))}
            </div>
        </div>
    );
};