import React from "react";
import './AccountInfo.css';

const AccountInfo = () => {
    return (
        <div className="accountInfo-content">
            <div style={{display:'flex'}}>
                <div>이메일</div>
                <div>test@gmail.com</div>
                <button>수정하기</button>
            </div>
            <div style={{display:'flex'}}>
                <div>연락처</div>
                <div>010-1234-1234</div>
                <button>수정하기</button>
            </div>
            <div style={{display:'flex'}}>
                <div>비밀번호</div>
                <button>수정하기</button>
            </div>
            <div style={{display:'flex'}}>
                <div>계정연동</div>
                <div>카카오</div>
                <button>수정하기</button>
            </div>
        </div>
    )
}

export default AccountInfo;