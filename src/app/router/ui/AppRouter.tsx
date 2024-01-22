import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {routeConfig} from "../config/routerConfig";
import {Spinner} from "shared/ui/Spinner/Spinner";
import {PageLoader} from "widgets/PageLoader";

const AppRouter = () => {
    return (
        <Routes>
            {Object.values(routeConfig).map(({element, path}) => (
                    <Route
                        element={(
                            <Suspense fallback={<PageLoader/>}>
                                    {element}
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