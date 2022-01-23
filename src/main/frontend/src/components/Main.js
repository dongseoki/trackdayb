import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Home, Time, Goal, Report, Community, Login, Signup, Mypage } from './index.js'; 
import PublicRoute from '../PublicRoute'

function Main() {
    return (
        <div className='main-content'>
            <Switch>
                <Route path='/' exact={true} component={Home} />
                <Route path="/time" exact={true} component={ Time } />
                <Route path="/goal" exact={true} component={ Goal } />
                <Route path='/report' exact={true} component={Report} />
                <Route path='/community' exact={true} component={Community} />
                <PublicRoute restricted={true} component={Login} path="/login" exact />
                <PublicRoute restricted={true} component={Signup} path="/signup" exact />
                <Route path='/mypage' exact={true} component={Mypage} />
            </Switch>
        </div>        
    )
}
export default Main;