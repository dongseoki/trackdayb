// saga 는 밑에서부터
import axios from 'axios';
import { all, call, fork, put, delay, takeLatest } from 'redux-saga/effects';
import {LOAD_GOALTOTALFULLLIST_REQUEST,
        LOAD_GOALTOTALFULLLIST_SUCCESS,
        LOAD_GOALTOTALFULLLIST_FAILURE,
        LOAD_GOALSEARCHFULLLIST_REQUEST,
        LOAD_GOALSEARCHFULLLIST_SUCCESS,
        LOAD_GOALSEARCHFULLLIST_FAILURE,
        LOAD_GOALSEARCHTITLELIST_REQUEST,
        LOAD_GOALSEARCHTITLELIST_SUCCESS,
        LOAD_GOALSEARCHTITLELIST_FAILURE} from '../reducers/goal';

import axiosInstance from '../axiosConfig';

// 목표 전체리스트 로드
function loadGoalTotalFullListAPI() {
    return axiosInstance.get('/goalManage/goalFullList')
}
function* loadGoalTotalFullList() {
    try{
        const result = yield call(loadGoalTotalFullListAPI)
        // yield delay(1000);
        yield put({
            type : LOAD_GOALTOTALFULLLIST_SUCCESS,
            data : result.data.goalFullList // 서버로 부터 받아온 데이터
        })
    }catch(err) {
        yield put({
            type : LOAD_GOALTOTALFULLLIST_FAILURE,
            error : err.response.data
        })
    }
}

// 목표 조건검색 리스트 로드
function loadGoalSearchFullListAPI(data) {
    return axiosInstance.get('/goalManage/goalFullList', {params : data})
}
function* loadGoalSearchFullList(action) {
    try{
        const result = yield call(loadGoalSearchFullListAPI, action.data)
        yield put({
            type : LOAD_GOALSEARCHFULLLIST_SUCCESS,
            data : result.data.goalFullList // 서버로 부터 받아온 데이터
        })
    }catch(err) {
        yield put({
            type : LOAD_GOALSEARCHFULLLIST_FAILURE,
            error : err.response.data
        })
    }
}

// 목표 조건검색 타이틀 로드
function loadGoalSearchTitleListAPI(data) {
    return axiosInstance.get('/goalManage/goalTitleList', {params : data})
}
function* loadGoalSearchTitleList(action) {
    try{
        const result = yield call(loadGoalSearchTitleListAPI, action.data)
        yield put({
            type : LOAD_GOALSEARCHTITLELIST_SUCCESS,
            data : result.data.goalTitleList // 서버로 부터 받아온 데이터
        })
    }catch(err) {
        yield put({
            type : LOAD_GOALSEARCHTITLELIST_FAILURE,
            error : err.response.data
        })
    }
}

function* watchLoadGoalToTalFullList() {
    yield takeLatest(LOAD_GOALTOTALFULLLIST_REQUEST, loadGoalTotalFullList);
}

function* watchLoadGoalSearchFullList() {
    yield takeLatest(LOAD_GOALSEARCHFULLLIST_REQUEST, loadGoalSearchFullList);
}

function* watchLoadGoalSearchTitleList() {
    yield takeLatest(LOAD_GOALSEARCHTITLELIST_REQUEST, loadGoalSearchTitleList);
}

export default function* goalSaga() {
    yield all([
        fork(watchLoadGoalToTalFullList),
        fork(watchLoadGoalSearchFullList),
        fork(watchLoadGoalSearchTitleList)
    ])
}