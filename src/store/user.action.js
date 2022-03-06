import { userService } from '../services/user-service.js';

export function login(credentials) {

    return async (dispatch) => {
        try {
            const user = await userService.login(credentials);
            const action = { type: 'SET_USER', user }
            dispatch(action)
            if (credentials.username !== 'Guest') {
            }
            return user;
        } catch (err) {
            console.log('Cannot log in', err);

        }
    };
}


export function googleLogin(tokenId) {
    return async (dispatch) => {
        try {
            const user = await userService.googleLogin(tokenId)
            const action = { type: 'SET_USER', user }
            dispatch(action)
        } catch (err) {
            console.log('login with google failed:', err);
        }
    }
}

export function signup(credentials) {
    return async (dispatch) => {
        try {
            const newUser = await userService.signup(credentials);
            const action = { type: 'SET_USER', user: newUser };
            dispatch(action);
        } catch (err) {
            console.log('err:', err);
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout();
            const action = { type: 'SET_USER', user: null };
            dispatch(action);
            window.location.assign('/board/login')
        } catch (err) {
        }
    };
}

export function loadUsers() {
    return async (dispatch) => {
        try {
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('Cannot loadUsers', err);
        }
    }
}