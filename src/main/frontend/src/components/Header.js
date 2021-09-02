import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom"; //BrouserRouter 사용시 # 없앨수있음
import Navigation from './Navigation';
import Home from "../routes/Home";
import About from "../routes/About";


class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <h1>헤더입니다</h1>
                    <HashRouter>
                        <Navigation />
                        <Route path='/' exact={true} component={Home} />
                        <Route path='/about' exact={true} component={About} />
                    </HashRouter>
                </header>
            </div>
        );
    }
}

export default Header;