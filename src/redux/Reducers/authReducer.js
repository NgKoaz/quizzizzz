import { USER_CHANGE_PROFILE, USER_LOGIN, USER_LOGOUT } from "../Actions/authTypes"


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
        case USER_CHANGE_PROFILE:
            return {
                account: {
                    ...state.account,
                    username: action.payload?.username,
                    image: action.payload?.image ? action.payload?.image : state.image
                },
                isAuth: state.isAuth
            }
        default:
            return state;
    }
}

export default authReducer;