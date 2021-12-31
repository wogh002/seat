import { all, fork } from "redux-saga/effects";
import seat from "./seat";
import user from "./user";
export default function* rootSaga() {
  yield all([fork(seat), fork(user)]);
}
