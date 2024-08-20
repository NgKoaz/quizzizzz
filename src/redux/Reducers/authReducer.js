import { USER_LOGIN, USER_LOGOUT } from "../Actions/authTypes"


const initialState = {
    account: {
        "access_token": "",
        "refresh_token": "",
        "username": "",
        "role": "",
        "email": "",
        "image": ""
    },
    isAuth: false
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                account: action.payload,
                isAuth: (action.payload?.access_token) ? true : false
            }
        case USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default authReducer;