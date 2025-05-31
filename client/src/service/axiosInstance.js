import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "https://ai-interview-backend-nu.vercel.app/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
