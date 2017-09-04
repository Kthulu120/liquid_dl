import {combineReducers} from 'redux'
import {reducer as notificationsReducer} from 'reapop';
import soundcloud from "./soundcloud";
import imgurscraper from "./imgurscraper";
import ffmpeg from "./ffmpeg";
import global from './global'
import wget from "./wget";

const todoApp = combineReducers({
    notifications: notificationsReducer(),
    soundcloud: soundcloud,
    imgur: imgurscraper,
    ffmpeg: ffmpeg,
    global: global,
    wget: wget
});

export default todoApp