// import axiosConfig from "./axiosConfig"
import axios from "axios"

const axiosConfig = axios.create({
    baseURL: "http://localhost:2077",
})


const DiemDanhApi = {
    getAll: () => {
        return axiosConfig.get('diem-danh')
    }
}

export default DiemDanhApi