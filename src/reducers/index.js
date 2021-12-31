import { combineReducers } from "redux";
import seat from "./seat";
import user from "./user";

const rootReducer = combineReducers({
  seat,
  user,
});
export default rootReducer;
