import {combineReducers} from 'redux'
import {reducer as notificationsReducer} from 'reapop';
import flood from "./slurp_reducer";


const floodApp = combineReducers({
    notifications: notificationsReducer(),
    flood: flood

});

export default floodApp