import React from "react";
import { Navigate } from "react-router-dom";
import {RoutePath} from "shared/const/router";
import {useSelector} from "react-redux";
import {userSelectors} from "entities/User";
import {PageLoader} from "widgets/PageLoader";

export interface AuthRequireProps {
    children?: React.ReactNode
}

export const AuthRequire = ({children}: AuthRequireProps) => {
    const { getIsAuthorized, getIsLoading } = userSelectors;
    const isLoading = useSelector(getIsLoading);
    const isAuthorized = useSelector(getIsAuthorized);


    if(!isLoading && !isAuthorized) {
        return <Navigate to={RoutePath.main} replace />
    }

    return isLoading ? <PageLoader /> : children;
}