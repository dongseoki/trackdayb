import React, { Component } from "react";


import { Route, HashRouter } from 'react-router-dom';
import { Home, Time, Goal, Report, Community, Login, Signup } from './index.js'; 


class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <Route path='/' exact={true} component={Home} />
                    <Route path='/time' exact={true} component={Time} />
                    <Route path='/goal' exact={true} component={Goal} />
                    <Route path='/report' exact={true} component={Report} />
                    <Route path='/community' exact={true} component={Community} />
                    <Route path='/login' exact={true} component={Login} />
                    <Route path='/signup' exact={true} component={Signup} />
                </HashRouter>
            </div>
            
        )
    }
}

export default Main;