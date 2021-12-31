import { all, fork, put, delay, takeLatest, call } from "redux-saga/effects";
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
import { ADD_SEAT_INFO_TO_ME_REQUEST } from "../reducers/user";
// import axios from "../service/axios";

// const loadAllSeatsAPI = () => {
//   return axios.get("/api/v1/seat");
// };
// const loadSpecificSeatInfoAPI = (data) => {
//   return axios.get(`/api/v1/seat/${data.id}`);
// };
// const useSpecificSeatInfoAPI = (data) => {
//   return axios.patch(`/api/v1/seat/${data.id}`, {
//     user_id: data.user_id,
//     start_time: data.start_time,
//     end_time: data.end_time,
//   });
// };
// const reservationSeatAPI = (data) => {
//   return axios.post(`/api/v1/seat-reservation/`, data);
// };
// const reservationCancelSeatAPI = (data) => {
//   return axios.delete(`/api/v1/seat-reservation/${data}`);
// };

// const curSeatSwitchAPI = (data) => {
//   // 현재 좌석 id
//   console.log(data);
//   return axios.patch(`/api/v1/seat/${data}/move`, {
//     moving_seat_id: 12,
//   });
// };

function* loadAllSeats() {
  try {
    console.log("loadAllSeats 사가 도착.");
    // yield call(loadAllSeatsAPI, action.data);
    // const result = yield call(loadAllSeatsAPI);
    // ------------------------------------------
    // yield put({
    //   type: ADD_SEAT_INFO_TO_ME_REQUEST,
    //   // data:result.data.result
    //   data: [
    //     {
    //       id: 3,
    //       seatStatus: "대기",
    //       user: null,
    //       startTime: null,
    //       endTime: null,
    //       reservation: null,
    //     },
    //     {
    //       id: 4,
    //       seatStatus: "사용",
    //       user: {
    //         id: 1,
    //         name: "철수",
    //       },
    //       startTime: "20211228 10:00",
    //       endTime: "20211228 12:00",
    //       reservation: null,
    //     },
    //     {
    //       id: 5,
    //       seatStatus: "예약",
    //       user: null,
    //       startTime: null,
    //       endTime: null,
    //       reservation: {
    //         // seat_id or id 임
    //         seat_id: 72,
    //         user: {
    //           id: 2,
    //           name: "영희",
    //         },
    //         startTime: "20211228 15:00",
    //         endTime: "20211228 16:00",
    //       },
    //     },
    //     {
    //       id: 6,
    //       seatStatus: "대기",
    //       user: null,
    //       startTime: null,
    //       endTime: null,
    //       reservation: null,
    //     },
    //     {
    //       id: 7,
    //       seatStatus: "대기",
    //       user: null,
    //       startTime: null,
    //       endTime: null,
    //       reservation: null,
    //     },
    //     {
    //       id: 8,
    //       seatStatus: "대기",
    //       user: null,
    //       startTime: null,
    //       endTime: null,
    //       reservation: null,
    //     },
    //   ],
    // });
    yield put({
      type: LOAD_ALL_SEATS_SUCCESS,
      // data: result.data,
      data: {
        status: 1001,
        message: "loadAllSeats서버통신성공",
        result: [
          {
            id: 3,
            seatStatus: "대기",
            user: null,
            startTime: null,
            endTime: null,
            reservation: null,
          },
          {
            id: 4,
            seatStatus: "사용",
            user: {
              id: 1,
              name: "철수",
            },
            startTime: "20211228 10:00",
            endTime: "20211228 12:00",
            reservation: null,
          },
          {
            id: 5,
            seatStatus: "예약",
            user: null,
            startTime: null,
            endTime: null,
            reservation: {
              // seat_id or id 임
              seat_id: 72,
              user: {
                id: 2,
                name: "영희",
              },
              startTime: "20211228 15:00",
              endTime: "20211228 16:00",
            },
          },
          {
            id: 6,
            seatStatus: "대기",
            user: null,
            startTime: null,
            endTime: null,
            reservation: null,
          },
          {
            id: 7,
            seatStatus: "대기",
            user: null,
            startTime: null,
            endTime: null,
            reservation: null,
          },
          {
            id: 8,
            seatStatus: "대기",
            user: null,
            startTime: null,
            endTime: null,
            reservation: null,
          },
        ],
      },
    });
  } catch (error) {
    console.log(error.response.data);
    yield put({
      type: LOAD_ALL_SEATS_FAILURE,
      error: error.response.data,
    });
  }
}
// function* loadSpecificSeatInfo(action) {
//   try {
//     console.log("loadSpecificSeatInfo 사가 도착.");
//     // const result = yield call(loadSpecificSeatInfoAPI, action.data);
//     yield put({
//       type: LOAD_SPECIFIC_SEAT_INFO_SUCCESS,
//       data: result.data.result,
//     });
//   } catch (error) {
//     console.log(error.response.data);
//     yield put({
//       type: LOAD_SPECIFIC_SEAT_INFO_FAILURE,
//       error: error.response.data,
//     });
//   }
// }
// function* useSpecificSeatInfo(action) {
//   try {
//     console.log("useSpecificSeatInfo 사가 도착.");
//     // const result = yield call(useSpecificSeatInfoAPI, action.data);
//     // console.log(result.data);
//     yield put({
//       type: USE_SPECIFIC_SEAT_SUCCESS,
//       data: result.data,
//     });
//   } catch (error) {
//     console.log(error.response.data);
//     yield put({
//       type: USE_SPECIFIC_SEAT_FAILURE,
//       error: error.response.data,
//     });
//   }
// }
// function* reservationSeat(action) {
//   try {
//     console.log("reservationSeat 사가 도착.");
//     // const result = yield call(reservationSeatAPI, action.data);
//     // console.log(result);
//     yield put({
//       type: RESERVATION_SPECIFIC_SEAT_SUCCESS,
//       data: result,
//     });
//   } catch (error) {
//     console.log(error.response.data);
//     yield put({
//       type: RESERVATION_SPECIFIC_SEAT_FAILURE,
//       error: error.response.data,
//     });
//   }
// }
// function* reservationCancelSeat(action) {
//   try {
//     console.log("reservationCancelSeat 사가 도착.");
//     // const result = yield call(reservationCancelSeatAPI, action.data);
//     // console.log(result.data);
//     yield put({
//       type: RESERVATION_CANCEL_SEAT_SUCCESS,
//       data: result.data,
//     });
//   } catch (error) {
//     console.log(error.response.data);
//     yield put({
//       type: RESERVATION_CANCEL_SEAT_FAILURE,
//       error: error.response.data,
//     });
//   }
// }
// function* curSeatSwitch(action) {
//   try {
//     console.log("curSeatSwitch 사가 도착.");
//     // const result = yield call(curSeatSwitchAPI, action.data);
//     // console.log(result);
//     yield put({
//       type: CUR_SEAT_SWITCH_SUCCESS,
//       data: result.data,
//     });
//   } catch (error) {
//     console.log(error.response.data);
//     yield put({
//       type: CUR_SEAT_SWITCH_FAILURE,
//       error: error.response.data,
//     });
//   }
// }
function* watchLoadSeats() {
  yield takeLatest(LOAD_ALL_SEATS_REQUEST, loadAllSeats);
}
// function* watchLoadSpecificSeat() {
//   yield takeLatest(LOAD_SPECIFIC_SEAT_INFO_REQUEST, loadSpecificSeatInfo);
// }
// function* watchUseSpecificSeat() {
//   yield takeLatest(USE_SPECIFIC_SEAT_REQUEST, useSpecificSeatInfo);
// }
// function* watchReservationSeat() {
//   yield takeLatest(RESERVATION_SPECIFIC_SEAT_REQUEST, reservationSeat);
// }
// function* watchCancelReservationSeat() {
//   yield takeLatest(RESERVATION_CANCEL_SEAT_REQUEST, reservationCancelSeat);
// }
// function* watchCurSeatSwitch() {
//   yield takeLatest(CUR_SEAT_SWITCH_REQUEST, curSeatSwitch);
// }
export default function* userSaga() {
  yield all([
    fork(watchLoadSeats),
    // fork(watchLoadSpecificSeat),
    // fork(watchUseSpecificSeat),
    // fork(watchReservationSeat),
    // fork(watchCancelReservationSeat),
    // fork(watchCurSeatSwitch),
  ]);
}
