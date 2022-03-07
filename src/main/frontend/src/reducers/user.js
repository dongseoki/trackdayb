export const userInitialState = {
    loadMyInfoLoading : false, //로그인한 사용자 정보 시도 중
    loadMyInfoDone : false,
    loadMyInfoError : null,
    myInfo : null, // localStorage 저장 데이터
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
    reissueLoading : false, // accessToken Reissue 시도중
    reissueDone : false,
    reissueError : null,
    accessToken : null,
    refreshToken : null,
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
            return {
                ...state,
                loadMyInfoLoading : false, 
                loadMyInfoDone : true,
                myInfo : action.data
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
            return {
                ...state,
                logInLoading : false, 
                logInDone : true,
                myInfo : action.data,
                accessToken : action.data.tokenInfo.accessToken,
                refreshToken : action.data.tokenInfo.refreshToken
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
            return {
                ...state,
                logOutLoading : false, 
                logOutDone : true,
                myInfo : null,
                accessToken : null,
                refreshToken : null,
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
            }
        case SIGN_UP_FAILURE:
            return {
                ...state,
                signUpLoading : false, 
                signUpError : action.error,
            }
        case REISSUE_REQUEST: // accessToken 재발행 시도
            return {
                ...state,
                reissueLoading : true, 
                reissueDone : false,
                reissueError : null,
            }
        case REISSUE_SUCCESS:
            return {
                ...state,
                reissueLoading : false, 
                reissueDone : true,
                accessToken : action.data.tokenInfo.accessToken,
            }
        case REISSUE_FAILURE:
            return {
                ...state,
                reissueLoading : false, 
                reissueError : action.error,
            }
        default:
            return state;
        }
    }
    
    export default userReducer;