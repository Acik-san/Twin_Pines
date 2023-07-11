import produce from 'immer';
import ACTION_TYPES from '../actions/type';
import CONSTANTS from '../constants';

const initialState = {
  user: null,
  users: [],
  isFetching: false,
  error: null,
};

const handleRequests = produce(draftState => {
  draftState.isFetching = true;
});
const handleError = produce((draftState, action) => {
  const {
    payload: { error },
  } = action;
  draftState.isFetching = false;
  draftState.error = error;
});
const handlers = {
  [ACTION_TYPES.SIGN_IN_REQUEST]: handleRequests,
  [ACTION_TYPES.SIGN_UP_REQUEST]: handleRequests,
  [ACTION_TYPES.LOGOUT_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_AUTH_USER_REQUEST]: handleRequests,
  [ACTION_TYPES.UPDATE_USER_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_USERS_REQUEST]: handleRequests,
  [ACTION_TYPES.SIGN_IN_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { user },
    } = action;
    draftState.isFetching = false;
    draftState.user = user;
  }),
  [ACTION_TYPES.SIGN_UP_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { user },
    } = action;
    draftState.isFetching = false;
    draftState.user = user;
  }),
  [ACTION_TYPES.LOGOUT_SUCCESS]: produce(draftState => {
    draftState.isFetching = false;
    window.localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
    draftState.user = null;
    draftState.users = [];
  }),
  [ACTION_TYPES.GET_AUTH_USER_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { user },
    } = action;
    draftState.isFetching = false;
    draftState.user = user;
  }),
  [ACTION_TYPES.GET_USERS_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { users },
    } = action;
    draftState.isFetching = false;
    draftState.users.push(...users);
  }),
  [ACTION_TYPES.UPDATE_USER_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { user },
    } = action;
    draftState.isFetching = false;
    draftState.user = user;
  }),
  [ACTION_TYPES.SET_ONLINE_STATUS]: produce((draftState, action) => {
    const {
      payload: { userId, status },
    } = action;
    userId
      ? draftState.users.forEach(user =>
          user.id === userId ? (user.status = status) : null
        )
      : draftState.users.forEach(user => (user.status = status));
    console.log(userId, status);
  }),
  [ACTION_TYPES.GET_ONLINE_USERS]: produce((draftState, action) => {
    const {
      payload: { users },
    } = action;
    draftState.users.forEach(user =>
      users.includes(user.id)
        ? (user.status = 'online')
        : (user.status = 'offline')
    );
  }),
  [ACTION_TYPES.SIGN_IN_ERROR]: handleError,
  [ACTION_TYPES.SIGN_UP_ERROR]: handleError,
  [ACTION_TYPES.LOGOUT_ERROR]: handleError,
  [ACTION_TYPES.GET_AUTH_USER_ERROR]: handleError,
  [ACTION_TYPES.GET_USERS_ERROR]: handleError,
  [ACTION_TYPES.UPDATE_USER_ERROR]: handleError,
};

const userReducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};

export default userReducer;
