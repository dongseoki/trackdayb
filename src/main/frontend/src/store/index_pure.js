// 사가 없이 만들기

import { createStore } from "redux";
import rootReducer from "../reducers/index_pure";

const store = createStore(rootReducer);

export default store;

