import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  users: userReducer,
  chats: chatReducer,
});

export default rootReducer;
