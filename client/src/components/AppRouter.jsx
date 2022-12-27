import React, {useContext} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {authRoutes, publicRouts} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../store/Context";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, component}) =>
                <Route path={path} component={component} exact key={path}/>
            )}
            {publicRouts.map(({path, component}) =>
                <Route path={path} component={component} exact key={path}/>
            )}
            <Redirect to={SHOP_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;