import ACTION_TYPES from "./type";

export const cleanError = () => ({
  type: ACTION_TYPES.CLEAN_ERROR,
  payload: {},
});
