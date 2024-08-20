import axios from "axios";
import nProgress from "nprogress";
import { store } from '../redux/store';

nProgress.configure({ easing: 'ease', speed: 200, showSpinner: false });


const instance = axios.create({
    baseURL: "http://localhost:8081/",
});

instance.interceptors.request.use(function (config) {
    nProgress.start();
    const access_token = store.getState().auth.account.access_token;
    config.headers["Authorization"] = `Bearer ${access_token}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    nProgress.done()

    return response?.data ?? response;
}, function (error) {
    nProgress.done()
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error?.response?.data ?? Promise.reject(error);
});


export default instance;