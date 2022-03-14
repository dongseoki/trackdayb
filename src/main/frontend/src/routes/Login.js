import React, {useEffect, useState} from "react";
import "./Login.css";
import TextField from '@material-ui/core/TextField';
import {useHistory} from "react-router-dom";
import { toast } from 'react-toastify';
import useTitle from '../hooks/useTitle';
import JSEncrypt from 'jsencrypt';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PUBLICKEY_REQUEST, LOG_IN_REQUEST } from "../reducers/user";
import GoogleLoginBtn from "../components/GoogleLoginBtn";

function Login() {
  const dispatch = useDispatch();

  const titleUpdater = useTitle("trackDay");
  setTimeout(()=>titleUpdater("로그인"), 100);

  const { publicKey, logInError, myId } = useSelector((state)=> state.user);

  useEffect(()=>{
    dispatch({
        type: GET_PUBLICKEY_REQUEST,
    })
  },[])

  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const validateForm = ()=>{
    return memberId.length > 0 && password.length > 0;
  }

  // 로그인 제출
  const handleSubmit = (evt) =>{
    evt.preventDefault();
    if(!validateForm()){
      toast.error("올바른 정보를 입력하세요")
    }
    // 데이터 암호화
    let rsaEncrypt = new JSEncrypt();
    rsaEncrypt.setPublicKey(publicKey);
    let rsaEncryptedMemberId = rsaEncrypt.encrypt(memberId);
    let rsaEncryptedPassword = rsaEncrypt.encrypt(password);

    const formData = {
      memberId : rsaEncryptedMemberId,
      password : rsaEncryptedPassword,
    };

    dispatch({
      type : LOG_IN_REQUEST,
      data : formData
    })
  }

  // 로그인 성공시
  useEffect(() => {
    if(myId) {
      history.push("/")
      toast.success(`${myId}님, 반갑습니다!`)
    }
  },[myId])

  // 로그인 에러 발생시
  useEffect(() => {
    if(logInError){
        alert(logInError)
    }
}, [logInError]);

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
          <GoogleLoginBtn />
      </div>
    </div>
  );
}

export default Login;