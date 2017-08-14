import {combineReducers} from 'redux'
import {reducer as notificationsReducer} from 'reapop';
import soundcloud from "./soundcloud";
import imgurscraper from "./imgurscraper";
import ffmpeg from "./ffmpeg";

const todoApp = combineReducers({
    notifications: notificationsReducer(),
    soundcloud: soundcloud,
    imgur: imgurscraper,
    ffmpeg: ffmpeg
});

export default todoApp