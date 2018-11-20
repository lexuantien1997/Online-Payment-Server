const defaultState={
    listCheckin:[],
}
var checkinReducer = (state = defaultState,action)=>{
    switch (action.type){
        case 'LOAD_LIST_CHECKIN':
            return {...state, listCheckin:[action.item]}
    }
    return state;
}

export default checkinReducer