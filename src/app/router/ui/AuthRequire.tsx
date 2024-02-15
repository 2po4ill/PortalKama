import React from "react";
import { Navigate } from "react-router-dom";
import {RoutePath} from "shared/const/router";
import {useSelector} from "react-redux";
import {getAuthData} from "entities/User";

export interface AuthRequireProps {
    children?: React.ReactNode
}

export const AuthRequire = ({children}: AuthRequireProps) => {
    const auth = useSelector(getAuthData);

    if(!auth) {
        return <Navigate to={RoutePath.main} replace />
    }

    return children;
}