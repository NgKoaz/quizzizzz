import axios from "./customAxios"

const getDashboardUrl = "/api/v1/overview";

export const getDashboard = () => {
    return axios.get(getDashboardUrl)
}