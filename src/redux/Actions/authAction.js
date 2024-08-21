import { USER_CHANGE_PROFILE, USER_LOGIN, USER_LOGOUT } from "./authTypes"

export const userLogin = (payload) => {
    return {
        type: USER_LOGIN,
        payload: payload
    }
}

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
}

export const changeProfile = (payload) => {
    return {
        type: USER_CHANGE_PROFILE,
        payload: payload
    }
}