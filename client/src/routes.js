import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Authpage from './pages/AuthPage/AuthPage';
import Messenger from './pages/Mesenger/Messenger';

export const useRoutes = (isLogin) => {

    if (isLogin) {
        return (
            <Switch>
                <Route path="/chat" exact component={Messenger} />
                <Redirect to="/chat" />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/login" exact component={Authpage} />
                <Route path="/registration" exact component={Authpage} />
                <Redirect to="/login" />
            </Switch>
        )
    }

};
