const initialState = {
    boards: [],
    currBoard: null,
    currTask: null,
};

export function boardReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: [...action.boards] };
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
        case 'REMOVE_CURR_BOARD':
            newState = { ...state, currBoard: action.board  };
            break;
        case 'SET_CURR_TASK':
            newState = { ...state, currTask: {...action.currTask}};
            break;
    }
    // console.log('NEW STATE', newState)
    return newState;
}