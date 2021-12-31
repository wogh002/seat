export const SAVE_USER_NAME_REQUEST = "SAVE_USER_NAME_REQUEST";
export const SAVE_USER_NAME_SUCCESS = "SAVE_USER_NAME_SUCCESS";
export const SAVE_USER_NAME_FAILURE = "SAVE_USER_NAME_FAILURE";
// ADD_SEAT_INFO_TO_ME_REQUEST 좌석 saga 에서만 사용 1회성
// export const ADD_SEAT_INFO_TO_ME_REQUEST = "ADD_SEAT_INFO_TO_ME_REQUEST";
// export const ADD_SEAT_INFO_TO_ME_SUCCESS = "ADD_SEAT_INFO_TO_ME_SUCCESS";
// export const ADD_SEAT_INFO_TO_ME_FAILURE = "ADD_SEAT_INFO_TO_ME_FAILURE";

const initalState = {
  me: null,
  user_1: null, //철수
  user_2: null, //영희
  user_3: null, // 바둑이
  userInfo: [],
  userInfoDone: false,
  userInfoError: false,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case SAVE_USER_NAME_REQUEST:
      return {
        ...state,
      };
    case SAVE_USER_NAME_SUCCESS:
      return {
        ...state,
        me: action.data,
        user_1: action.data === "철수" ? 1 : "",
        user_2: action.data === "영희" ? 2 : "",
        user_3: action.data === "바둑이" ? 3 : "",
      };
    case SAVE_USER_NAME_FAILURE:
      return {
        ...state,
      };
    // case ADD_SEAT_INFO_TO_ME_REQUEST:
    //   return {
    //     ...state,
    //     userInfoDone: false,
    //     userInfoError: false,
    //   };
    // case ADD_SEAT_INFO_TO_ME_SUCCESS:
    //   return {
    //     ...state,
    //     userInfo: action.data.filter((item) => item.seatStatus === "사용"),
    //     userInfoDone: true,
    //   };
    // case ADD_SEAT_INFO_TO_ME_FAILURE:
    //   return {
    //     ...state,
    //     userInfoError: action.error,
    //   };
    default:
      return state;
  }
};
export default reducer;
