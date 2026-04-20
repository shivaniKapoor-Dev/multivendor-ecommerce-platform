import axios from 'axios'

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:2425/api";

export const UPLOADS_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "/uploads");

const Axios = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

Axios.interceptors.response.use(
  res => res,
  err => {
   if (err.response?.status === 401) {
  localStorage.removeItem("user");
  localStorage.removeItem("token")

  if (window.location.pathname !== "/") {
    window.location.replace("/"); 
  }
}    return Promise.reject(err);
  }
);


export default Axios;
