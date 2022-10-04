import produce from "immer";
import ACTION_TYPES from "../actions/type";

const initialState = {
  users: [],
  isFetching: false,
  error: null,
};

const handlers = {
  [ACTION_TYPES.CREATE_USER_REQUEST]: produce((draftState, action) => {
    draftState.isFetching = true;
  }),
  [ACTION_TYPES.CREATE_USER_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { user },
    } = action;
    draftState.isFetching = false;
    draftState.users.push(user);
  }),
  [ACTION_TYPES.CREATE_USER_ERROR]: produce((draftState, action) => {
    const {
      payload: { error },
    } = action;
    draftState.isFetching = false;
    draftState.error = error;
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
