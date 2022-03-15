import React, { useState, useEffect } from "react";
import "./Signup.css";
import {useHistory} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import useTitle from '../hooks/useTitle';
import JSEncrypt from 'jsencrypt';

import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST, GET_PUBLICKEY_REQUEST } from "../reducers/user";


function Signup() {
  const dispatch = useDispatch();

  const titleUpdater = useTitle("trackDay");
  setTimeout(()=>titleUpdater("회원가입"), 100);

  const { publicKey, signUpError, myId } = useSelector((state)=> state.user); 

  useEffect(()=>{
    dispatch({
        type: GET_PUBLICKEY_REQUEST,
    })
  },[])

  const [name, setName] = useState("")
  const [memberId, setMemberId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState('')
  // const [emailAddress, setEmailAddress] = useState('')

  const history = useHistory();

  // memberId validation Check
  const hasMemberIdError = memberIdEntered =>
    memberId.length < 4 ? false : true;
  // 비밀번호 validation check
  const hasPasswordError = (password) =>{
    // 특수문자 포함 체크 함수
    const containsSpecialChar = (value) => {
      const specialChars = "~․!@#$%^&*()_-+={}[]|\\;:'\"<>,.?/";
      for (let i = 0; i < specialChars.length; i++) {
        if (value.indexOf(specialChars[i]) > -1) { 
           return false;
         }
      }
      return true;
    }
    // 8자 이상, 최소 영문1개, 최소 숫자1개, 최소 특문 1개
    if(password.length < 8) return false
    else if(!password.match(".*[a-zA-Z]+.*")) return false
    else if(!password.match(".*[0-9]+.*")) return false
    if(containsSpecialChar(password) === true) {
      return false
    }
    else return true
  }
  // 비밀번호 더블 체크
  const hasNotSameError = passwordEntered =>
        password !== passwordCheck ? false : true;

  // 휴대폰번호 validation check
  // const hasPhoneError = (phoneNumber) =>{
  //   if(!phoneNumber.match(/^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/)) return true
  //   else return false
  // }
  // 이메일 validation check
  // const hasEmailError = (emailAddress) =>{
  //   if(!emailAddress.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) return true
  //   else return false
  // }

  //회원가입 제출
  const submitHandler = (e) =>{
    e.preventDefault();
    // try{
      if(hasMemberIdError('memberId') && hasPasswordError(password) && hasNotSameError('passwordCheck')){
        // 데이터 암호화
        let rsaEncrypt = new JSEncrypt();
        rsaEncrypt.setPublicKey(publicKey);
        let rsaEncryptedMemberId = rsaEncrypt.encrypt(memberId);
        let rsaEncryptedPassword = rsaEncrypt.encrypt(password);
        const formData = {
          name,
          memberId : rsaEncryptedMemberId,
          password : rsaEncryptedPassword,
          // phoneNumber : phoneNumber,
          // emailAddress : emailAddress
        }
        console.log("formData", formData)
        dispatch({
          type : SIGN_UP_REQUEST,
          data : formData,
        })
      } else {
        if(!hasMemberIdError('memberId')) toast.error("ID는 4자 이상입니다.");
        if(!hasPasswordError(password)) toast.error("Password는 영문, 숫자, 특수문자 포함 8자 이상입니다.");
        if(!hasNotSameError('passwordCheck')) toast.error("Password가 일치 하지 않습니다.");
        // if(phoneNumber && hasPhoneError(phoneNumber)) toast.error('올바른 Phone Number를 입력하세요.');
        // if(emailAddress && hasEmailError(emailAddress)) toast.error('올바른 Email Address를 입력하세요.');
      }
  }
    
  // 회원가입 성공시
  useEffect(() => {
    if(myId) {
      history.push("/")
      toast.success(`${myId}님, 반갑습니다!`)
    }
  },[myId])

  // 회원가입 signUpError 에러처리
  useEffect(() => {
    if(signUpError){
      if(signUpError.resultCode === "9997"){
        toast.error('아이디가 중복됩니다.')
      }else if(signUpError.resultCode === "9996"){
        toast.error(signUpError.message)
      }else if(signUpError.resultCode === "9999"){
        toast.error('서버에러')
      }else{
        toast.error('Oops! 알수 없는 에러')
      }
      dispatch({
        type: GET_PUBLICKEY_REQUEST,
      })
    }
  }, [signUpError])


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
            label="Name"
            type="text"
            autoComplete="current-name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            className="signup-input"
            id="outlined-memberId-input"
            label="ID"
            type="text"
            autoComplete="current-memberId"
            onChange={(e) => setMemberId(e.target.value)}
            error={!hasMemberIdError('memberId')}
            helperText={!hasMemberIdError('memberId') ? '4자 이상' : null}
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
            error={!hasPasswordError(password)}
            helperText={!hasPasswordError(password) ? '영문자, 숫자, 특수문자 포함 8자 이상' : null}
            inputProps={{maxLength: 20}}
          />
          <TextField
            required
            className="signup-input"
            id="outlined-passwordCheck-input"
            label="Password Check"
            type="password"
            autoComplete="current-password-check"
            onChange={(e) => setPasswordCheck(e.target.value)}
            error={!hasNotSameError('passwordCheck')}
            helperText={
                !hasNotSameError('passwordCheck') ? "입력한 비밀번호와 일치하지 않습니다." : null
            }
            inputProps={{maxLength: 20}}
          />
          {/* <TextField
            className="signup-input"
            id="outlined-phoneNumber-input"
            label="Phone Number (선택입력)"
            type="text"
            autoComplete="current-phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            helperText='010-0000-0000'
            inputProps={{maxLength: 13}}
            error = {phoneNumber ? hasPhoneError(phoneNumber) : false}
          /> */}
          {/* <TextField
            className="signup-input"
            id="outlined-email-input"
            label="Email Address (선택입력)"
            type="text"
            autoComplete="current-email"
            onChange={(e) => setEmailAddress(e.target.value)}
            error = {emailAddress ? hasEmailError(emailAddress) : false}
          /> */}
          <button type="submit" className="submitBtn">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;