import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  users: userReducer,
  tasks: taskReducer,
  chats: chatReducer,
});

export default rootReducer;
