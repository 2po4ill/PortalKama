import React, {FC, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {AppRouteProps, routeConfig} from "../config/routerConfig";
import {PageLoader} from "widgets/PageLoader";
import {AuthRequire} from "app/router/ui/AuthRequire";

const AppRouter = () => {
    const renderElement = (props: AppRouteProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {props.element}
            </Suspense>
        )

        return (
            <Route
                key={props.path}
                path={props.path}
                element={props.authRequire ? <AuthRequire>{element}</AuthRequire> : element }
            />
        )
    }

    return (
        <Routes>
            {Object.values(routeConfig).map(renderElement)}
        </Routes>
    );
};

export default AppRouter;