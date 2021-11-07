import React, { useState, useContext } from "react";
import "./Signup.css";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

function Signup(props) {
  console.log(props);
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
      setCurUser({
        memberId : result.data.memberId
      })
      history.push('/time')

    }catch(err){
      console.error(err);
    }

  }
  return (
    <div className="about__container">
      <span>
        회원가입
      </span>

      <form onSubmit={submitHandler}>
        <div>
          <label>이름</label>
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
          <label>아이디</label>
          <input value={memberId} onChange={(e) => setMemberId(e.target.value)}></input>
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}></input>
        </div>
        <div>
          <label>휴대폰번호</label>
          <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
        </div>
        <div>
          <label>이메일</label>
          <input value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}></input>
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Signup;