import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import store from "./store/globalstore";
import {HashRouter} from "react-router-dom";
import "./../css/bootstrap.css";
import "./../css/styles.css";

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
                <App />
        </HashRouter>
    </Provider>

), document.getElementById('main-container'));