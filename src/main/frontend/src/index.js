import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { AuthContext, AuthProvider } from './context/AuthContext'; //로그인 유저 정보
import { GoalTotalTitleListProvider } from "./context/GoalTotalTitleListContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <GoalTotalTitleListProvider>
        <App />
      </GoalTotalTitleListProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
