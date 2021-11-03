import React, {useState} from "react";
import "./Login.css";
import TextField from '@material-ui/core/TextField';
import axios from "axios";

function Login() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = ()=>{
    return memberId.length > 0 && password.length > 0;
  }

  const handleSubmit = async (evt) =>{
    evt.preventDefault();
    if(!validateForm()){
      alert("올바른 정보를 입력하세요")
    }
    console.log("memberId", memberId)
    console.log("password", password)

    const data = {
      memberId,
      password,
    };

    try{
      const result = await axios.post("/member/login", data);
      console.log("제출결과", result)
      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      // accessToken을 localStorage, cookie 등에 저장하지 않는다!

      //세션 스토리지에 저장하기
      sessionStorage.setItem("jwt-token", result.data.token)
      window.location = '/time'
    }catch(err){
      console.error(err)
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