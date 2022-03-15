import React, { useContext, useEffect, useState } from "react";
import "./Mypage.css";
import ImageUploadForm from "../components/ImageUploadForm";
import Profile from "../components/Profile";
import AccountInfo from "../components/AccountInfo";
// import { AuthContext } from '../context/AuthContext';
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";

function Mypage() {
    return (
        <div className="mypage">
            <Profile/>
            <AccountInfo />
        </div>
    )
}




export default Mypage;