import axios from "./customAxios";

const loginUrl = "api/v1/login";
const registerUrl = "api/v1/register";

export const loginUser = (email, password) => {
    return axios.post(loginUrl, {
        email,
        password
    })
}

export const registerUser = (email, username, password) => {
    return axios.post(registerUrl, {
        email,
        username,
        password
    })
}





