import React, { useContext, useEffect } from "react";
import "./Mypage.css";
import ImageUploadForm from "../components/ImageUploadForm";
import Profile from "../components/Profile";
import AccountInfo from "../components/AccountInfo";
// import { AuthContext } from '../context/AuthContext';
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";

function Mypage() {
    const dispatch = useDispatch();

    // const [ curUser, setCurUser ] = useContext(AuthContext);
    // console.log('curUser', curUser);

    const { myInfo } = useSelector((state)=> state.user)
    console.log("myInfo", myInfo)

    useEffect(()=>{
        dispatch({
            type: LOAD_MY_INFO_REQUEST,
        })
    },[])

    return (
        <div>
            <h2>마이페이지_사진업로드</h2>
            <ImageUploadForm/>

            <Profile curUser={myInfo}/>
            <AccountInfo curUser={myInfo}/>

        </div>
    )
}

export default Mypage;