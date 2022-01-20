const initialState = {
    boards: [],
    currBoard: null,
};

export function boardReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards };
            break;
        case 'REMOVE_BOARD':
            newState = { ...state, boards: state.boards.filter(board => board._id !== action.boardId) };
            break;
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] };
            break;
        case 'SET_CURR_BOARD':
            newState = { ...state, currBoard: {...action.board }  };
            break;
    }
    return newState;
}