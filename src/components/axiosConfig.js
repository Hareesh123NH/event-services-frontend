import axios from "axios";

const backendUrl = "http://localhost:5000"
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
        if (error.response && error.response.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);



export default api;