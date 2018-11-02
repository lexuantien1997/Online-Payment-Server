const defaultState={
    listUser:[],
}
var userinfoReducer = (state = defaultState,action)=>{
    switch (action.type){
        case 'LOAD_LIST_USERINFO':
            return {...state, listUser:[action.item]}
    }
    return state;
}

export default userinfoReducer