import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Mypage, Home, Time, Goal, Report, Community, Login, Signup} from './index.js'; 
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
                <Route path='/mypage' exact={true} component={Mypage} />
                <PublicRoute restricted={true} component={Login} path="/login" exact />
                <PublicRoute restricted={true} component={Signup} path="/signup" exact />
            </Switch>
        </div>        
    )
}
export default Main;