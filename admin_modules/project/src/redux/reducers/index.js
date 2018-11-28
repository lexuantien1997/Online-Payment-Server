// root of reducers

import { combineReducers } from 'redux';
import userinfoReducer from './userinfo.reducer'
import transactionReducer from './transaction.reducer'
import checkinReducer from './checkin.reducer'
import promotionReducer from './promotion.reducer'
// combine all reducers from another module
export default combineReducers({
    userinfoReducer,
    transactionReducer,
    checkinReducer,
    promotionReducer
    // loginReducer,
    // errorsReducer    
});