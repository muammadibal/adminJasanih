import { combineReducers } from 'redux';
import { authReducer, transactionReducer } from './';

const reducers = combineReducers({ authReducer, transactionReducer });

export default reducers;
