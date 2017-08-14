import React from 'react';
import {createStore, applyMiddleware} from 'redux'
import todoApp from '../reducers/index'
import {logger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import promiseMiddleware from 'redux-promise-middleware';


const middleware = applyMiddleware(promise(), promiseMiddleware(), thunk, logger);
const store = createStore(todoApp, middleware);


export default store;