// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const userId = localStorage.getItem("userId");

//   if (userId) {
//     config.headers["X-User-Id"] = userId; // 🔥 핵심
//   }

//   return config;
// });

// export default api;



import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  // withCredentials: true,
});

api.interceptors.request.use((config) => {
  // const userId = localStorage.getItem("userId");

  // if (userId) {
  //   // config.headers["X-User-Id"] = userId; // 🔥 핵심
  // }

  return config;
});

export default api;
