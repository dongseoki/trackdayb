import React, { useState, useContext } from "react";
import "./Signup.css";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import useTitle from '../hooks/useTitle';

function Signup() {
  const titleUpdater = useTitle("trackDay");
  setTimeout(()=>titleUpdater("회원가입"), 100);

  const [name, setName] = useState("")
  const [memberId, setMemberId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  // 현재 로그인 정보 Context
  const [, setCurUser] = useContext(AuthContext);
  const history = useHistory();

  // memberId validation Check
  const hasMemberIdError = memberIdEntered =>
    memberId.length < 4 ? true : false;
  // 비밀번호 validation check
  const hasPasswordError = (password) =>{
    // 특수문자 포함 체크 함수
    const containsSpecialChar = (value) => {
      const specialChars = "~․!@#$%^&*()_-+={}[]|\\;:'\"<>,.?/";
      for (let i = 0; i < specialChars.length; i++) {
        if (value.indexOf(specialChars[i]) > -1) { 
           return true; 
         } 
      }
      return false;
    }
    // 8자 이상, 최소 영문1개, 최소 숫자1개, 최소 특문 1개
    if(password.length < 8) return true
    else if(!password.match(".*[a-zA-Z]+.*")) return true
    else if(!password.match(".*[0-9]+.*")) return true
    if(containsSpecialChar(password) === false) {
      return true
    }
    else return false
  }
  // 비밀번호 더블 체크
  const hasNotSameError = passwordEntered =>
        password !== passwordCheck ? true : false;
  // 휴대폰번호 validation check
  const hasPhoneError = (phoneNumber) =>{
    if(!phoneNumber.match(/^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/)) return true
    else return false
  }
  // 이메일 validation check
  const hasEmailError = (emailAddress) =>{
    if(!emailAddress.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) return true
    else return false
  }

  const submitHandler = async (e) =>{
    e.preventDefault();
    try{
      //validation check
      if(hasMemberIdError('memberId')) throw new Error("MemberId는 4자 이상입니다.");
      if(hasPasswordError(password)) throw new Error("Password는 영문, 숫자, 특수문자 포함 8자 이상입니다.");
      if(hasNotSameError('passwordCheck')) throw new Error("Password가 일치 하지 않습니다.");
      if(phoneNumber && hasPhoneError(phoneNumber)) throw new Error('올바른 Phone Number를 입력하세요.');
      if(emailAddress && hasEmailError(emailAddress)) throw new Error('올바른 Email Address를 입력하세요.');
      const formData = {
        name : name,
        memberId : memberId,
        password : password,
        phoneNumber : phoneNumber,
        emailAddress : emailAddress
      }
      const result = await axios.post('/member/signup', formData)
      
      if(result.data.resultCode === "9997"){
        toast.error(`MemberId가 중복됩니다. (${result.data.message})`)
      } else if (result.data.resultCode === "9996"){
        toast.error(`올바른 정보를 입력하세요. (${result.data.message})`)
      } else { // 서버 회원가입 성공시
        // 현재 유저 설정
        setCurUser({
          memberId : result.data.memberId
        })
        // 세션 스토리지에 저장하기
        localStorage.setItem("jwt-token", result.data.token)
        history.push('/time')
        toast.success(`${result.data.memberId}님, 환영합니다!`)
      }
    }catch(err){
      toast.error(`Oops! 메인페이지로 돌아갑니다. (${err})`)
      history.push('/')
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
            required
            className="signup-input"
            id="outlined-name-input"
            label="Names"
            type="text"
            autoComplete="current-name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            className="signup-input"
            id="outlined-memberId-input"
            label="MemberId"
            type="text"
            autoComplete="current-memberId"
            onChange={(e) => setMemberId(e.target.value)}
            error={hasMemberIdError('memberId')}
            helperText={hasMemberIdError('memberId') ? '4자 이상' : null}
            inputProps={{maxLength: 12}}
          />
          <TextField
            required
            className="signup-input"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            error={hasPasswordError(password)}
            helperText={hasPasswordError(password) ? '영문자, 숫자, 특수문자 포함 8자 이상' : null}
            inputProps={{maxLength: 12}}
          />
          <TextField
            required
            className="signup-input"
            id="outlined-passwordCheck-input"
            label="Password Check"
            type="password"
            autoComplete="current-password-check"
            onChange={(e) => setPasswordCheck(e.target.value)}
            error={hasNotSameError('passwordCheck')}
            helperText={
                hasNotSameError('passwordCheck') ? "입력한 비밀번호와 일치하지 않습니다." : null
            }
          />
          <TextField
            className="signup-input"
            id="outlined-phoneNumber-input"
            label="Phone Number (선택입력)"
            type="text"
            autoComplete="current-phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            helperText='010-0000-0000'
            inputProps={{maxLength: 13}}
            error = {phoneNumber ? hasPhoneError(phoneNumber) : false}
          />
          <TextField
            className="signup-input"
            id="outlined-email-input"
            label="Email Address (선택입력)"
            type="text"
            autoComplete="current-email"
            onChange={(e) => setEmailAddress(e.target.value)}
            error = {emailAddress ? hasEmailError(emailAddress) : false}
          />
          <button type="submit" className="submitBtn">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;