// saga 는 밑에서부터
import axios from 'axios';
import { all, call, fork, put, delay, takeLatest } from 'redux-saga/effects';
import { LOAD_GOALFULLLIST_REQUEST, LOAD_GOALFULLLIST_SUCCESS, LOAD_GOALFULLLIST_FAILURE } from '../reducers/goal';

// 목표 전체리스트 로드
function loadGoalFullListAPI() {
    return axios.get('/goalManage/goalFullList')
}
function* loadGoalFullList() {
    console.log("saga 호출")
    try{
        const result = yield call(loadGoalFullListAPI)
        // yield delay(1000);
        yield put({
            type : LOAD_GOALFULLLIST_SUCCESS,
            data : result.data.goalFullList // 서버로 부터 받아온 데이터
        })
    }catch(err) {
        yield put({
            type : LOAD_GOALFULLLIST_FAILURE,
            error : err.response.data
        })
    }
}
function* watchLoadGoalFullList() {
    yield takeLatest(LOAD_GOALFULLLIST_REQUEST, loadGoalFullList);
}

export default function* goalSaga() {
    yield all([
        fork(watchLoadGoalFullList)
    ])
}