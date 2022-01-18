

const initialState = {
    toys: [],
    filterBy: {
        type: 'all',
        search: '',
        label: '',
        labels: [],

    },
    // labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]

}

export function toyReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_TOYS':
            newState = { ...state, toys: [...action.toys] }
            break;
        case 'REMOVE_TOY':
            newState = { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
            break;
        case 'SET_FILTER':
            newState = { ...state, filterBy: { ...action.filterBy } }
            break;
        case 'UPDATE_TOY':
            newState = {
                ...state, toys: state.toys.map(currToy => {
                    return (currToy._id === action.toy._id) ? action.toy : currToy
                })
            }
            break;
  
        default:
    }
    return newState;
}