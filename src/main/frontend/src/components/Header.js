import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom"; //BrouserRouter 사용시 # 없앨수있음
import Navigation from './Navigation';
import Home from "../routes/Home";
import Time from "../routes/Time";
import Goal from "../routes/Goal";
import Report from "../routes/Report";
import Community from "../routes/Community";
import Login from "../routes/Login";
import Signup from "../routes/Signup";


class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <HashRouter>
                        <Navigation />
                        <Route path='/' exact={true} component={Home} />
                        <Route path='/time' exact={true} component={Time} />
                        <Route path='/goal' exact={true} component={Goal} />
                        <Route path='/report' exact={true} component={Report} />
                        <Route path='/community' exact={true} component={Community} />
                        <Route path='/login' exact={true} component={Login} />
                        <Route path='/signup' exact={true} component={Signup} />
                    </HashRouter>
                </header>
            </div>
        );
    }
}

export default Header;