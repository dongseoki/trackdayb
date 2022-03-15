import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SNS_LINK_REQUEST, SNS_LOG_IN_REQUEST } from '../reducers/user';

import { SiKakaotalk, SiGoogle, SiNaver} from "react-icons/si";
const clientId = '618262920527-9bhlc7np1t27qdumad3g11nlsmsg3c0e.apps.googleusercontent.com';

const GoogleLinkBtn = ()=>{
  const dispatch = useDispatch();
  const { snsLinkError } = useSelector((state)=> state.user); 


  const onSuccess = (res) =>{
    console.log("구글연동", res)
    // 구글에서 로그인 성공
    // localStorage.setItem('tokenId', res.tokenId);
    dispatch({
      type : SNS_LINK_REQUEST,
      data : {
        snsName : 'google',
        payload : {tokenId : res.tokenId}
      }
    })
  }

  // snsLinkError 처리
  useEffect(() => {
    if(snsLinkError){
      if(snsLinkError.resultCode === "9999"){
        toast.error('서버오류')
      }else if(snsLinkError.resultCode === "9994"){
        toast.error('SNS 인증 서버 처리 실패')
      }else if(snsLinkError.resultCode === "9992"){
        toast.error('SNS 인증 서버 처리 실패')
      }else{
        toast.error('알수 없는 에러')
      }
    }
  },[snsLinkError])

  const onFailure = (err) => {
    console.log(err);
  }
  
  return (
    <>
      <GoogleLogin
        clientId={clientId}
        // responseType = {"id_token"}
        render={renderProps => (
          <div className="accountInfo-icon" onClick={renderProps.onClick}><SiGoogle title="구글연동"/></div>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure} />
    </>
  )
}

export default GoogleLinkBtn;