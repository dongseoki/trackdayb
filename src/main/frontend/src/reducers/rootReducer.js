import { combineReducers } from "redux"; 
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage 사용

import goalReducer from "./goal";
import activityReducer from "./activity";
import userReducer from "./user";

const persistConfig = {
    key : 'user',
    storage : storage,
    whitelist : ["user"], // 스토리지에 저장할 값
    blacklist : ["user.snsResultCode"]
}

const rootReducer = combineReducers({
    goal : goalReducer,
    activity : activityReducer,
    user : userReducer
});

// export default rootReducer;
export default persistReducer(persistConfig, rootReducer);