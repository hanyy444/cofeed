import axios from 'axios'
import config from 'config'

// .env
const BASE_URL = config.baseApi
// 'https://cofeed-server-vuv7.onrender.com/api/v1'
// 'http://localhost:3000/api/v1/'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

export default axiosInstance