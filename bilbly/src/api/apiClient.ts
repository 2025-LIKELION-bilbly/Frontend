// src/api/apiClient.ts
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // http://bib-ly.kro.kr
    withCredentials: true,
});

export default api;
