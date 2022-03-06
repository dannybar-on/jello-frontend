import { httpService } from './http.service';

const STORAGE_KEY_LOGGEDIN = 'loggedinUser';

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getGuestUser,
    getUsers,
    googleLogin
}


async function login({ username, password }) {
    const user = await httpService.post('auth/login', { username, password });
    _setLoggedinUser(user);
    return user;
}


async function googleLogin(tokenId) {
    try {
        const user = await httpService.post('auth/googlelogin', { tokenId })
        if (user) {
            _setLoggedinUser(user);
            return user
        }
    } catch (err) {
        throw err
    }
}

async function signup(newUser) {
    const user = await httpService.post('auth/signup', newUser);
    _setLoggedinUser(user);
    return user;
}

async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null);
    return;
}


function getGuestUser() {
    return { username: 'Guest', password: 'guest' }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
}


function _setLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user));
}

async function getUsers() {
    const users = await httpService.get(`user`)
    return users
}

