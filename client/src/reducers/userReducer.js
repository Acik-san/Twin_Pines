import produce from "immer";
import ACTION_TYPES from "../actions/type";

const initialState = {
  users: [],
  isFetching: false,
  error: null,
  selectedUser: {},
  sumUsers: 0,
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
  [ACTION_TYPES.GET_USER_REQUEST]: handleRequests,
  [ACTION_TYPES.UPDATE_USER_REQUEST]: handleRequests,
  [ACTION_TYPES.DELETE_USER_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_SUM_USERS_REQUEST]: handleRequests,
  [ACTION_TYPES.CREATE_USER_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { user },
    } = action;
    draftState.isFetching = false;
  }),
  [ACTION_TYPES.GET_USERS_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { users },
    } = action;
    draftState.isFetching = false;
    draftState.users.push(...users);
  }),
  [ACTION_TYPES.GET_USER_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { user },
    } = action;
    draftState.isFetching = false;
    draftState.selectedUser = user;
  }),
  [ACTION_TYPES.UPDATE_USER_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { user },
    } = action;
    draftState.isFetching = false;
    draftState.selectedUser = user;
  }),
  [ACTION_TYPES.DELETE_USER_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { user },
    } = action;
    draftState.isFetching = false;
    draftState.users = draftState.users.filter(
      (u) => Number(u.id) !== Number(user.id)
    );
  }),
  [ACTION_TYPES.GET_SUM_USERS_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { sum },
    } = action;
    draftState.isFetching = false;
    draftState.sumUsers = sum;
  }),
  [ACTION_TYPES.CREATE_USER_ERROR]: handleError,
  [ACTION_TYPES.GET_USERS_ERROR]: handleError,
  [ACTION_TYPES.GET_USER_ERROR]: handleError,
  [ACTION_TYPES.UPDATE_USER_ERROR]: handleError,
  [ACTION_TYPES.DELETE_USER_ERROR]: handleError,
  [ACTION_TYPES.GET_SUM_USERS_ERROR]: handleError,
  [ACTION_TYPES.CLEAN_USERS]: produce((draftState, action) => {
    draftState.users = [];
  }),
  [ACTION_TYPES.CLEAN_ERROR]: produce((draftState, action) => {
    draftState.error = null;
  }),
};

const userReducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};

export default userReducer;
