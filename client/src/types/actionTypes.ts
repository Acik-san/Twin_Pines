import ACTION_TYPES from '../actions/type';

export interface CleanErrorAction {
  type: typeof ACTION_TYPES.CLEAN_ERROR;
  payload: {};
}

export interface CleanUserErrorAction {
  type: typeof ACTION_TYPES.CLEAN_USER_ERROR;
  payload: {};
}
