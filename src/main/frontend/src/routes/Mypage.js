import React, { useContext, useEffect, useState } from "react";
import "./Mypage.css";
import ImageUploadForm from "../components/ImageUploadForm";
import Profile from "../components/Profile";
import AccountInfo from "../components/AccountInfo";
// import { AuthContext } from '../context/AuthContext';
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";


const fakeUser = {
    activeUserStatus: "N",
    auth: "ROLE_USER",
    backgroundPhotoId: "",
    createDatetime: "2021-09-24 06:56:48",
    deletionStatus: "N",
    emailAddress: "trackday@gmail.com",
    failCount: "0",
    introduction: "안녕하세요 갓생사는 직장인입니다.",
    lastLoginDatetime: "",
    linkedEmail: "",
    memberId: "test",
    memberSerialNumber: "1",
    modificationDatetime: "2021-09-24 06:56:48",
    name: "홍길동",
    password: "$2a$10$yGU6hHyBQjloD6VJK1zmdu5S4.tMVR3EqnQIw7S57eIdgIBUf06CO",
    phoneNumber: "010-0000-0000",
    profilePhotoId: "",
    refreshToken: "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NDYzODA4Nzh9.LH8GsDVKlwxJwJem-IIzUAPnbWuuMEM6evh9dwmwPAbo5uS68XHFFaxO0x9gQF507guayjmknZELGMPh3ETcfQ",
    remark: "",
    snsLinkStatus: "N",
    withdrawalDatetime: "",
};

function Mypage() {
    const dispatch = useDispatch();

    // const [ curUser, setCurUser ] = useContext(AuthContext);
    // console.log('curUser', curUser);

    // const { myInfo } = useSelector((state)=> state.user)
    const myInfo = fakeUser;
    
    useEffect(()=>{
        dispatch({
            type: LOAD_MY_INFO_REQUEST,
        })
    },[])

    return (
        <div className="mypage">
            <Profile myInfo={myInfo}/>
            <AccountInfo curUser={myInfo}/>
        </div>
    )
}




export default Mypage;