export const SAVE_USER_NAME_REQUEST = "SAVE_USER_NAME_REQUEST";
export const SAVE_USER_NAME_SUCCESS = "SAVE_USER_NAME_SUCCESS";
export const SAVE_USER_NAME_FAILURE = "SAVE_USER_NAME_FAILURE";
const initalState = {
  me: null,
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
      };
    case SAVE_USER_NAME_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default reducer;
