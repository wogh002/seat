import { all, fork, put, delay, takeLatest, call } from "redux-saga/effects";
import {
  SAVE_USER_NAME_REQUEST,
  SAVE_USER_NAME_SUCCESS,
  SAVE_USER_NAME_FAILURE,
} from "../reducers/user";

function* saveUserName(action) {
  try {
    console.log("saveUserName 사가 도착.");
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
// function* addSeatUserInfo(action) {
//   try {
//     console.log("addSeatUserInfo 사가 도착.");
//     yield put({
//       type: ADD_SEAT_INFO_TO_ME_SUCCESS,
//       data: action.data,
//     });
//   } catch (error) {
//     yield put({
//       type: ADD_SEAT_INFO_TO_ME_FAILURE,
//       error: error.response.data,
//     });
//   }
// }

function* watchSaveUser() {
  yield takeLatest(SAVE_USER_NAME_REQUEST, saveUserName);
}
// function* watchSeatUserInfo() {
//   yield takeLatest(ADD_SEAT_INFO_TO_ME_REQUEST, addSeatUserInfo);
// }

export default function* userSaga() {
  yield all([fork(watchSaveUser)]);
}
