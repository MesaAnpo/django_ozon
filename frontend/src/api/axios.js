import axios from "axios";

function getCSRFToken(){
    const match= document.cookie.match(/(^|;\s*)csrftoken=([^;]+)/);
    return match ? decodeURIComponent(match[2]):null;
}
  

const axiosInstance = axios.create({
    baseURL:"/api/v1",
    withCredentials: true,
});
axiosInstance.interceptors.request.use((config)=>{
    const token= getCSRFToken();
    if (token) config.headers["X-CSRFToken"]= token;
    return config;
});

export default axiosInstance;
