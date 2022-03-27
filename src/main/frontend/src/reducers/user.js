export const userInitialState = {
    loadMyInfoLoading : false, //로그인한 사용자 정보 시도 중
    loadMyInfoDone : false,
    loadMyInfoError : null,
    myInfo : null, // 로그인 사용자 전체 정보{}
    myId : null, // 로그인 사용자 아이디
    logInLoading : false, //로그인 시도 중
    logInDone : false,
    logInError : null,
    logOutLoading : false, //로그아웃 시도중
    logOutDone : false,
    logOutError : null,
    signUpLoading : false, // 회원가입 시도중
    signUpDone : false,
    signUpError : null,
    publicKeyLoading : false, // 공개키 시도중
    publicKeyDone : false,
    publicKeyError : null,
    publicKey : null,
    // accessToken : null,
    // refreshToken : null,
    changePwLoading : false, // 비밀번호 변경 시도중
    changePwDone : false,
    changePwError : null,
    snsLogInLoading : false, //SNS 로그인 시도 중
    snsLogInDone : false,
    snsLogInError : null,
    snsSignUpLoading : false, // 간편 회원가입(SNS) 시도중
    snsSignUpDone : false,
    snsSignUpError : null,
    snsLinkLoading : false, // SNS 계정연동
    snsLinkDone : false,
    snsLinkError : null,
    snsUnlinkLoading : false, // SNS 계정 연동 해지
    snsUnlinkDone : false,
    snsUnlinkError : null,

    withdrawalLoading : false, // 탈퇴
    withdrawalDone : false,
    withdrawalError : null,
    

}

// action 은 생략 그때그때 만들어서 사용

// types
export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST'
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS'
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE'

export const GET_PUBLICKEY_REQUEST = 'GET_PUBLICKEY_REQUEST'
export const GET_PUBLICKEY_SUCCESS = 'GET_PUBLICKEY_SUCCESS'
export const GET_PUBLICKEY_FAILURE = 'GET_PUBLICKEY_FAILURE'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const REISSUE_REQUEST = 'REISSUE_REQUEST' // accessToken 재발행
export const REISSUE_SUCCESS = 'REISSUE_SUCCESS'
export const REISSUE_FAILURE = 'REISSUE_FAILURE'

export const CHANGE_PW_REQUEST = 'CHANGE_PW_REQUEST' // pw 변경
export const CHANGE_PW_SUCCESS = 'CHANGE_PW_SUCCESS'
export const CHANGE_PW_FAILURE = 'CHANGE_PW_FAILURE'
export const CHANGE_PW_RESET = 'CHANGE_PW_RESET'

export const SNS_LOG_IN_REQUEST = 'SNS_LOG_IN_REQUEST' //SNS 로그인
export const SNS_LOG_IN_SUCCESS = 'SNS_LOG_IN_SUCCESS'
export const SNS_LOG_IN_FAILURE = 'SNS_LOG_IN_FAILURE'

export const SNS_SIGN_UP_REQUEST = 'SNS_SIGN_UP_REQUEST' // 간편 회원가입(SNS)
export const SNS_SIGN_UP_SUCCESS = 'SNS_SIGN_UP_SUCCESS'
export const SNS_SIGN_UP_FAILURE = 'SNS_SIGN_UP_FAILURE'
export const SNS_SIGN_UP_CANCLE = 'SNS_SIGN_UP_CANCLE' //취소

export const SNS_LINK_REQUEST = 'SNS_LINK_REQUEST' //SNS 계정연동
export const SNS_LINK_SUCCESS = 'SNS_LINK_SUCCESS'
export const SNS_LINK_FAILURE = 'SNS_LINK_FAILURE'

export const SNS_UNLINK_REQUEST = 'SNS_UNLINK_REQUEST' //SNS 계정연동 해지
export const SNS_UNLINK_SUCCESS = 'SNS_UNLINK_SUCCESS'
export const SNS_UNLINK_FAILURE = 'SNS_UNLINK_FAILURE'


export const WITHDRAWAL_REQUEST = 'WITHDRAWAL_REQUEST' // 회원 탈퇴
export const WITHDRAWAL_SUCCESS = 'WITHDRAWAL_SUCCESS'
export const WITHDRAWAL_FAILURE = 'WITHDRAWAL_FAILURE'


//reducer
const userReducer = (state=userInitialState, action) =>{
    switch(action.type) {
        case LOAD_MY_INFO_REQUEST: // 현재 유저 정보
            return {
                ...state,
                loadMyInfoLoading : true,
                loadMyInfoDone : false,
                loadMyInfoError : null,
            }
        case LOAD_MY_INFO_SUCCESS:
            console.log('현재 유저 정보', action.data)
            return {
                ...state,
                loadMyInfoLoading : false, 
                loadMyInfoDone : true,
                myInfo : action.data,
                myId : action.data.memberId,
            }
        case LOAD_MY_INFO_FAILURE:
            return {
                ...state,
                loadMyInfoLoading : false, 
                loadMyInfoError : action.error,
            }
        case GET_PUBLICKEY_REQUEST: // 공개키 시도
            return {
                ...state,
                publicKeyLoading : true, 
                publickKeyDone : false,
                publickKeyError : null,
            }
        case GET_PUBLICKEY_SUCCESS:
            return {
                ...state,
                publicKeyLoading : false, 
                publicKeyDone : true,
                publicKey : action.data
            }
        case GET_PUBLICKEY_FAILURE:
            return {
                ...state,
                publicKeyLoading : false, 
                publicKeyError : action.error,
            }
        case LOG_IN_REQUEST: // 로그인 시도
            return {
                ...state,
                logInLoading : true, 
                logInDone : false,
                logInError : null,
            }
        case LOG_IN_SUCCESS:
            console.log('로그인 성공 action.data', action.data)
            return {
                ...state,
                logInLoading : false, 
                logInDone : true,
                myId : action.data.memberId,
                myInfo : action.data.memberInfo,
                withdrawalDone : false,
                withdrawalError : null,
                // accessToken : action.data.tokenInfo.accessToken,
                // refreshToken : action.data.tokenInfo.refreshToken
            }
        case LOG_IN_FAILURE:
            return {
                ...state,
                logInLoading : false, 
                logInError : action.error,
            }
        case LOG_OUT_REQUEST: // 로그아웃 시도
            return {
                ...state,
                logOutLoading : true, 
                logOutDone : false,
                logOutError : null,
            }
        case LOG_OUT_SUCCESS:
            console.log("로그인 실패")
            return {
                ...state,
                logOutLoading : false, 
                logOutDone : true,
                myInfo : null,
                myId : null,
                loadMyInfoError : null,
                logInError : null,
                logOutError : null,
                signUpError : null,
                publicKeyError : null,
                changePwError : null,
                snsLogInError : null,
                snsSignUpError : null,
                snsLinkError : null,
                withdrawalError : null,
                // accessToken : null,
                // refreshToken : null,
            }
        case LOG_OUT_FAILURE:
            return {
                ...state,
                logOutLoading : false, 
                logOutError : action.error,
            }
        case SIGN_UP_REQUEST: // 회원가입 시도
            return {
                ...state,
                signUpLoading : true, 
                signUpDone : false,
                signUpError : null,
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpLoading : false, 
                signUpDone : true,
                myId : action.data.memberId,
                myInfo : action.data.memberInfo,
                withdrawalDone : false,
                withdrawalError : null,
            }
        case SIGN_UP_FAILURE:
            return {
                ...state,
                signUpLoading : false, 
                signUpError : action.error,
            }
        case REISSUE_SUCCESS: // accessToken 재발행 성공시 값만 업데이트
            return {
                ...state,
                // accessToken : action.data,
            }
        case CHANGE_PW_REQUEST: // 비밀번호 변경 시도
            return {
                ...state,
                changePwLoading : true, 
                changePwDone : false,
                changePwError : null,
            }
        case CHANGE_PW_SUCCESS:
            return {
                ...state,
                changePwLoading : false, 
                changePwDone : true,
            }
        case CHANGE_PW_FAILURE:
            return {
                ...state,
                changePwLoading : false, 
                changePwError : action.error,
            }
        case CHANGE_PW_RESET:
            return {
                ...state,
                changePwDone : false,
            }
        case SNS_LOG_IN_REQUEST: // SNS 로그인 시도
            return {
                ...state,
                snsLogInLoading : true, 
                snsLogInDone : false,
                snsLogInError : null,
            }
        case SNS_LOG_IN_SUCCESS:
            return {
                ...state,
                snsLogInLoading : false, 
                snsLogInDone : true,
                myId : action.data.memberId,
                myInfo : action.data.memberInfo,
                withdrawalDone : false,
                withdrawalError : null,
            }
        case SNS_LOG_IN_FAILURE:
            console.log("SNS 로그인 실패", action.error)
            return {
                ...state,
                snsLogInLoading : false, 
                snsLogInError : action.error,
            }

        case SNS_SIGN_UP_REQUEST: // SNS 간편 회원가입 시도
            return {
                ...state,
                snsSignUpLoading : true, 
                snsSignUpDone : false,
                snsSignUpError : null,
            }
        case SNS_SIGN_UP_SUCCESS:
            return {
                ...state,
                snsSignUpLoading : false, 
                snsSignUpDone : true,
                myId : action.data.memberId,
                myInfo : action.data.memberInfo,
                withdrawalDone : false,
                withdrawalError : null,
            }
        case SNS_SIGN_UP_FAILURE:
            return {
                ...state,
                snsSignUpLoading : false, 
                snsSignUpError : action.error,
            }
        case SNS_SIGN_UP_CANCLE:
            return {
                ...state,
                snsSignUpError : null,
                snsLogInError : null,
            }
        case SNS_LINK_REQUEST: // SNS 계정연동 시도
            return {
                ...state,
                snsLinkLoading : true, 
                snsLinkDone : false,
                snsLinkError : null,
            }
        case SNS_LINK_SUCCESS:
            console.log('SNS 계정연동 성공', action.data)
            return {
                ...state,
                snsLinkLoading : false, 
                snsLinkDone : true,
                myInfo : action.data.memberInfo,
            }
        case SNS_LINK_FAILURE:
            console.log("SNS 계정연동 실패", action.error)
            return {
                ...state,
                snsLinkLoading : false, 
                snsLinkError : action.error,
            }
        case SNS_UNLINK_REQUEST: // SNS 계정 연결 해지 시도
            return {
                ...state,
                snsUnlinkLoading : true, 
                snsUnlinkDone : false,
                snsUnlinkError : null,
            }
        case SNS_UNLINK_SUCCESS:
            console.log('SNS 계정연동 해지 성공', action.data)
            return {
                ...state,
                snsUnlinkLoading : false, 
                snsUnlinkDone : true,
                myInfo : action.data.memberInfo,
            }
        case SNS_UNLINK_FAILURE:
            console.log("SNS 계정연동 해지 실패", action.error)
            return {
                ...state,
                snsUnlinkLoading : false, 
                snsUnlinkError : action.error,
            }
        case WITHDRAWAL_REQUEST: // 회원 탈퇴
            return {
                ...state,
                withdrawalLoading : true, 
                withdrawalDone : false,
                withdrawalError : null,
            }
        case WITHDRAWAL_SUCCESS:
            return {
                ...state,
                withdrawalLoading : false, 
                withdrawalDone : true,
                myInfo : null,
                myId : null,
            }
        case WITHDRAWAL_FAILURE:
            console.log("회원 탈퇴 실패", action.error)
            return {
                ...state,
                withdrawalLoading : false, 
                withdrawalError : action.error,
            }
        default:
            return state;
        }
    }
    
    export default userReducer;