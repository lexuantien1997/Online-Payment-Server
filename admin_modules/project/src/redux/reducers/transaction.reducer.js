const defaultState={
    listTransaction:[],
}
var transactionReducer = (state = defaultState,action)=>{
    switch (action.type){
        case 'LOAD_LIST_TRANSACTION':
            return {...state, listTransaction:[action.item]}
    }
    return state;
}

export default transactionReducer