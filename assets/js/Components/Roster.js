/**
 * Created by Troy on 8/11/2017.
 */
import React from 'react';
import {Route} from "react-router";
import {Switch} from "react-router-dom";
import {FullRoster, Player} from "./Api";
const Roster = () => (
  <Switch>
    <Route exact path='/roster' component={FullRoster}/>
    <Route path='/roster/:number' component={Player}/>
  </Switch>
);

export default Roster