const initialState = {
    boards: [],
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
        case 'UPDATE_TOY':
            newState = {
                ...state, boards: state.board.map(board => {
                    return (board._id === action.updatedBoard._id) ? action.updatedBoard : board;
                })
            };
            break;
        default:
    }
    return newState;
}