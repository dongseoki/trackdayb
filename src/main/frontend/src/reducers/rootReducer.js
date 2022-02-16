import { combineReducers } from "redux"; 
import goalReducer from "./goal";
import activityReducer from "./activity";

const rootReducer = combineReducers({
    goal : goalReducer,
    activity : activityReducer
});

export default rootReducer;