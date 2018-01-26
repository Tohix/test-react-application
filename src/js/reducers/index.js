import { combineReducers } from 'redux-immutable';
import weatherReducer from './weather';

const rootReducer = combineReducers({
    weather: weatherReducer
})

export default rootReducer;
