import React from "react";
import './AccountInfo.css';
import { SiKakaotalk, SiGoogle, SiNaver} from "react-icons/si";
import ChangePwModal from './ChangePwModal';
import { useSelector } from "react-redux";
import GoogleLinkBtn from "./GoogleLinkBtn";
import WithdrawalModal from "./WithdrawalModal";
import UnlinkAccountModal from "./UnlinkAccountModal";

const AccountInfo = () => {
    const { myInfo } = useSelector((state)=> state.user)
    return (
        <div className="accountInfo-main-wrapper">
            <div className="accountInfo-content-wrapper">
                <div className="accountInfo-title">비밀번호</div>
                <ChangePwModal/>
            </div>
            
            <div className="accountInfo-content-wrapper">
                <div className="accountInfo-title">계정연동</div>
                 
                {myInfo && myInfo.snsLinkInfoList.find(element => element.snsType === 'G') ?
                <>
                    {/* <img className="accountInfo-liked" src="/img/icon/google_icon.png"/> */}
                    <UnlinkAccountModal imageSrc="google_icon.png" snsName="google"/>
                </>
                :
                <GoogleLinkBtn/>
                }

                {myInfo && myInfo.snsLinkInfoList.find(element => element.snsType === 'K') ?
                <UnlinkAccountModal imageSrc="kakao_icon.png" snsName="kakao"/>
                :
                <div className="accountInfo-icon"><SiKakaotalk title="카카오톡연동"/></div>
                }


                {myInfo && myInfo.snsLinkInfoList.find(element => element.snsType === 'N') ?
                <UnlinkAccountModal imageSrc="naver_icon.png" snsName="naver"/>
                :
                <div className="accountInfo-icon"><SiNaver title="네이버연동"/></div>
                }

            </div>


            <div className="accountInfo-content-wrapper">
                <div className="accountInfo-title">탈퇴</div>
                <WithdrawalModal />
            </div>
        </div>
    )
}

export default AccountInfo;