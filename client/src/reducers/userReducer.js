import produce from "immer";
import ACTION_TYPES from "../actions/type";

const initialState = {
  users: [],
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
  [ACTION_TYPES.CREATE_USER_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_USERS_REQUEST]: handleRequests,
  [ACTION_TYPES.CREATE_USER_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { user },
    } = action;
    draftState.isFetching = false;
    draftState.users.push(user);
  }),
  [ACTION_TYPES.GET_USERS_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { users },
    } = action;
    draftState.isFetching = false;
    draftState.users.push(...users);
  }),
  [ACTION_TYPES.CREATE_USER_ERROR]: handleError,
  [ACTION_TYPES.GET_USERS_ERROR]: handleError,
};

const userReducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};

export default userReducer;
