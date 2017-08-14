/**
 * Created by Troy on 8/11/2017.
 */
import React from 'react';
import {Switch} from 'react-router-dom'
import Roster from "./Roster";
import Home from "./Home";
import {Schedule} from "./Api";
import {Route} from 'react-router'
import Soundcloud from "./Apps/Soundcloud";
import Imgur from "./Apps/Imgur";
import FFMPEG from "./Apps/FFMPEG";


const Main = () => (

    <div className="col-md-9 col-sm-12">
        <div className="container main-content">

            <Switch>
                <Route exact path='/' component={Home}>YESSSSS</Route>
                <Route path='/soundcloud' component={Soundcloud}/>
                <Route path='/imgur' component={Imgur}/>
                <Route path="/ffmpeg" component={FFMPEG}/>
                <Route path={'/imgur'} compoenet={}/>
            </Switch>

        </div>
    </div>
);

export default Main