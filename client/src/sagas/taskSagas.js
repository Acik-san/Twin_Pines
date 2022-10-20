import { put } from "redux-saga/effects";
import * as ActionsTask from "../actions/taskCreators";
import * as API from "../api";

export function* createTaskSaga(action) {
  try {
    const {
      data: { data: task },
    } = yield API.createTask(action.payload);
    yield put(ActionsTask.createTaskSuccess(task));
  } catch (error) {
    yield put(ActionsTask.createTaskError(error));
  }
}
export function* getTasksSaga(action) {
  try {
    const {
      data: { data: tasks },
    } = yield API.getUserTasks(action.payload.id);
    yield put(ActionsTask.getTasksSuccess(tasks));
  } catch (error) {
    yield put(ActionsTask.getTasksError(error));
  }
}
export function* getTaskSaga(action) {
  try {
    const {
      data: { data: task },
    } = yield API.getUserTask(action.payload);
    yield put(ActionsTask.getTaskSuccess(task));
  } catch (error) {
    yield put(ActionsTask.getTaskError(error));
  }
}
export function* updateTaskSaga(action) {
  try {
    const {
      data: { data: task },
    } = yield API.updateTask(action.payload);
    yield put(ActionsTask.updateTaskSuccess(task));
  } catch (error) {
    yield put(ActionsTask.updateTaskError(error));
  }
}
export function* deleteTaskSaga(action) {
  try {
    const {
      data: { data: task },
    } = yield API.deleteTask(action.payload);
    yield put(ActionsTask.deleteTaskSuccess(task));
  } catch (error) {
    yield put(ActionsTask.deleteTaskError(error));
  }
}
export function* getAllTasksSaga(action) {
  try {
    const {
      data: { data: tasks },
    } = yield API.getAllTasks(action.payload);
    yield put(ActionsTask.getAllTasksSuccess(tasks));
  } catch (error) {
    yield put(ActionsTask.getAllTasksError(error));
  }
}
export function* getSumTasksSaga(action) {
  try {
    const {
      data: { data: sumTasks },
    } = yield API.getSumTasks(action);
    yield put(ActionsTask.getSumTasksSuccess(sumTasks));
  } catch (error) {
    yield put(ActionsTask.getSumTasksError(error));
  }
}
