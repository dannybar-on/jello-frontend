import { userService } from '../services/user-service.js'


const initialState = {
    user: userService.getLoggedinUser() 
}

export function userReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;

    }
    return newState;
}
