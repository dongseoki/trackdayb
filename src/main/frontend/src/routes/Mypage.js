import React from "react";
import axios from "axios";
import "./Mypage.css";
import ImageUploadForm from "../components/ImageUploadForm";

function Mypage() {
    return (
        <div>
            <h2>마이페이지_사진업로드</h2>
            <ImageUploadForm/>
        </div>
    )
}

export default Mypage;