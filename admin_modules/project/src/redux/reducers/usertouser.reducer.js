const defaultState={
    listUsertoUser:[],
}
var usertouserReducer = (state = defaultState,action)=>{
    switch (action.type){
        case 'LOAD_LIST_USERTOUSER':
            return {...state, listUsertoUser:[action.item]}
    }
    return state;
}

export default usertouserReducer