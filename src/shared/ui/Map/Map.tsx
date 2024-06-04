import React, {FC, useState} from "react";
import cls from "shared/ui/Map/Map.module.scss";
import mapImage21 from "shared/assets/images/2-1.jpg";
import mapImage11 from "shared/assets/images/1-1.jpg";
import mapImage22 from "shared/assets/images/2-2.jpg";
import {Point} from "shared/ui/Point/Point";
import {classNames} from "shared/lib/classNames"
export interface IMap {
    className?: string;
    title: string;
}

export const Map: FC<IMap> = (props) => {
    const {
        className,
        title
    } = props;

    const [selectedPoint, setSelectedPoint] = useState(Number(null));




    const mapImage = () => {
        if (title === "1_1")
            return mapImage11

        if (title === "2_1")
            return mapImage21

        return mapImage22
    }

    const pointsArray = [
        // 2 этаж 1 крыло
        {id: 0, position: [cls.a0]}, {id: 1, position: [cls.a1]}, {id: 2, position: [cls.a2]}, {id: 3, position: [cls.a3]},
        {id: 4, position: [cls.a4]}, {id: 5, position: [cls.a5]}, {id: 6, position: [cls.a6]}, {id: 7, position: [cls.a7]},
        {id: 8, position: [cls.a8]}, {id: 9, position: [cls.a9]}, {id: 10, position: [cls.a10]}, {id: 11, position: [cls.a11]},
        {id: 12, position: [cls.a12]}, {id: 13, position: [cls.a13]}, {id: 14, position: [cls.a14]}, {id: 15, position: [cls.a15]},
        {id: 16, position: [cls.a16]}, {id: 17, position: [cls.a17]}, {id: 18, position: [cls.a18]}, {id: 19, position: [cls.a19]},
        {id: 20, position: [cls.a20]}, {id: 21, position: [cls.a21]}, {id: 22, position: [cls.a22]}, {id: 23, position: [cls.a23]},
        {id: 24, position: [cls.a24]}, {id: 25, position: [cls.a25]}, {id: 26, position: [cls.a26]}, {id: 27, position: [cls.a27]},
        {id: 28, position: [cls.a28]}, {id: 29, position: [cls.a29]}, {id: 30, position: [cls.a30]}, {id: 31, position: [cls.a31]},
        {id: 32, position: [cls.a32]}, {id: 33, position: [cls.a33]}, {id: 34, position: [cls.a34]}, {id: 35, position: [cls.a35]},
        {id: 36, position: [cls.a36]}, {id: 37, position: [cls.a37]}, {id: 38, position: [cls.a38]}, {id: 39, position: [cls.a39]},
        {id: 40, position: [cls.a40]},

        // 2 этаж 2 крыло
        {id: 41, position: [cls.a41]}, {id: 42, position: [cls.a42]}, {id: 43, position: [cls.a43]}, {id: 44, position: [cls.a44]},
        {id: 45, position: [cls.a45]}, {id: 46, position: [cls.a46]}, {id: 47, position: [cls.a47]}, {id: 48, position: [cls.a48]},
        {id: 49, position: [cls.a49]}, {id: 50, position: [cls.a50]}, {id: 51, position: [cls.a51]}, {id: 52, position: [cls.a52]},
        {id: 53, position: [cls.a53]}, {id: 54, position: [cls.a54]}, {id: 55, position: [cls.a55]}, {id: 56, position: [cls.a56]},
        {id: 57, position: [cls.a57]}, {id: 58, position: [cls.a58]}, {id: 59, position: [cls.a59]}, {id: 60, position: [cls.a60]},
        {id: 61, position: [cls.a61]}, {id: 62, position: [cls.a62]}, {id: 63, position: [cls.a63]}, {id: 64, position: [cls.a64]},
        {id: 65, position: [cls.a65]}, {id: 66, position: [cls.a66]}, {id: 67, position: [cls.a67]}, {id: 68, position: [cls.a68]},
        {id: 69, position: [cls.a69]}, {id: 70, position: [cls.a70]}, {id: 71, position: [cls.a71]}, {id: 72, position: [cls.a72]},
        {id: 73, position: [cls.a73]}, {id: 74, position: [cls.a74]}, {id: 75, position: [cls.a75]}, {id: 76, position: [cls.a76]},
        {id: 77, position: [cls.a77]}, {id: 78, position: [cls.a78]},

        // 1 этаж
        {id: 79, position: [cls.a79]}, {id: 80, position: [cls.a80]}, {id: 81, position: [cls.a81]}, {id: 82, position: [cls.a82]},
        {id: 83, position: [cls.a83]}, {id: 84, position: [cls.a84]}, {id: 85, position: [cls.a85]}, {id: 86, position: [cls.a86]},
        {id: 87, position: [cls.a87]}, {id: 88, position: [cls.a88]}, {id: 89, position: [cls.a89]}, {id: 90, position: [cls.a90]},
        {id: 91, position: [cls.a91]}, {id: 92, position: [cls.a92]}, {id: 93, position: [cls.a93]}, {id: 94, position: [cls.a94]},
        {id: 95, position: [cls.a95]}, {id: 96, position: [cls.a96]}, {id: 97, position: [cls.a97]}, {id: 98, position: [cls.a98]},
        {id: 99, position: [cls.a99]}, {id: 100, position: [cls.a100]}, {id: 101, position: [cls.a101]}, {id: 102, position: [cls.a102]},
        {id: 103, position: [cls.a103]}, {id: 104, position: [cls.a104]}, {id: 105, position: [cls.a105]}, {id: 106, position: [cls.a106]},
        {id: 107, position: [cls.a107]}, {id: 108, position: [cls.a108]}, {id: 109, position: [cls.a109]}, {id: 110, position: [cls.a110]},
        {id: 111, position: [cls.a111]}
    ]

    const renderPoint = (id: number, status: string, position: string[], floor: string) => {
        if (floor === "2_1" && id < 41) {
            return (
                <Point status={"unavailable"} className={classNames(cls.Point, {}, position)} id={id} selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint}/>
            )
        }
        if (floor === "2_2" && id > 40 && id < 79) {
            return (
                <Point status={"available"} className={classNames(cls.Point, {}, position)} id={id} selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint}/>
            )
        }
        if (floor === "1_1" && id > 78) {
            return (
                <Point status={"available"} className={classNames(cls.Point, {}, position)} id={id} selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint}/>
            )
        }
    }

    return (
        <div className={cls.Map}>
            <img src={mapImage()} alt={title}></img>
            {pointsArray.map(point => renderPoint(point.id, "available", point.position, title))}
        </div>
    );
};