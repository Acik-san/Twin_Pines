import { put } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { IError } from '../types';
import {
  SignInRequestAction,
  SignUpRequestAction,
  RefreshRequestAction,
} from '../types/authActionTypes';
import * as ActionsAuth from '../actions/authCreators';
import * as API from '../api';

export function* signInSaga (action: SignInRequestAction) {
  try {
    const {
      data: {
        data: { user },
      },
    } = yield API.signIn(action.payload.values);
    yield put(ActionsAuth.signInSuccess(user));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsAuth.signInError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* signUpSaga (action: SignUpRequestAction) {
  try {
    const {
      data: {
        data: { user },
      },
    } = yield API.signUp(action.payload.values);
    yield put(ActionsAuth.signUpSuccess(user));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsAuth.signUpError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}

export function* refreshSaga (action: RefreshRequestAction) {
  try {
    const {
      data: {
        data: { user, tokenPair },
      },
    } = yield API.refresh(action.payload.refreshToken);
    yield put(ActionsAuth.refreshSuccess(user, tokenPair));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(
        ActionsAuth.refreshError({
          message: error.response?.data.message,
          status: error.response?.status,
        })
      );
    }
  }
}
