import axiosInstance from "../axiosConfig"
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {LOAD_ACTIVITYSEARCHFULLLIST_REQUEST,
        LOAD_ACTIVITYSEARCHFULLLIST_SUCCESS,
        LOAD_ACTIVITYSEARCHFULLLIST_FAILURE, 
        LOAD_ACTIVITYDAYLIST_SUCCESS,
        LOAD_ACTIVITYDAYLIST_FAILURE,
        LOAD_ACTIVITYDAYLIST_REQUEST} from "../reducers/activity";

// 활동 조건검색 리스트 로드
function loadActivitySearchFullListAPI(data) {
    return axiosInstance.get('/timeManage/activityList', {params : data})
}
function* loadActivitySearchFullList(action) {
    try{
        const result = yield call(loadActivitySearchFullListAPI, action.data)
        yield put({
            type : LOAD_ACTIVITYSEARCHFULLLIST_SUCCESS,
            data : result.data.activityList // 서버로부터 받아온 데이터
        })
    }catch(err) {
        yield put({
            type : LOAD_ACTIVITYSEARCHFULLLIST_FAILURE,
            error : err.response.data
        })
    }
}
// 작성일 하루 활동 리스트 로드
function loadLoadActivityDayListAPI(data) {
    return axiosInstance.get('/timeManage/activityList', {params : data})
}
function* loadLoadActivityDayList(action) {
    try{
        const result = yield call(loadLoadActivityDayListAPI, action.data)
        yield put({
            type : LOAD_ACTIVITYDAYLIST_SUCCESS,
            data : result.data.activityList // 서버로부터 받아온 데이터
        })
    }catch(err) {
        yield put({
            type : LOAD_ACTIVITYDAYLIST_FAILURE,
            error : err.response.data
        })
    }
}

function* watchLoadActivitySearchFullList() {
    yield takeLatest(LOAD_ACTIVITYSEARCHFULLLIST_REQUEST, loadActivitySearchFullList);
}
function* watchLoadActivityDayList() {
    yield takeLatest(LOAD_ACTIVITYDAYLIST_REQUEST, loadLoadActivityDayList);
}

export default function* activitySaga() {
    yield all([
        fork(watchLoadActivitySearchFullList),
        fork(watchLoadActivityDayList),
    ])
}