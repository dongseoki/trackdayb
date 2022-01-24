import React from "react";
import './AccountInfo.css';
import { SiKakaotalk, SiGoogle, SiNaver} from "react-icons/si";

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
                <div><SiKakaotalk/></div>
                <div><SiGoogle/></div>
                <div><SiNaver/></div>
                
                <button>추가</button>
            </div>
        </div>
    )
}

export default AccountInfo;