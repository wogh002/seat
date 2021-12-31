export const LOAD_ALL_SEATS_REQUEST = "LOAD_ALL_SEATS_REQUEST";
export const LOAD_ALL_SEATS_SUCCESS = "LOAD_ALL_SEATS_SUCCESS";
export const LOAD_ALL_SEATS_FAILURE = "LOAD_ALL_SEATS_FAILURE";
export const LOAD_SPECIFIC_SEAT_INFO_REQUEST =
  "LOAD_SPECIFIC_SEAT_INFO_REQUEST";
export const LOAD_SPECIFIC_SEAT_INFO_SUCCESS =
  "LOAD_SPECIFIC_SEAT_INFO_SUCCESS";
export const LOAD_SPECIFIC_SEAT_INFO_FAILURE =
  "LOAD_SPECIFIC_SEAT_INFO_FAILURE";
export const USE_SPECIFIC_SEAT_REQUEST = "USE_SPECIFIC_SEAT_REQUEST";
export const USE_SPECIFIC_SEAT_SUCCESS = "USE_SPECIFIC_SEAT_SUCCESS";
export const USE_SPECIFIC_SEAT_FAILURE = "USE_SPECIFIC_SEAT_FAILURE";
export const RESERVATION_SPECIFIC_SEAT_REQUEST =
  "RESERVATION_SPECIFIC_SEAT_REQUEST";
export const RESERVATION_SPECIFIC_SEAT_SUCCESS =
  "RESERVATION_SPECIFIC_SEAT_SUCCESS";
export const RESERVATION_SPECIFIC_SEAT_FAILURE =
  "RESERVATION_SPECIFIC_SEAT_FAILURE";

export const RESERVATION_CANCEL_SEAT_REQUEST =
  "RESERVATION_CANCEL_SEAT_REQUEST";
export const RESERVATION_CANCEL_SEAT_SUCCESS =
  "RESERVATION_CANCEL_SEAT_SUCCESS";
export const RESERVATION_CANCEL_SEAT_FAILURE =
  "RESERVATION_CANCEL_SEAT_FAILURE";
export const CUR_SEAT_SWITCH_REQUEST = "CUR_SEAT_SWITCH_REQUEST";
export const CUR_SEAT_SWITCH_SUCCESS = "CUR_SEAT_SWITCH_SUCCESS";
export const CUR_SEAT_SWITCH_FAILURE = "CUR_SEAT_SWITCH_FAILURE";

const initalState = {
  seatInfos: [],
  standbySeats: [],
  useSeats: [],
  standbyReservationSeats: [],
  loadAllUserDone: false, //서버와의 통신 성공했을 경우 데이터
  loadAllUserError: false, //서버와의 통신 실패했을 경우 메세지.

  specificSeatInfo: null,
  specificSeatInfoDone: false,
  specificSeatInfoError: false,

  useSpecificSeatInfo: null,
  useSpecificSeatInfoMessage: null,
  useSpecificSeatInfoDone: false,
  useSpecificSeatInfoError: false,

  reservationSeat: null,
  reservationMessage: null,
  reservationSeatDone: false,
  reservationSeatError: false,

  reservationSeatCancelInfo: null,
  reservationSeatCancelDone: false,
  reservationSeatCancelError: false,
  reservationSeatCancelMessage: null,

  curSeatSwitchDone: false,
  curSeatSwitchError: false,
  curSeatSwitchMessage: null,
};
const reducer = (state = initalState, action) => {
  switch (action.type) {
    case LOAD_ALL_SEATS_REQUEST:
      return {
        ...state,
        loadAllUserDone: false,
        loadAllUserError: false,
      };
    case LOAD_ALL_SEATS_SUCCESS:
      return {
        ...state,
        seatInfos: action.data.result,
        loadAllUserDone: true,
      };
    case LOAD_ALL_SEATS_FAILURE:
      return {
        ...state,
        loadAllUserError: action.error,
      };
    case LOAD_SPECIFIC_SEAT_INFO_REQUEST:
      return {
        ...state,
        specificSeatInfoDone: false,
        specificSeatInfoError: false,
      };
    case LOAD_SPECIFIC_SEAT_INFO_SUCCESS:
      return {
        ...state,
        specificSeatInfo: {
          ...action.data,
        },
        specificSeatInfoDone: true,
      };
    case LOAD_SPECIFIC_SEAT_INFO_FAILURE:
      return {
        ...state,
        specificSeatInfoError: action.error,
      };
    case USE_SPECIFIC_SEAT_REQUEST:
      return {
        ...state,
        useSpecificSeatInfoDone: false,
        useSpecificSeatInfoError: false,
        useSpecificSeatInfoMessage: null,
      };
    case USE_SPECIFIC_SEAT_SUCCESS:
      return {
        ...state,
        seatInfos: [
          action.data.result,
          ...state.seatInfos.filter(
            (item) => item.id !== action.data.result.id
          ),
        ],
        useSpecificSeatInfo: action.data.result,
        useSpecificSeatInfoMessage: action.data.message,
        useSpecificSeatInfoDone: true,
      };
    case USE_SPECIFIC_SEAT_FAILURE:
      return {
        ...state,
        useSpecificSeatInfoError: action.error,
      };
    case RESERVATION_SPECIFIC_SEAT_REQUEST:
      return {
        ...state,
        reservationSeatDone: false,
        reservationSeatError: false,
      };
    case RESERVATION_SPECIFIC_SEAT_SUCCESS:
      return {
        // 구체적인 좌석 예약 성공 시 불변성 추가 해야됌.
        ...state,
        reservationSeatDone: true,
        seatInfos: [
          ...state.seatInfos.filter(
            (item) => item.reservation.id !== action.date.result.seatId
          ),
          action.data.result,
        ],
        // seatInfos: [...state.seatInfos, action.data.result],
        reservationSeat: action.data.result,
        reservationMessage: action.data.message,
      };
    case RESERVATION_SPECIFIC_SEAT_FAILURE:
      return {
        ...state,
        reservationSeatError: action.error,
      };
    case RESERVATION_CANCEL_SEAT_REQUEST:
      return {
        ...state,
        reservationSeatCancelDone: false,
        reservationSeatCancelError: false,
      };
    case RESERVATION_CANCEL_SEAT_SUCCESS:
      return {
        // 불변성 추가. 생각
        ...state,
        seatInfos: state.seatInfos.filter(
          (item) => item.id !== action.data.result
        ),
        reservationSeatCancelMessage: action.data.message,
        reservationSeatCancelDone: true,
      };
    case RESERVATION_CANCEL_SEAT_FAILURE:
      return {
        ...state,
        reservationSeatCancelError: action.error,
      };
    case CUR_SEAT_SWITCH_REQUEST:
      return {
        ...state,
        curSeatSwitchDone: false,
        curSeatSwitchError: false,
      };
    case CUR_SEAT_SWITCH_SUCCESS:
      return {
        ...state,
        seatInfos: [...state.seatInfos, action.data.result],
        curSeatSwitchDone: true,
      };
    case CUR_SEAT_SWITCH_FAILURE:
      return {
        ...state,
        curSeatSwitchError: action.error,
      };

    default:
      return state;
  }
};
export default reducer;
