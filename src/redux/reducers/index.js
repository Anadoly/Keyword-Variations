import { combineReducers } from 'redux';
import { default as variations } from './variationsReducer';
const appReducer = combineReducers({ variations });

export default appReducer;
