import React from "react";
import "./Mypage.css";
import ImageUploadForm from "../components/ImageUploadForm";
import Profile from "../components/Profile";
import AccountInfo from "../components/AccountInfo";

function Mypage() {
    return (
        <div>
            <h2>마이페이지_사진업로드</h2>
            <ImageUploadForm/>

            <Profile />
            <AccountInfo />

        </div>
    )
}

export default Mypage;