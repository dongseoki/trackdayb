import React, { useState, useContext } from "react";
import "./Signup.css";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import TextField from '@material-ui/core/TextField';

function Signup(props) {
  const [name, setName] = useState("")
  const [memberId, setMemberId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  // 현재 로그인 정보 Context
  const [, setCurUser] = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = async (e) =>{
    e.preventDefault();
    try{
      console.log({name, memberId, password, passwordCheck})
      //validation chekc
      if(memberId.length < 3) throw new Error("아이디가 너무 짧다")
      if(password.length < 3) throw new Error("비밀번호가 너무 짧다")
      if(password !== passwordCheck) throw new Error("비밀번호가 맞지 않다")

      const formData = {
        name : name,
        memberId : memberId,
        password : password,
        phoneNumber : phoneNumber,
        emailAddress : emailAddress
      }
      const result = await axios.post('/member/signup', formData)
      console.log('회원가입 결과', result);
      //현재 유저 설정
      setCurUser({
        memberId : result.data.memberId
      })
      //세션 스토리지에 저장하기
      sessionStorage.setItem("jwt-token", result.data.token)
      history.push('/time')

    }catch(err){
      console.error(err);
    }

  }
  return (
    <div className="signup">
      <div className="signup-container">
        <h1 className='signup-title'>
          Sign up
        </h1>

        <form className="signup-form" onSubmit={submitHandler}>
          <TextField
            className="signup-input"
            id="outlined-name-input"
            label="Names"
            type="text"
            autoComplete="current-name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className="signup-input"
            id="outlined-memberId-input"
            label="memberId"
            type="text"
            autoComplete="current-memberId"
            onChange={(e) => setMemberId(e.target.value)}
          />
          <TextField
            className="signup-input"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            className="signup-input"
            id="outlined-passwordCheck-input"
            label="Password Check"
            type="password"
            autoComplete="current-password-check"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <TextField
            className="signup-input"
            id="outlined-phoneNumber-input"
            label="Phone Number"
            type="text"
            autoComplete="current-phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            className="signup-input"
            id="outlined-email-input"
            label="Email Address"
            type="text"
            autoComplete="current-email"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <TextField
            error
            id="standard-error-helper-text"
            label="Error"
            defaultValue="Hello World"
            helperText="Incorrect entry."
            variant="standard"
          />
          <button type="submit" className="submitBtn">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;