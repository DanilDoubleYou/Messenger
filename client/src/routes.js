import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Authpage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';

export const useRoutes = (isLogin) => {
    console.log(isLogin)
    if (isLogin) {
        return (
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Redirect to="/" />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/login" exact component={Authpage} />
                <Redirect to="/login" />
            </Switch>
        )
    }
};
