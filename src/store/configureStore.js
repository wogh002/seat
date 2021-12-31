import { compose, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers/index";
import rootSaga from "../sagas/index";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(...middlewares)) //배포용
    : composeWithDevTools(applyMiddleware(...middlewares)); //개발용
const store = createStore(rootReducer, enhancer);
store.sagaTask = sagaMiddleware.run(rootSaga);
export default store;
