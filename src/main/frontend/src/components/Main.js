import React from "react";


import { Route, Switch } from 'react-router-dom';
import { Home, Time, Goal, Report, Community, Login, Signup, Mypage } from './index.js'; 


function Main() {
    return (
        <div>
            <Switch>
                <Route path='/' exact={true} component={Home} />
                <Route path="/time" exact={true} component={ Time } />
                <Route path="/goal" exact={true} component={ Goal } />
                <Route path='/report' exact={true} component={Report} />
                <Route path='/community' exact={true} component={Community} />
                <Route path='/login' exact={true} component={Login} />
                <Route path='/signup' exact={true} component={Signup} />
                <Route path='/mypage' exact={true} component={Mypage} />
            </Switch>
        </div>        
    )
}

export default Main;