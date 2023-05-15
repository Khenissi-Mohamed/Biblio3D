import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://biblio3d-production.up.railway.app/api',
});