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
  loadAllUserDone: false,
  loadAllUserError: false,

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
    // 모든 좌석 정보 요청
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
    // 특정 좌석 정보 요청
    case LOAD_SPECIFIC_SEAT_INFO_REQUEST:
      return {
        ...state,
        specificSeatInfoDone: false,
        specificSeatInfoError: false,
      };
    case LOAD_SPECIFIC_SEAT_INFO_SUCCESS:
      return {
        ...state,
        specificSeatInfo: action.data.result,
        specificSeatInfoDone: true,
      };
    case LOAD_SPECIFIC_SEAT_INFO_FAILURE:
      return {
        ...state,
        specificSeatInfoError: action.error,
      };
    // 좌석 사용 요청
    case USE_SPECIFIC_SEAT_REQUEST:
      return {
        ...state,
        useSpecificSeatInfoDone: false,
        useSpecificSeatInfoError: false,
        useSpecificSeatInfoMessage: null,
      };
    case USE_SPECIFIC_SEAT_SUCCESS:
      // find API
      const seatIndex = state.seatInfos.findIndex(
        (item) => item.id === action.data.result.id
      );
      const seat = { ...action.data.result };
      const seatInfos = [...state.seatInfos];
      seatInfos[seatIndex] = seat;
      return {
        ...state,
        seatInfos,
        useSpecificSeatInfoMessage: action.data,
        useSpecificSeatInfoDone: true,
      };
    case USE_SPECIFIC_SEAT_FAILURE:
      return {
        ...state,
        useSpecificSeatInfoError: action.error,
      };
    // 좌석 예약 요청
    case RESERVATION_SPECIFIC_SEAT_REQUEST:
      return {
        ...state,
        reservationSeatDone: false,
        reservationSeatError: false,
      };
    case RESERVATION_SPECIFIC_SEAT_SUCCESS:
      const reservationSeatIndex = state.seatInfos.findIndex(
        (item) => item.id === action.data.result.id
      );
      const reservationSeat = { ...action.data.result };
      const reservationSeatInfos = [...state.seatInfos];
      reservationSeatInfos[reservationSeatIndex] = reservationSeat;
      return {
        ...state,
        reservationSeatDone: true,
        seatInfos: reservationSeatInfos,
        reservationMessage: action.data,
      };
    case RESERVATION_SPECIFIC_SEAT_FAILURE:
      return {
        ...state,
        reservationSeatError: action.error,
      };
    // 예약 좌석 취소 요청
    case RESERVATION_CANCEL_SEAT_REQUEST:
      return {
        ...state,
        reservationSeatCancelDone: false,
        reservationSeatCancelError: false,
      };
    case RESERVATION_CANCEL_SEAT_SUCCESS:
      const cancelSeatIndex = state.seatInfos.findIndex((item) => {
        return item.id === action.data.result.id;
      });
      const cancelSeat = {
        id: action.data.result.id,
        seatStatus: "대기",
        user: null,
        startTime: null,
        endTime: null,
        reservation: null,
      };
      const cancelSeatInfos = [...state.seatInfos];
      cancelSeatInfos[cancelSeatIndex] = cancelSeat;
      return {
        ...state,
        seatInfos: cancelSeatInfos,
        reservationSeatCancelMessage: action.data,
        reservationSeatCancelDone: true,
      };
    case RESERVATION_CANCEL_SEAT_FAILURE:
      return {
        ...state,
        reservationSeatCancelError: action.error,
      };
    // 좌석 이동
    case CUR_SEAT_SWITCH_REQUEST:
      return {
        ...state,
        curSeatSwitchDone: false,
        curSeatSwitchError: false,
      };
    case CUR_SEAT_SWITCH_SUCCESS:
      const seatChangePrevIndex = state.seatInfos.findIndex(
        (item) => item.id === action.data.result.prevSeatId
      );
      const seatChangePrevInfo = {
        id: action.data.result.prevSeatId,
        seatStatus: "대기",
        user: null,
        startTime: null,
        endTime: null,
        reservation: null,
      };
      const seatChangeIndex = state.seatInfos.findIndex(
        (item) => item.id === action.data.result.id
      );
      const seatChangeInfo = { ...action.data.result };
      const seatChangeInfos = [...state.seatInfos];
      seatChangeInfos[seatChangePrevIndex] = seatChangePrevInfo;
      seatChangeInfos[seatChangeIndex] = seatChangeInfo;
      return {
        ...state,
        seatInfos: seatChangeInfos,
        curSeatSwitchMessage: action.data,
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
