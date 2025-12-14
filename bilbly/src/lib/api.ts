import axios from "axios";

const api = axios.create({
    baseURL: "http://bib-ly.kro.kr/api/v1",
    withCredentials: false,
});

export default api;
