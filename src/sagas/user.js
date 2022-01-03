import { all, fork, put, takeLatest } from "redux-saga/effects";
import {
  SAVE_USER_NAME_REQUEST,
  SAVE_USER_NAME_SUCCESS,
  SAVE_USER_NAME_FAILURE,
} from "../reducers/user";

function* saveUserName(action) {
  try {
    yield put({
      type: SAVE_USER_NAME_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: SAVE_USER_NAME_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchSaveUser() {
  yield takeLatest(SAVE_USER_NAME_REQUEST, saveUserName);
}

export default function* userSaga() {
  yield all([fork(watchSaveUser)]);
}
