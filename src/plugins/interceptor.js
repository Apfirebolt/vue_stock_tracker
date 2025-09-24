import axios from 'axios';

axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Response interceptor
axios.interceptors.response.use(
    (response) => {
        // Handle response data
        return response;
    },
    (error) => {
        // Handle response error
        return Promise.reject(error);
    }
);

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` // Uncomment if using auth
    },
    params: {
        token: import.meta.env.VITE_API_KEY // Assuming the API key is passed as a query parameter named 'token'
    }
});

export default axiosInstance;
