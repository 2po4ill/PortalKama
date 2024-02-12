import React, {ReactNode, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {routeConfig} from "../config/routerConfig";
import {Spinner} from "shared/ui/Spinner/Spinner";
import {PageLoader} from "widgets/PageLoader";
import {useSelector} from "react-redux";
import {getAuthData} from "entities/User";
import MainPage from "pages/MainPage";


function profileDetector(element: React.ReactNode,path: string) {
    const authData = useSelector(getAuthData)
    if (path == '/profile' && authData) {
        return element
    }
    else {
        if (path == '/profile') {
            return (<MainPage/>)
        }
        else {
            return element
        }
    }
}

const AppRouter = () => {
    return (
        <Routes>
            {Object.values(routeConfig).map(({element, path}) => (
                    <Route
                        element={(
                            <Suspense fallback={<PageLoader/>}>
                                    {profileDetector(element, path)}
                            </Suspense>
                        )}
                        path={path}
                        key={path}
                    />
            ))}
        </Routes>
    );
};

export default AppRouter;