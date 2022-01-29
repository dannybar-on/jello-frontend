import { httpService } from './http.service';




const STORAGE_KEY_LOGGEDIN = 'loggedinUser';

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getGuestUser,
    getUsers

};


async function login({ username, password }) {
    console.log('sssss', username);
    const user = await httpService.post('auth/login', { username, password });
    _setLoggedinUser(user);
    return user;
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


function getGuestUser(){
 return { username: 'Guest', password:'guest' }
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

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Noya', score: 22})
// userService.login({ username: 'muki', password: 'muki1' })