import { userService } from '../services/user-service.js'


const initialState = {
    user: userService.getLoggedinUser(),
    users: []
}

export function userReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'SET_USERS':
            newState = { ...state, users: action.users}
    }
    return newState;
}
