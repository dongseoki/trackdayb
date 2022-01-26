import { combineReducers } from "redux"; 
import goalReducer from "./goal";

const initialState = {
    goal : {}
};


const rootReducer = combineReducers({
    goal : goalReducer,
});

export default rootReducer;