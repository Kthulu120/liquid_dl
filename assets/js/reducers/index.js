import {combineReducers} from 'redux'
import {reducer as notificationsReducer} from 'reapop';
import soundcloud from "./soundcloud";
import imgurscraper from "./imgurscraper";
import ffmpeg from "./ffmpeg";
import global from './global'
import wget from "./wget";
import youtube_dl from "./youtubedl"
import download_manager from "./download_manager";

const todoApp = combineReducers({
    notifications: notificationsReducer(),
    soundcloud: soundcloud,
    ffmpeg: ffmpeg,
    global: global,
    wget: wget,
    youtube_dl: youtube_dl,
    download_manager: download_manager
});

export default todoApp