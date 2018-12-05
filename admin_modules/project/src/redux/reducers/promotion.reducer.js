const defaultState={
    listPromotion:[],
}
var promotionReducer = (state = defaultState,action)=>{
    switch (action.type){
        case 'LOAD_LIST_PROMOTION':
            return {...state, listPromotion:[action.item]}
    }
    return state;
}

export default promotionReducer