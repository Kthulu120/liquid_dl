import React from "react";
import {Switch} from "react-router-dom";
import Home from "./Home";
import {Route} from "react-router";
import Soundcloud from "./Apps/Soundcloud";
import FFMPEG from "./Apps/FFMPEG";
import theme from "reapop-theme-wybo";
import NotificationsSystem from "reapop";
import Wget from "./Apps/Wget";
import YoutubeDL from "./Apps/YoutubeDL";

const Main = () => (

    <div className="col-md-9 col-sm-12">
        <div className="container main-content">
            <NotificationsSystem theme={theme}/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/soundcloud' component={Soundcloud}/>
                <Route path='/wget' component={Wget}/>
                <Route path="/ffmpeg" component={FFMPEG}/>
                <Route path='/youtube-dl' component={YoutubeDL}/>
            </Switch>

        </div>
    </div>
);

export default Main