import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext'; //로그인 유저 정보
// import { CookieProvider } from 'react-cookie'; //팝업창 쿠키

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      {/* <CookieProvider> */}
        <App />
      {/* </CookieProvider> */}
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
