import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://biblio-production-5483.up.railway.app/api',
    maxContentLength: Infinity
});