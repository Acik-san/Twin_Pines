import { combineReducers } from 'redux';
import taskReducer from './tasksReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  users: userReducer,
  tasks: taskReducer,
  auth: authReducer,
});

export default rootReducer;
