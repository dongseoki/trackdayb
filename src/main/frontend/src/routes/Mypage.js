import React, { useContext } from "react";
import "./Mypage.css";
import ImageUploadForm from "../components/ImageUploadForm";
import Profile from "../components/Profile";
import AccountInfo from "../components/AccountInfo";
import { AuthContext } from '../context/AuthContext';

function Mypage() {
    const [ curUser, setCurUser ] = useContext(AuthContext);
    console.log('curUser', curUser);

    return (
        <div>
            <h2>마이페이지_사진업로드</h2>
            <ImageUploadForm/>

            <Profile curUser={curUser}/>
            <AccountInfo curUser={curUser}/>

        </div>
    )
}

export default Mypage;