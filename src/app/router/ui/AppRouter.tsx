import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {routeConfig} from "../config/routerConfig";

const AppRouter = () => {
    return (
        <Suspense fallback={"Loading..."}>
            <Routes>
                {Object.values(routeConfig).map(({element, path}) => (
                    <Route element={element} path={path} key={path} />
                ))}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;