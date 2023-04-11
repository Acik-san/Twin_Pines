import produce from "immer";
import ACTION_TYPES from "../actions/type";

const initialState = {
  isFetching: false,
  error: null,
  tasks: [],
  selectedTask: {},
  sumTasks: 0,
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
  [ACTION_TYPES.CREATE_TASK_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_TASKS_REQUEST]: handleRequests,
  [ACTION_TYPES.GET_TASK_REQUEST]: handleRequests,
  [ACTION_TYPES.UPDATE_TASK_REQUEST]: handleRequests,
  [ACTION_TYPES.DELETE_TASK_REQUEST]: handleRequests,
  [ACTION_TYPES.CREATE_TASK_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { task },
    } = action;
    draftState.isFetching = false;
    draftState.tasks.push(task);
  }),
  [ACTION_TYPES.GET_TASKS_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { tasks },
    } = action;
    draftState.isFetching = false;
    draftState.tasks.push(...tasks);
  }),
  [ACTION_TYPES.GET_TASK_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { task },
    } = action;
    draftState.isFetching = false;
    draftState.selectedTask = task;
  }),
  [ACTION_TYPES.UPDATE_TASK_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { task },
    } = action;
    draftState.isFetching = false;
    draftState.selectedTask = task;
  }),
  [ACTION_TYPES.DELETE_TASK_SUCCESS]: produce((draftState, action) => {
    const {
      payload: { task },
    } = action;
    draftState.isFetching = false;
    draftState.tasks = draftState.tasks.filter(
      (t) => Number(t.id) !== Number(task.id)
    );
  }),
  [ACTION_TYPES.CREATE_TASK_ERROR]: handleError,
  [ACTION_TYPES.GET_TASKS_ERROR]: handleError,
  [ACTION_TYPES.GET_TASK_ERROR]: handleError,
  [ACTION_TYPES.UPDATE_TASK_ERROR]: handleError,
  [ACTION_TYPES.DELETE_TASK_ERROR]: handleError,
  [ACTION_TYPES.CLEAN_TASKS]: produce((draftState, action) => {
    draftState.tasks = [];
  }),
  [ACTION_TYPES.CLEAN_ERROR]: produce((draftState, action) => {
    draftState.error = null;
  }),
};

const taskReducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};

export default taskReducer;
