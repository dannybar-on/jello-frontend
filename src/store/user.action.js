import { userService } from '../services/user-service.js';
import { swalService } from '../services/swal-service.js'


export function login(credentials) {

    return async (dispatch) => {
        try {
            console.log(credentials);
            const user = await userService.login(credentials);

            const action = { type: 'SET_USER', user }
            dispatch(action)
            console.log('credentials.username:', credentials.username);

            if (credentials.username !== 'Guest') {
                swalService.onLoginSwal(credentials.username)
            }
            return user;

        } catch (err) {
            swalService.FailLoginSwal()
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
            swalService.onSignupSwal(credentials.fullname)
            // })
        } catch (err) {
            swalService.FailedSignupSwal(credentials.username)
            console.log('err:', err);

        }
    };
}
export function logout() {
    return async (dispatch) => {
        try {
            // await swalService.onLogoutSwal()

            await userService.logout();

            const action = { type: 'SET_USER', user: null };
            dispatch(action);
            console.log('window.location:', window.location);

            window.location.assign('/board/login')
        } catch (err) {
            // swalService.logoutFailedSwal()
        }
    };
}

export function loadUsers() {
    return async (dispatch) => {
        try {
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users})
        } catch (err) {
            console.log('Cannot loadUsers', err);
        }
    }
}