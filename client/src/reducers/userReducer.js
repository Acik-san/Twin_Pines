import produce from 'immer';
import ACTION_TYPES from '../actions/type';
import CONSTANTS from '../constants';

const initialState = {
  user: null,
  isFetching: false,
  error: null,
};

const handleRequests = produce((draftState, action) => {
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
  [ACTION_TYPES.LOGOUT_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    window.localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
    draftState.user = null;
  }),
  [ACTION_TYPES.GET_AUTH_USER_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { user },
    } = action;
    draftState.isFetching = false;
    draftState.user = user;
  }),
  [ACTION_TYPES.UPDATE_USER_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { user },
    } = action;
    draftState.isFetching = false;
    draftState.user = user;
  }),
  [ACTION_TYPES.SIGN_IN_ERROR]: handleError,
  [ACTION_TYPES.SIGN_UP_ERROR]: handleError,
  [ACTION_TYPES.LOGOUT_ERROR]: handleError,
  [ACTION_TYPES.GET_AUTH_USER_ERROR]: handleError,
  [ACTION_TYPES.UPDATE_USER_ERROR]: handleError,
};

const authReducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};

export default authReducer;
