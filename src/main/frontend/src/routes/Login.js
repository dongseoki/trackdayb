import React, {useContext, useEffect, useState} from "react";
import "./Login.css";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import { toast } from 'react-toastify';
import useTitle from '../hooks/useTitle';
import JSEncrypt from 'jsencrypt';


function Login() {
  const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
  FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
  xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
  gwQco1KRMDSmXSMkDwIDAQAB`

  const privateKey = `MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
  WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
  aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
  AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
  xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
  m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
  8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
  z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
  rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
  V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
  aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
  psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
  uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876`

  useEffect(()=> {
    let rsaEncrypt = new JSEncrypt();
    rsaEncrypt.setPublicKey(publicKey);
    let rsaEncryptedData = rsaEncrypt.encrypt("hello");
    console.log("rsaEncryptedData", rsaEncryptedData);

    let rsaDecrypt = new JSEncrypt();
    rsaDecrypt.setPrivateKey(privateKey);
    let rsaDecryptedData = rsaDecrypt.decrypt(rsaEncryptedData);
    console.log("rsaDecryptedData", rsaDecryptedData)
  },[])

  const titleUpdater = useTitle("trackDay");
  setTimeout(()=>titleUpdater("로그인"), 100);

  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [ , setCurUser ] = useContext(AuthContext);
  const history = useHistory();

  
  const validateForm = ()=>{
    return memberId.length > 0 && password.length > 0;
  }

  const handleSubmit = async (evt) =>{
    evt.preventDefault();
    if(!validateForm()){
      toast.error("올바른 정보를 입력하세요")
    }

    const formData = {
      memberId,
      password,
    };

    try{
      const result = await axios.post("/member/login", formData);
      //현재 유저 설정
      setCurUser({memberId:result.data.memberId})

      //로컬 스토리지에 저장하기
      localStorage.setItem("accessToken", result.data.tokenInfo.accessToken)
      localStorage.setItem("refreshToken", result.data.tokenInfo.refreshToken)

      history.push("/");
      toast.success(`${result.data.memberId}님, 반갑습니다!`)
      
    }catch(err){
      toast.error(`올바른 정보를 입력하세요 (${err.response.statusText})`)
    }
  }


  return (
    <div className="login">
      <div className="login-container">
        <h1 className="login-title">
          Sign in
        </h1>
        <form className='login-form' onSubmit = {handleSubmit}>
          <TextField
            required
            className="login-input"
            id="outlined-memberId-input"
            label="ID"
            type="text"
            autoComplete="current-memberId"
            onChange={(e) => setMemberId(e.target.value)}
          />
          <TextField
            required
            className="login-input"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submitBtn">로그인</button>
        </form>
      </div>
    </div>
  );
}

export default Login;