import axios from "./customAxios"
const getUsersUrl = "/api/v1/participant"
const getAllUsersUrl = "/api/v1/participant/all"
const postUserUrl = "/api/v1/participant"
const putUserUrl = "/api/v1/participant"
const deleteUserUrl = "/api/v1/participant"

export const getUsers = (page) => {
    return axios.get(getUsersUrl, {
        params: {
            page,
            limit: 5
        }
    });
}

export const getAllUsers = () => {
    return axios.get(getAllUsersUrl)
}

export const postUser = (email, username, password, role, image) => {
    const form = new FormData();
    form.append("email", email)
    form.append("username", username)
    form.append("password", password)
    form.append("role", role)
    form.append("userImage", image)
    return axios.post(postUserUrl, form, {
        headers: { "Content-Type": "multipart/form-data" }
    })
}

export const putUser = (id, username, role, userImage) => {
    const form = new FormData();
    form.append("id", id)
    form.append("username", username)
    form.append("role", role)
    form.append("userImage", userImage)
    return axios.put(putUserUrl, form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const deleteUser = (id) => {
    return axios.delete(deleteUserUrl, { data: { id } })
}