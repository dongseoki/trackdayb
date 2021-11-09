import React, {useContext, useState} from "react";
import "./Login.css";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {useHistory} from "react-router-dom";

function Login() {
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
      alert("올바른 정보를 입력하세요")
    }

    const formData = {
      memberId,
      password,
    };

    try{
      const result = await axios.post("/member/login", formData);
      console.log("제출결과", result)
      //현재 유저 설정
      setCurUser({memberId:result.data.memberId})
      //세션 스토리지에 저장하기
      sessionStorage.setItem("jwt-token", result.data.token)
      history.push("/time");
      
    }catch(err){
      console.log('err.response', err.response.statusText)
      alert(`올바른 정보를 입력하세요 (${err.response.statusText})`)
    }
  }


  return (
    <div className="about__container">
      <span>
        로그인
      </span>
      <form onSubmit = {handleSubmit}>
        <TextField
          id="outlined-memberId-input"
          label="memberId"
          type="text"
          autoComplete="current-memberId"
          onChange={(e) => setMemberId(e.target.value)}
        />
            
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submitBtn">로그인</button>
      </form>
      {/* <Form onSubmit={handleSubmit}>


          


          
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form> */}
    </div>
  );
}

export default Login;