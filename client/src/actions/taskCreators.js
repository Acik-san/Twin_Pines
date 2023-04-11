import ACTION_TYPES from "./type";

export const createTaskRequest = (id, values) => ({
  type: ACTION_TYPES.CREATE_TASK_REQUEST,
  payload: { id, values },
});
export const createTaskSuccess = (task) => ({
  type: ACTION_TYPES.CREATE_TASK_SUCCESS,
  payload: { task },
});
export const createTaskError = (error) => ({
  type: ACTION_TYPES.CREATE_TASK_ERROR,
  payload: { error },
});
//------------------------------------------
//------------------------------------------
export const getTasksRequest = (id) => ({
  type: ACTION_TYPES.GET_TASKS_REQUEST,
  payload: { id },
});
export const getTasksSuccess = (tasks) => ({
  type: ACTION_TYPES.GET_TASKS_SUCCESS,
  payload: { tasks },
});
export const getTasksError = (error) => ({
  type: ACTION_TYPES.GET_TASKS_ERROR,
  payload: { error },
});
//------------------------------------------
//------------------------------------------
export const getTaskRequest = (userId, taskId) => ({
  type: ACTION_TYPES.GET_TASK_REQUEST,
  payload: { userId, taskId },
});
export const getTaskSuccess = (task) => ({
  type: ACTION_TYPES.GET_TASK_SUCCESS,
  payload: { task },
});
export const getTaskError = (error) => ({
  type: ACTION_TYPES.GET_TASK_ERROR,
  payload: { error },
});
//------------------------------------------
//------------------------------------------
export const updateTaskRequest = (userId, taskId, values) => ({
  type: ACTION_TYPES.UPDATE_TASK_REQUEST,
  payload: { userId, taskId, values },
});
export const updateTaskSuccess = (task) => ({
  type: ACTION_TYPES.UPDATE_TASK_SUCCESS,
  payload: { task },
});
export const updateTaskError = (error) => ({
  type: ACTION_TYPES.UPDATE_TASK_ERROR,
  payload: { error },
});
//------------------------------------------
//------------------------------------------
export const deleteTaskRequest = (userId, taskId) => ({
  type: ACTION_TYPES.DELETE_TASK_REQUEST,
  payload: { userId, taskId },
});
export const deleteTaskSuccess = (task) => ({
  type: ACTION_TYPES.DELETE_TASK_SUCCESS,
  payload: { task },
});
export const deleteTaskError = (error) => ({
  type: ACTION_TYPES.DELETE_TASK_ERROR,
  payload: { error },
});

//------------------------------------------
export const cleanTasks = () => ({
  type: ACTION_TYPES.CLEAN_TASKS,
  payload: {},
});

