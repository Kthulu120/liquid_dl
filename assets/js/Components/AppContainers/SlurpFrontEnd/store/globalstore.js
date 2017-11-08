import React from 'react';
import {createStore, applyMiddleware} from 'redux'
import {logger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import promiseMiddleware from 'redux-promise-middleware';
import slurpApp from "./index_reducer"

const middleware = applyMiddleware(promise(), promiseMiddleware(), thunk, logger);
const slurp_store = createStore(slurpApp, middleware);


export default slurp_store;