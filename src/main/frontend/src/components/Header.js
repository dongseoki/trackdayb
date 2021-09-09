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
                    </HashRouter>
                </header>
            </div>
        );
    }
}

export default Header;