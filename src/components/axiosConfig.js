import axios from "axios";
import { logoutUser } from "./security/AuthContext"

const backendUrl =import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: backendUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(

    (response) => response,
    (error) => {
        const status = error.response?.status;
        const currentPath = window.location.pathname;

        if ((status == 401 || status == 403) && currentPath !== "/login") {
            logoutUser()
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);



export default api;