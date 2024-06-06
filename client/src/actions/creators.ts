import { CleanErrorAction, CleanUserErrorAction } from '../types/actionTypes';
import ACTION_TYPES from './type';

export const cleanError = (): CleanErrorAction => ({
  type: ACTION_TYPES.CLEAN_ERROR,
  payload: {},
});

export const cleanUserError = (): CleanUserErrorAction => ({
  type: ACTION_TYPES.CLEAN_USER_ERROR,
  payload: {},
});
