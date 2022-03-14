import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navigation.css";
// import {AuthContext} from "../context/AuthContext";
// import axios from "axios";
import { toast } from 'react-toastify';
import { useMediaQuery } from "react-responsive";
//icon
import {GiHamburgerMenu} from "react-icons/gi"
import GuidePopup from "./GuidePopup";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";
// import { store } from '../store/store';

function Navigation(){
    const dispatch = useDispatch();

    const { myId } = useSelector((state)=>state.user);
    const history = useHistory();

    // 가이드 모달 팝업
    const [showGuide, setShowGuide] = useState(false);
    const handleOpen = () => {
        setShowGuide(true);
    };

    const logoutHandler = () =>{
        dispatch({
            type : LOG_OUT_REQUEST,
        })
    }

    useEffect(() => {
        if(!myId) {
          history.push("/")
          toast.success("로그아웃 되었습니다.")
        }
    },[myId])


    // 반응형 화면 BreakPoint
    const isSmallScreen = useMediaQuery({
        query: "(max-width: 740px)",
    });
    
    // LeftNav 접기 State
    const [navFoldState, setNavFoldState] = useState(isSmallScreen ? true : false);
  
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
                        <li><Link to={myId ? "/goal" : "/login"}>목표관리</Link></li>
                        <li><Link to={myId ? "/time" : "/login"}>시간관리</Link></li>
                        <li><Link to="/report">리포트</Link></li>
                        <li><Link to="/community">커뮤니티</Link></li>
                    </ul>
                </div>
            </div>

            <div className="sign">
                <ul>
                    {myId ? <>
                        {/* <li><span>{myId.memberInfo.memberId}</span></li> */}
                        <li><Link to='/mypage'>{myId}</Link></li>
                        <li><button className="logout-btn" onClick={logoutHandler}>로그아웃</button></li>
                        </> : ( 
                            <>
                            <li><Link to="/login" className="login-btn">로그인</Link></li>
                            <li><Link to="/signup" className="signup-btn">회원가입</Link></li>
                            </>
                        )}
                    {isSmallScreen ? null: <li><button className="guide-btn" onClick={handleOpen}>가이드</button></li>}
                </ul>
            </div>
        </div>
        {isSmallScreen && navFoldState ? (
            <div className="hidden-block-menu">
                <ul>
                    <li><Link to={myId ? "/goal" : "/login"}>목표관리</Link></li>
                    <li><Link to={myId ? "/time" : "/login"}>시간관리</Link></li>
                    <li><Link to="/report">리포트</Link></li>
                    <li><Link to="/community">커뮤니티</Link></li>
                    <li><button className="guide-btn" onClick={handleOpen}>가이드</button></li>
                </ul>
            </div>
        ) : null}
        </nav>
        <GuidePopup showGuide={showGuide} setShowGuide={setShowGuide}/>
    </>
    )
}

export default Navigation;