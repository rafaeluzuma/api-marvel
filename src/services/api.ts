import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_MARVEL_API_ENDPOINT

const api = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 5000
});

export default api