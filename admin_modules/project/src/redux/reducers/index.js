// root of reducers

import { combineReducers } from 'redux';
import userinfoReducer from './userinfo.reducer'
import transactionReducer from './transaction.reducer'
// combine all reducers from another module
export default combineReducers({
    userinfoReducer,
    transactionReducer
    // loginReducer,
    // errorsReducer    
});