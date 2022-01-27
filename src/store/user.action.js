import { userService } from '../services/user-service.js'
// import { swalService } from '../services/swal-service.js'


export function login(credentials) {

    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)

            const action = { type: 'SET_USER', user }
            dispatch(action)
            // swalService.onLoginSwal(credentials.username)
            return user
        } catch (err) {
            // swalService.FailLoginSwal()

        }
    }
}


export function signup(credentials) {
    return async (dispatch) => {
        try {
            const newUser = await userService.signup(credentials)

            const action = { type: 'SET_USER', user: newUser }
            dispatch(action)
            // swalService.onSignupSwal(credentials.fullname)
            // })
        } catch (err) {
            // swalService.FailedSignupSwal(credentials.username)
            console.log('err:', err);

        }
    }
}
export function logout() {
    return async (dispatch) => {
        try {
            // await swalService.onLogoutSwal()

            await userService.logout()

            const action = { type: 'SET_USER', user: null }
            dispatch(action)
        } catch (err) {
            // swalService.logoutFailedSwal()
        }
    }
}
