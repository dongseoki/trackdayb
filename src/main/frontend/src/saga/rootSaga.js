import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import goalSaga from './goal';
import activitySaga from './activity';
import userSaga from './user';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// axios.defaults.withCredentials = true; // 다른포트로 쿠키 전달 허용

export default function* rootSaga() {
    yield all([ // 동시실행
        fork(goalSaga), // 실행
        fork(activitySaga),
        fork(userSaga),
    ])
}