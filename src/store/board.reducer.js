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
        case 'UPDATE_BOARD':
            // newState = {
            //     ...state, boards: state.board.map(board => {
            //         return (board._id === action.updatedBoard._id) ? action.updatedBoard : board;
            //     })
            // };
            newState = { ...state, currBoard: action.board };
            break;
        case 'SET_CURR_BOARD':
            newState = { ...state, currBoard: action.board };
            break;
        default:
    }
    return newState;
}