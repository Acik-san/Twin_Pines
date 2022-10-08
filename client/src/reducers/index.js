import { combineReducers } from "redux";
import taskReducer from "./tasksReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  users: userReducer,
  tasks: taskReducer,
});

export default rootReducer;
