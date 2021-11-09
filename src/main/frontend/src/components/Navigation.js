import React, { useContext } from "react"
import { Link } from "react-router-dom";
import "./Navigation.css";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Navigation(){
    const [curUser, setCurUser] = useContext(AuthContext);

    const logoutHandler = async () =>{
        try{
            setCurUser()
            sessionStorage.removeItem("jwt-token");
            delete axios.defaults.headers.common.Authorization;
        }catch(err){
            console.error(err)
        }
    }
    return (
        <nav className="nav">
            <div className="title">
                <Link to="/">trackDay</Link>
            </div>
            <div className="menu">
                <ul>
                    <li><Link to={curUser ? "/time" : "/login"}>시간관리</Link></li>
                    <li><Link to={curUser ? "/goal" : "/login"}>목표관리</Link></li>
                    <li><Link to="/report">리포트</Link></li>
                    <li><Link to="/community">커뮤니티</Link></li>
                </ul>
            </div>

            <div className="sign">
                <ul>
                    {curUser ? (
                        <>
                        {/* <li><Link to="/mypage">마이페이지</Link></li> */}
                        <span>{curUser.memberId}</span>
                        <li><button className="logout-btn" onClick={logoutHandler}>로그아웃</button></li>
                        </>
                        ) : (
                            <>
                            <li><Link to="/login">로그인</Link></li>
                            <li><Link to="/signup">회원가입</Link></li>
                            </>
                        )}
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;