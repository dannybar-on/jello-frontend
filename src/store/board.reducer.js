const initialState = {
    boards: [],
}

export function boardReducer(state = initialState, action) {
    var newState = state;
    switch(action.type) {
        case 'SET_BOARDS':
            newState = {...state, boards: action.boards}
            break;
        default:
    }
    return newState
}