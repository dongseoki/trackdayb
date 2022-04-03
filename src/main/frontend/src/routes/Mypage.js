import React from "react";
import "./Mypage.css";
import useTitle from '../hooks/useTitle';
import Profile from "../components/Profile";
import AccountInfo from "../components/AccountInfo";

function Mypage() {
    const titleUpdater = useTitle("trackDay");
    setTimeout(()=>titleUpdater("마이페이지"), 100);
    return (
        <div className="mypage">
            <Profile/>
            <AccountInfo />
        </div>
    )
}




export default Mypage;