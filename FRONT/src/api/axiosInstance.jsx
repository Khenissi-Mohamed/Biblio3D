import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://projet-biblio-3d-production.up.railway.app/api'
});