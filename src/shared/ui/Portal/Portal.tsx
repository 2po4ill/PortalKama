import {createPortal} from "react-dom";
import React from "react";

export interface IPortalProps {
    children: React.ReactNode;
    element?: HTMLElement;
}

/**
 * Перемещает react элемент в любое место в DOM дереве
 * @param props
 * @constructor
 */
export const Portal = (props: IPortalProps) => {
    const {children, element = document.body} = props;
    return createPortal(children, element);
}