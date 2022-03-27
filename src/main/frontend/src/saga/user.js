import axios from "axios";
import { all, call, put, takeLatest, fork } from "redux-saga/effects";
import axiosInstance from "../axiosConfig";
import { GET_PUBLICKEY_FAILURE, 
        GET_PUBLICKEY_REQUEST, 
        GET_PUBLICKEY_SUCCESS, 
        LOAD_MY_INFO_FAILURE, 
        LOAD_MY_INFO_REQUEST, 
        LOAD_MY_INFO_SUCCESS,
        LOG_IN_REQUEST,
        LOG_IN_SUCCESS,
        LOG_IN_FAILURE,
        LOG_OUT_REQUEST,
        LOG_OUT_SUCCESS,
        LOG_OUT_FAILURE, 
        REISSUE_REQUEST,
        REISSUE_SUCCESS,
        REISSUE_FAILURE,
        CHANGE_PW_REQUEST,
        CHANGE_PW_SUCCESS,
        CHANGE_PW_FAILURE,
        SIGN_UP_REQUEST,
        SIGN_UP_SUCCESS,
        SIGN_UP_FAILURE,
        SNS_LOG_IN_SUCCESS,
        SNS_LOG_IN_REQUEST,
        SNS_LOG_IN_FAILURE,
        SNS_SIGN_UP_REQUEST,
        SNS_SIGN_UP_SUCCESS,
        SNS_SIGN_UP_FAILURE,
        SNS_LINK_REQUEST,
        SNS_LINK_SUCCESS,
        SNS_LINK_FAILURE,
        WITHDRAWAL_REQUEST,
        WITHDRAWAL_SUCCESS,
        WITHDRAWAL_FAILURE,
        SNS_UNLINK_REQUEST,
        SNS_UNLINK_SUCCESS,
        SNS_UNLINK_FAILURE} from "../reducers/user";

function loadMyInfoAPI() { // 로그인 유저 정보
    return axiosInstance.get("/member/currentUser")
}
function* loadMyInfo() {
    try{
        const result = yield call(loadMyInfoAPI)
        yield put({
            type : LOAD_MY_INFO_SUCCESS,
            data : result.data.memberInfo, // 서버로부터 받아온 데이터
        })
    }catch(err) {
        console.erroe(err)
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error : err.response.data
        })
    }
}

function getPublicKeyAPI() { //로그인&회원가입시 패스워드 암호화 공개키
    return axios.get("/member/requestpublickey")
}
function* getPublicKey() {
    try{
        const result = yield call(getPublicKeyAPI)
        yield put({
            type : GET_PUBLICKEY_SUCCESS,
            data : result.data.publicKeyInfo.publicKeyStr, // 서버로부터 받아온 데이터
        })
    }catch(err) {
        console.erroe(err)
        yield put({
            type: GET_PUBLICKEY_FAILURE,
            error : err.response.data
        })
    }
}

function logInAPI(data) { // 로그인
    return axios.post('/member/login', data)
}
function* logIn(action) {
    try{
        const result = yield call(logInAPI, action.data);
        yield put({
            type : LOG_IN_SUCCESS,
            data : result.data, //서버로 부터 받아온 데이터
        })
        //로컬 스토리지에 저장하기
        localStorage.setItem("accessToken", result.data.tokenInfo.accessToken)
        localStorage.setItem("refreshToken", result.data.tokenInfo.refreshToken)
    }catch(err) {
        console.error(err);
        yield put({
            type: LOG_IN_FAILURE,
            error : err.response.data
        })
    }
}

function* logOut() { // 로그아웃
    try{
        yield put({
            type : LOG_OUT_SUCCESS,
        })
        //로컬 스토리지 삭제하기
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }catch(err) {
        console.error(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error : err.response.data
        })
    }
}

function signUpAPI(data) { // 회원가입
    return axios.post('/member/signup', data)
}
function* signUp(action) {
    try{
        const result = yield call(signUpAPI, action.data);
        yield put({
            type : SIGN_UP_SUCCESS,
            data : result.data, //서버로 부터 받아온 데이터
        })
        //로컬 스토리지에 저장하기
        localStorage.setItem("accessToken", result.data.tokenInfo.accessToken)
        localStorage.setItem("refreshToken", result.data.tokenInfo.refreshToken)
    }catch(err) {
        console.error(err);
        yield put({
            type: SIGN_UP_FAILURE,
            error : err.response.data
        })
    }
}
// function reIssueAPI(data) { // accessToken 재발급
//     return axios.post('/member/reissue', data)
// }
// function* reIssue(action) {
//     try{
//         const result = yield call(reIssueAPI, action.data);
//         yield put({
//             type : REISSUE_SUCCESS,
//             data : result.data, //서버로 부터 받아온 데이터
//         })
//     }catch(err) {
//         console.error(err);
//         yield put({
//             type: REISSUE_FAILURE,
//             error : err.response.data
//         })
//     }
// }

function chagePwAPI(data) { // 패스워드 변경
    return axiosInstance.post('/member/changepwd', data)
}
function* changePw(action) { // 패스워드 변경
    try{
        const result = yield call(chagePwAPI, action.data)
        yield put({
            type : CHANGE_PW_SUCCESS,
        })
    }catch(err) {
        console.log(err);
        yield put({
            type: CHANGE_PW_FAILURE,
            error : err.response.data
        })
    }
}

function snsLogInAPI(data) { // SNS 로그인
    return axios.post(`/member/snslogin/${data.snsName}`, data.payload)
}
function* snsLogIn(action) {
    try{
        const result = yield call(snsLogInAPI, action.data);
        yield put({
            type : SNS_LOG_IN_SUCCESS,
            data : result.data, //서버로 부터 받아온 데이터
        })
        //로컬 스토리지에 저장하기
        localStorage.setItem("accessToken", result.data.tokenInfo.accessToken)
        localStorage.setItem("refreshToken", result.data.tokenInfo.refreshToken)
        //tokenId 삭제하기
        localStorage.removeItem('tokenId');
    }catch(err) {
        console.error(err);
        yield put({
            type: SNS_LOG_IN_FAILURE,
            error : err.response.data
        })
    }
}

function snsSignUpAPI(data) { // SNS 간편 회원가입
    return axios.post(`/member/simplesignup/${data.snsName}`, data.payload)
}
function* snsSignUp(action) {
    try{
        const result = yield call(snsSignUpAPI, action.data);
        yield put({
            type : SNS_SIGN_UP_SUCCESS,
            data : result.data, //서버로 부터 받아온 데이터
        })
        //로컬 스토리지에 저장하기
        localStorage.setItem("accessToken", result.data.tokenInfo.accessToken)
        localStorage.setItem("refreshToken", result.data.tokenInfo.refreshToken)
        //SNS 토큰은 지우기
        localStorage.removeItem('tokenId')
    }catch(err) {
        console.error(err);
        yield put({
            type: SNS_SIGN_UP_FAILURE,
            error : err.response.data
        })
    }
}

function snsLinkAPI(data) { // SNS 계정연동
    return axiosInstance.patch(`/member/linkaccount/${data.snsName}`, data.payload)
}
function* snsLink(action) {
    try{
        const result = yield call(snsLinkAPI, action.data);
        yield put({
            type : SNS_LINK_SUCCESS,
            data : result.data, //서버로 부터 받아온 데이터
        })
        //로컬 스토리지에 저장하기
        // localStorage.setItem("accessToken", result.data.tokenInfo.accessToken)
        // localStorage.setItem("refreshToken", result.data.tokenInfo.refreshToken)
        // //SNS 토큰은 지우기
        // localStorage.removeItem('tokenId')
    }catch(err) {
        console.error(err);
        yield put({
            type: SNS_LINK_FAILURE,
            error : err.response.data
        })
    }
}

function snsUnlinkAPI(data) { // SNS 계정연동 해지
    return axiosInstance.delete(`/member/unlinkaccount/${data.snsName}`)
}
function* snsUnlink(action) {
    try{
        const result = yield call(snsUnlinkAPI, action.data);
        yield put({
            type : SNS_UNLINK_SUCCESS,
            data : result.data, //서버로 부터 받아온 데이터
        })
        // //SNS 토큰은 지우기
        // localStorage.removeItem('tokenId')
    }catch(err) {
        console.error(err);
        yield put({
            type: SNS_UNLINK_FAILURE,
            error : err.response.data
        })
    }
}

function withdrawalAPI() { // 회원 탈퇴
    return axiosInstance.delete('/member/withdrawal')
}
function* withdrawal() {
    try{
        const result = yield call(withdrawalAPI);
        yield put({
            type : WITHDRAWAL_SUCCESS,
            data : result.data, //서버로 부터 받아온 데이터
        })
        //로컬 스토리지 삭제하기
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }catch(err) {
        console.error(err);
        yield put({
            type: WITHDRAWAL_FAILURE,
            error : err.response.data
        })
    }
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchGetPublicKey() {
    yield takeLatest(GET_PUBLICKEY_REQUEST, getPublicKey);
}
function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}
// function* watchReIssue() {
//     yield takeLatest(REISSUE_REQUEST, reIssue);
// }
function* watchChangePw() {
    yield takeLatest(CHANGE_PW_REQUEST, changePw);
}
function* watchSnsLogIn() {
    yield takeLatest(SNS_LOG_IN_REQUEST, snsLogIn);
}
function* watchSnsSignUp() {
    yield takeLatest(SNS_SIGN_UP_REQUEST, snsSignUp);
}
function* watchSnsLink() {
    yield takeLatest(SNS_LINK_REQUEST, snsLink);
}
function* watchSnsUnlink() {
    yield takeLatest(SNS_UNLINK_REQUEST, snsUnlink);
}
function* watchWithdrawal() {
    yield takeLatest(WITHDRAWAL_REQUEST, withdrawal);
}

export default function* userSaga() {
    yield all([
        fork(watchLoadMyInfo),
        fork(watchGetPublicKey),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        // fork(watchReIssue),
        fork(watchChangePw),
        fork(watchSnsLogIn),
        fork(watchSnsSignUp),
        fork(watchSnsLink),
        fork(watchSnsUnlink),
        fork(watchWithdrawal),
    ])
}
