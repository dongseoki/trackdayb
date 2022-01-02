import React, {useContext, useState} from "react";
import "./Login.css";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import { toast } from 'react-toastify';
import useTitle from '../hooks/useTitle';

function Login() {
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