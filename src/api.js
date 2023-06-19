import axios from 'axios';

export function getJwtToken() {
    try {
        return localStorage.getItem('jwt');
    } catch (err) {
        console.error(err);
    }
}

const api = axios.create({
    baseURL: 'https://boat-service.azurewebsites.net/api',
});

api.interceptors.request.use(
    config => {
        config.headers.Authorization = `Bearer ${getJwtToken()}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
