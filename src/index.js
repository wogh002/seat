import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Direction from "./direction";
import { Provider } from "react-redux";
import store from "./store/configureStore";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Direction>
        <App />
      </Direction>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
