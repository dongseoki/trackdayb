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
        LOG_OUT_FAILURE } from "../reducers/user";

function loadMyInfoAPI() { // 로그인 유저 정보
    return axiosInstance.get("/member/currentUser")
}
function* loadMyInfo() {
    try{
        const result = yield call(loadMyInfoAPI)
        console.log('myinfo result', result)
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
        console.log('getPublicKeyAPI result', result)
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
    }catch(err) {
        console.error(err);
        yield put({
            type: LOG_IN_FAILURE,
            error : err.response.data
        })
    }
}

function* logOut() {
    try{
        yield put({
            type : LOG_OUT_SUCCESS,
        })
    }catch(err) {
        console.error(err);
        yield put({
            type: LOG_OUT_FAILURE,
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


export default function* userSaga() {
    yield all([
        fork(watchLoadMyInfo),
        fork(watchGetPublicKey),
        fork(watchLogIn),
        fork(watchLogOut),
        // fork(watchSignUp),
    ])
}