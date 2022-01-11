import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';

const clientId = '618262920527-sl1h49hr7mugct12j5ab5g0q10kaso6n.apps.googleusercontent.com';

const GoogleLoginBtn = ()=>{
  const [ id, setId ] = useState();
  const [ name, setName ] = useState();
  const [ provider, setProvider ] = useState();

  const onSuccess = (res) =>{
    // const { googleId, profileObj : { email, name } } = response;
    console.log("success", res)
    // await onGoogleLogin (
    //   console.log("hello")
    //   //구글 로그인 성공시 서버에 전달할 데이터
    // );
  }

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
    </div>
  )
}

export default GoogleLoginBtn;