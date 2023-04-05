const ACTION_TYPES = {
  //auth
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_ERROR: 'SIGN_IN_ERROR',
  //
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_ERROR: 'SIGN_UP_ERROR',
  //
  REFRESH_REQUEST: 'REFRESH_REQUEST',
  REFRESH_SUCCESS: 'REFRESH_SUCCESS',
  REFRESH_ERROR: 'REFRESH_ERROR',
  //
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERROR: 'LOGOUT_ERROR',
  //
  GET_AUTH_USER_REQUEST: 'GET_AUTH_USER_REQUEST',
  GET_AUTH_USER_SUCCESS: 'GET_AUTH_USER_SUCCESS',
  GET_AUTH_USER_ERROR: 'GET_AUTH_USER_ERROR',
  //users
  CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_ERROR: 'CREATE_USER_ERROR',
  //
  GET_USERS_REQUEST: 'GET_USERS_REQUEST',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USERS_ERROR: 'GET_USERS_ERROR',
  //
  // GET_USER_REQUEST: 'GET_USER_REQUEST',
  // GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  // GET_USER_ERROR: 'GET_USER_ERROR',
  //
  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
  //
  DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_ERROR: 'DELETE_USER_ERROR',
  //
  CLEAN_USERS: 'CLEAN_USERS',
  //
  GET_SUM_USERS_REQUEST: 'GET_SUM_USERS_REQUEST',
  GET_SUM_USERS_SUCCESS: 'GET_SUM_USERS_SUCCESS',
  GET_SUM_USERS_ERROR: 'GET_SUM_USERS_ERROR',
  //tasks
  CREATE_TASK_REQUEST: 'CREATE_TASK_REQUEST',
  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
  CREATE_TASK_ERROR: 'CREATE_TASK_ERROR',
  //
  GET_TASKS_REQUEST: 'GET_TASKS_REQUEST',
  GET_TASKS_SUCCESS: 'GET_TASKS_SUCCESS',
  GET_TASKS_ERROR: 'GET_TASKS_ERROR',
  //
  GET_TASK_REQUEST: 'GET_TASK_REQUEST',
  GET_TASK_SUCCESS: 'GET_TASK_SUCCESS',
  GET_TASK_ERROR: 'GET_TASK_ERROR',
  //
  UPDATE_TASK_REQUEST: 'UPDATE_TASK_REQUEST',
  UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',
  UPDATE_TASK_ERROR: 'UPDATE_TASK_ERROR',
  //
  DELETE_TASK_REQUEST: 'DELETE_TASK_REQUEST',
  DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
  DELETE_TASK_ERROR: 'DELETE_TASK_ERROR',
  //
  GET_ALL_TASKS_REQUEST: 'GET_ALL_TASKS_REQUEST',
  GET_ALL_TASKS_SUCCESS: 'GET_ALL_TASKS_SUCCESS',
  GET_ALL_TASKS_ERROR: 'GET_ALL_TASKS_ERROR',
  //
  CLEAN_TASKS: 'CLEAN_TASKS',
  //
  GET_SUM_TASKS_REQUEST: 'GET_SUM_TASKS_REQUEST',
  GET_SUM_TASKS_SUCCESS: 'GET_SUM_TASKS_SUCCESS',
  GET_SUM_TASKS_ERROR: 'GET_SUM_TASKS_ERROR',
  //
  CLEAN_ERROR: 'CLEAN_ERROR',
};

export default ACTION_TYPES;
