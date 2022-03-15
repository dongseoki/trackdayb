import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SNS_LOG_IN_REQUEST } from '../reducers/user';
import SimpleSignUpModal from './SimpleSignUpModal';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLoginBtn = ()=>{
  const dispatch = useDispatch();
  const { snsLogInError } = useSelector((state)=> state.user); 
  const [open, setOpen] = useState(false); // 간편회원가입 open

  useEffect(()=>{
    setOpen(false);
  },[])

  const onSuccess = (res) =>{
    // 구글에서 로그인 성공
    localStorage.setItem('tokenId', res.tokenId);
    dispatch({
      type : SNS_LOG_IN_REQUEST,
      data : {
        snsName : 'google',
        payload : {tokenId : res.tokenId}
      }
    })
  }

  // snsLogInError 처리
  useEffect(() => {
    if(snsLogInError){
      if(snsLogInError.resultCode === "9989"){
        toast.error('가입되지 않은 사용자입니다. 간편회원가입으로 연결합니다.')
        setOpen(true) // 간편회원가입 모달 열기
      }else if(snsLogInError.resultCode === "9999"){
        toast.error('서버오류')
        localStorage.removeItem('tokenId');
      }else if(snsLogInError.resultCode === "9994"){
        toast.error('SNS 인증 서버 처리 실패')
        localStorage.removeItem('tokenId');
      }else{
        toast.error('알수 없는 에러')
        localStorage.removeItem('tokenId');
      }
    }
  },[snsLogInError])

  const onFailure = (err) => {
    console.log(err);
  }

  return (
    <>
      <GoogleLogin
        className='snsLoginBtn'
        clientId={clientId}
        buttonText='Google 로그인'
        // responseType = {"id_token"}
        onSuccess={onSuccess}
        onFailure={onFailure} />

      <SimpleSignUpModal open={open} setOpen={setOpen} snsName='google' />
    </>
  )
}

export default GoogleLoginBtn;