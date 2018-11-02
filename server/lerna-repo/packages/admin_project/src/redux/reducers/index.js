// root of reducers

import { combineReducers } from 'redux';
import usertouserReducer from './usertouser.reducer'
import userinfoReducer from './userinfo.reducer'
// combine all reducers from another module
export default combineReducers({
    usertouserReducer,
    userinfoReducer
    // loginReducer,
    // errorsReducer    
});