import React, { useEffect } from "react";
import "./Mypage.css";
import ImageUploadForm from "../components/ImageUploadForm";
import Profile from "../components/Profile";
import AccountInfo from "../components/AccountInfo";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";

function Mypage() {
    const dispatch = useDispatch();
    
    // 내정보
    useEffect(() =>{
        dispatch({
            type: LOAD_MY_INFO_REQUEST
        })
    },[]);

    return (
        <div className="mypage">
            <Profile/>
            <AccountInfo />
        </div>
    )
}




export default Mypage;