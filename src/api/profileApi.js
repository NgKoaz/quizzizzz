import axios from "./customAxios"

const getHistoryUrl = "/api/v1/history"
const putProfileUrl = "/api/v1/profile"
const postChangePasswordUrl = "/api/v1/change-password"

export const getHistory = () => {
    return axios.get(getHistoryUrl)
}

export const putProfile = (username, userImage) => {
    const form = new FormData()
    form.append("username", username)
    form.append("userImage", userImage)
    return axios.post(putProfileUrl, form)
}

export const changePassword = (current_password, new_password) => {
    return axios.post(postChangePasswordUrl, {
        current_password,
        new_password
    })
}