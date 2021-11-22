import React, { useContext, useState } from "react";
import {useHistory} from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navigation.css";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import { toast } from 'react-toastify';
import { useMediaQuery } from "react-responsive";
//icon
import {GiHamburgerMenu} from "react-icons/gi"

function Navigation(){
    const [curUser, setCurUser] = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = async () =>{
        try{
            setCurUser()
            sessionStorage.removeItem("jwt-token");
            delete axios.defaults.headers.common.Authorization;
            toast.success("로그아웃 되었습니다.")
            history.push("/")
        }catch(err){
            toast.error("fail");
            console.error(err)
        }
    }

    // 반응형 화면 BreakPoint
    const isSmallScreen = useMediaQuery({
        query: "(max-width: 740px)",
    });
    
    // LeftNav 접기 State
    const [navFoldState, setNavFoldState] = useState(isSmallScreen ? true : false);
  
    console.log('isSmallScreen', isSmallScreen)
    console.log('navFoldState', navFoldState)
    console.log('isSmallScreen&& navFoldState', isSmallScreen&&navFoldState)
    return (
        <>
        <nav>
        <div className="nav">
            <div className="title">
                <Link to="/">trackDay</Link>
            </div>
            <div className="menu">
            {isSmallScreen ? <div className="nav-fold" onClick={()=>{setNavFoldState(!navFoldState)}}><GiHamburgerMenu/></div> : null}
                <div className="inline-block-menu">
                    <ul>
                        <li><Link to={curUser ? "/time" : "/login"}>시간관리</Link></li>
                        <li><Link to={curUser ? "/goal" : "/login"}>목표관리</Link></li>
                        <li><Link to="/report">리포트</Link></li>
                        <li><Link to="/community">커뮤니티</Link></li>
                    </ul>
                </div>
            </div>

            <div className="sign">
                <ul>
                    {curUser ? (
                        <>
                        {/* <li><Link to="/mypage">마이페이지</Link></li> */}
                        <li><span>{curUser.memberId}</span></li>
                        <li><button className="logout-btn" onClick={logoutHandler}>로그아웃</button></li>
                        </>
                        ) : ( isSmallScreen ? null:
                            <>
                            <li><Link to="/login" className="login-btn">로그인</Link></li>
                            <li><Link to="/signup" className="signup-btn">회원가입</Link></li>
                            </>
                        )}
                </ul>
            </div>
        </div>
        {isSmallScreen && navFoldState ? (
            <div className="hidden-block-menu">
                <ul>
                    <li><Link to={curUser ? "/time" : "/login"}>시간관리</Link></li>
                    <li><Link to={curUser ? "/goal" : "/login"}>목표관리</Link></li>
                    <li><Link to="/report">리포트</Link></li>
                    <li><Link to="/community">커뮤니티</Link></li>
                    <li><Link to="/login" className="login-btn">로그인</Link></li>
                    <li><Link to="/signup" className="signup-btn">회원가입</Link></li>
                </ul>
            </div>
        ) : null}
        </nav>
    </>
    )
}

export default Navigation;