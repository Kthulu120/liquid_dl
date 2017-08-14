/**
 * Created by Troy on 7/4/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './store/globalstore'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import './../css/bootstrap.css'
import './../css/styles.css'
import {MuiThemeProvider} from "material-ui";

console.log("BBDS3433333333333BBEEEHAW");

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </HashRouter>
    </Provider>

), document.getElementById('main-container'));