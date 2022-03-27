import axiosInstance from "../axiosConfig"
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {LOAD_ACTIVITYSEARCHFULLLIST_REQUEST,
        LOAD_ACTIVITYSEARCHFULLLIST_SUCCESS,
        LOAD_ACTIVITYSEARCHFULLLIST_FAILURE, 
        LOAD_ACTIVITYDAYLIST_SUCCESS,
        LOAD_ACTIVITYDAYLIST_FAILURE,
        LOAD_ACTIVITYDAYLIST_REQUEST,
        ADD_ACTIVITY_REQUEST,
        ADD_ACTIVITY_SUCCESS,
        ADD_ACTIVITY_FAILURE,
        DELETE_ACTIVITY_REQUEST,
        DELETE_ACTIVITY_SUCCESS,
        DELETE_ACTIVITY_FAILURE,
        MODIFY_ACTIVITY_REQUEST,
        MODIFY_ACTIVITY_SUCCESS,
        MODIFY_ACTIVITY_FAILURE
    } from "../reducers/activity";

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

// 활동 추가
function addActivityAPI(data) {
    return axiosInstance.post('/timeManage/activity', data)
}
function* addActivity(action) {
    try{
        const result = yield call(addActivityAPI, action.data)
        yield put({
            type : ADD_ACTIVITY_SUCCESS,
            data : result
        })
    }catch(err) {
        yield put({
            type : ADD_ACTIVITY_FAILURE,
            error : err.response.data
        })
    }
}

// 활동 삭제
function deleteActivityAPI(data) {
    return axiosInstance.delete('/timeManage/activity', {params : data})
}
function* deleteActivity(action) {
    try{
        const result = yield call(deleteActivityAPI,  action.data)
        yield put({
            type : DELETE_ACTIVITY_SUCCESS,
            data : result.data.activityInfo.activityId
        })
    }catch(err) {
        yield put({
            type : DELETE_ACTIVITY_FAILURE,
            error : err.response.data
        })
    }
}

// 활동 수정
function modifyActivityAPI(data) {
    return axiosInstance.put('/timeManage/activity', data)
}
function* modifyActivity(action) {
    try{
        const result = yield call(modifyActivityAPI, action.data)
        yield put({
            type : MODIFY_ACTIVITY_SUCCESS,
            data : result.data.activityInfo
        })
    }catch(err) {
        yield put({
            type : MODIFY_ACTIVITY_FAILURE,
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
function* watchAddActivity() {
    yield takeLatest(ADD_ACTIVITY_REQUEST, addActivity);
}
function* watchDeleteActivity() {
    yield takeLatest(DELETE_ACTIVITY_REQUEST, deleteActivity);
}
function* watchModifyActivity() {
    yield takeLatest(MODIFY_ACTIVITY_REQUEST, modifyActivity);
}

export default function* activitySaga() {
    yield all([
        fork(watchLoadActivitySearchFullList),
        fork(watchLoadActivityDayList),
        fork(watchAddActivity),
        fork(watchDeleteActivity),
        fork(watchModifyActivity),
    ])
}