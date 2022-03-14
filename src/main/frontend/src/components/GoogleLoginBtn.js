import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { SNS_LOG_IN_REQUEST } from '../reducers/user';
import SimpleSignUpModal from './SimpleSignUpModal';

const clientId = '618262920527-9bhlc7np1t27qdumad3g11nlsmsg3c0e.apps.googleusercontent.com';

const GoogleLoginBtn = ()=>{
  const dispatch = useDispatch();

  // const [ id, setId ] = useState();
  // const [ name, setName ] = useState();
  // const [ provider, setProvider ] = useState();


  const { snsResultCode } = useSelector((state)=> state.user); 

  
  const [open, setOpen] = useState(false); // 간편회원가입 open



  const onSuccess = (res) =>{
    // 구글에서 로그인 성공
    // const { googleId, profileObj : { email, name } } = response;
    console.log("success", res)
    dispatch({
      type : SNS_LOG_IN_REQUEST,
      data : {tokenId : res.tokenId}
    })
  }

  // 200 + 연동된 계정 없을시 간편 로그인 모달로 이동
  useEffect(() => {
    if(snsResultCode === "9989"){
      console.log("snslogin fail. no linked member", snsResultCode)
      console.log('간편회원가입 Modal', open)
      setOpen(true) // 간편회원가입 모달 열기
      
    }
  },[snsResultCode])

  const onFailure = (err) => {
    console.log(err);
  }

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText='Google 로그인'
        // responseType = {"id_token"}
        onSuccess={onSuccess}
        onFailure={onFailure} />

      <SimpleSignUpModal open={open} setOpen={setOpen}/>
    </div>
  )
}

export default GoogleLoginBtn;