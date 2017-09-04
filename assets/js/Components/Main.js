import React from 'react';
import {Switch} from 'react-router-dom'
import Roster from "./Roster";
import Home from "./Home";
import {Schedule} from "./Api";
import {Route} from 'react-router'
import Soundcloud from "./Apps/Soundcloud";
import Imgur from "./Apps/Imgur";
import FFMPEG from "./Apps/FFMPEG";
import theme from 'reapop-theme-wybo';
import NotificationsSystem from 'reapop';
import Wget from "./Apps/Wget";

const Main = () => (

    <div className="col-md-9 col-sm-12">
        <div className="container main-content">
            <NotificationsSystem theme={theme}/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/soundcloud' component={Soundcloud}/>
                <Route path='/wget' component={Wget}/>
                <Route path="/ffmpeg" component={FFMPEG}/>

            </Switch>

        </div>
    </div>
);

export default Main