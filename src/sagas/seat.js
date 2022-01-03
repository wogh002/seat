import {
  all,
  fork,
  put,
  takeLatest,
  call,
  takeEvery,
} from "redux-saga/effects";
import {
  LOAD_ALL_SEATS_REQUEST,
  LOAD_ALL_SEATS_SUCCESS,
  LOAD_ALL_SEATS_FAILURE,
  LOAD_SPECIFIC_SEAT_INFO_FAILURE,
  LOAD_SPECIFIC_SEAT_INFO_SUCCESS,
  LOAD_SPECIFIC_SEAT_INFO_REQUEST,
  USE_SPECIFIC_SEAT_REQUEST,
  USE_SPECIFIC_SEAT_SUCCESS,
  USE_SPECIFIC_SEAT_FAILURE,
  RESERVATION_SPECIFIC_SEAT_REQUEST,
  RESERVATION_SPECIFIC_SEAT_SUCCESS,
  RESERVATION_SPECIFIC_SEAT_FAILURE,
  RESERVATION_CANCEL_SEAT_REQUEST,
  RESERVATION_CANCEL_SEAT_SUCCESS,
  RESERVATION_CANCEL_SEAT_FAILURE,
  CUR_SEAT_SWITCH_REQUEST,
  CUR_SEAT_SWITCH_SUCCESS,
  CUR_SEAT_SWITCH_FAILURE,
} from "../reducers/seat";
import axios from "../service/axios";
const loadAllSeatsAPI = () => {
  return axios.get("/api/v1/seat");
};
const loadSpecificSeatInfoAPI = (data) => {
  return axios.get(`/api/v1/seat/${data.id}`);
};
const useSpecificSeatInfoAPI = (data) => {
  return axios.patch(`/api/v1/seat/${data.id}`, {
    user_id: data.user_id,
    start_time: data.start_time,
    end_time: data.end_time,
  });
};
const reservationSeatAPI = (data) => {
  return axios.post(`/api/v1/seat-reservation/`, data);
};
const reservationCancelSeatAPI = (data) => {
  return axios.delete(`/api/v1/seat-reservation/${data}`);
};

const curSeatSwitchAPI = (data) => {
  return axios.patch(`/api/v1/seat/${data.curSeatId}/move`, {
    moving_seat_id: data.moving_seat_id,
  });
};
// 모든 좌석 요청
function* loadAllSeats() {
  try {
    const result = yield call(loadAllSeatsAPI);
    yield put({
      type: LOAD_ALL_SEATS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_ALL_SEATS_FAILURE,
      error: error.response.data,
    });
  }
}
// 특정 좌석 선택
function* loadSpecificSeatInfo(action) {
  try {
    const result = yield call(loadSpecificSeatInfoAPI, action.data);
    yield put({
      type: LOAD_SPECIFIC_SEAT_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_SPECIFIC_SEAT_INFO_FAILURE,
      error: error.response.data,
    });
  }
}
// 좌석사용
function* useSpecificSeatInfo(action) {
  try {
    const result = yield call(useSpecificSeatInfoAPI, action.data);
    // action.data.message
    yield put({
      type: USE_SPECIFIC_SEAT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: USE_SPECIFIC_SEAT_FAILURE,
      error: error.response.data,
    });
  }
}
//좌석예약
function* reservationSeat(action) {
  try {
    const result = yield call(reservationSeatAPI, action.data);
    yield put({
      type: RESERVATION_SPECIFIC_SEAT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: RESERVATION_SPECIFIC_SEAT_FAILURE,
      error: error.response.data,
    });
  }
}
// 예약좌석 취소
function* reservationCancelSeat(action) {
  try {
    const result = yield call(reservationCancelSeatAPI, action.data);
    yield put({
      type: RESERVATION_CANCEL_SEAT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: RESERVATION_CANCEL_SEAT_FAILURE,
      error: error.response.data,
    });
  }
}
// 좌석이동
function* curSeatSwitch(action) {
  try {
    const result = yield call(curSeatSwitchAPI, action.data);
    yield put({
      type: CUR_SEAT_SWITCH_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CUR_SEAT_SWITCH_FAILURE,
      error: error.response.data,
    });
  }
}
function* watchLoadSeats() {
  yield takeLatest(LOAD_ALL_SEATS_REQUEST, loadAllSeats);
}
function* watchLoadSpecificSeat() {
  yield takeLatest(LOAD_SPECIFIC_SEAT_INFO_REQUEST, loadSpecificSeatInfo);
}
function* watchUseSpecificSeat() {
  // effect takeEvery 모든 요청 실행하기 위해,
  yield takeEvery(USE_SPECIFIC_SEAT_REQUEST, useSpecificSeatInfo);
}
function* watchReservationSeat() {
  yield takeLatest(RESERVATION_SPECIFIC_SEAT_REQUEST, reservationSeat);
}
function* watchCancelReservationSeat() {
  yield takeLatest(RESERVATION_CANCEL_SEAT_REQUEST, reservationCancelSeat);
}
function* watchCurSeatSwitch() {
  yield takeLatest(CUR_SEAT_SWITCH_REQUEST, curSeatSwitch);
}
export default function* userSaga() {
  yield all([
    fork(watchLoadSeats),
    fork(watchLoadSpecificSeat),
    fork(watchUseSpecificSeat),
    fork(watchReservationSeat),
    fork(watchCancelReservationSeat),
    fork(watchCurSeatSwitch),
  ]);
}
