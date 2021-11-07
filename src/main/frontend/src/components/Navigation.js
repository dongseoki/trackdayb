import React, { useContext } from "react"
import { Link } from "react-router-dom";
import "./Navigation.css";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Navigation(){
    const [curUser, setCurUser] = useContext(AuthContext);
    const logoutHandler = async () =>{
        try{
            console.log('로그아웃')
            // await axios.patch('/member/logout');
            setCurUser()
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
                    <li><Link to="/time">시간관리</Link></li>
                    <li><Link to="/goal">목표관리</Link></li>
                    <li><Link to="/report">리포트</Link></li>
                    <li><Link to="/community">커뮤니티</Link></li>
                </ul>
            </div>

            <div className="sign">
                <ul>
                    {curUser ? (
                        <>
                        <span>{curUser.memberId}</span>
                        <span onClick={logoutHandler}>로그아웃</span>
                        <li><Link to="/mypage">마이페이지</Link></li>
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