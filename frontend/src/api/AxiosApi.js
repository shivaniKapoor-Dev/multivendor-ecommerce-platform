import axios from 'axios'

export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const UPLOADS_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "/uploads");

console.log("Current API URL:", API_BASE_URL); 

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
