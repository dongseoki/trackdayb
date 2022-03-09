import React from "react";
import './AccountInfo.css';
import { SiKakaotalk, SiGoogle, SiNaver} from "react-icons/si";

const AccountInfo = () => {

    return (
        <div className="accountInfo-main-wrapper">
            <div className="accountInfo-content-wrapper">
                <div className="accountInfo-title">비밀번호</div>
                <button className="accountInfo-button">비밀번호 변경</button>
            </div>
            

            <div className="accountInfo-content-wrapper">
                <div className="accountInfo-title">계정연동</div>

                <div className="accountInfo-icon"><SiKakaotalk title="카카오톡연동"/></div>
                <div className="accountInfo-icon"><SiGoogle title="구글연동"/></div>
                <div className="accountInfo-icon"><SiNaver title="네이버연동"/></div>
            </div>


            <div className="accountInfo-content-wrapper">
                <div className="accountInfo-title">탈퇴</div>
                <button className="accountInfo-button">탈퇴하기</button>
                
            </div>
        </div>
    )
}

export default AccountInfo;