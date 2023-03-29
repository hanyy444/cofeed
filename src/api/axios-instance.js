import axios from 'axios'

// .env
const BASE_URL = 'https://cofeed-server-vuv7.onrender.com/api/v1'
//'http://localhost:3000/api/v1/'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

export default axiosInstance