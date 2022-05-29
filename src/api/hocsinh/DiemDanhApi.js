// import axiosConfig from "./axiosConfig"
import axios from "axios"

const axiosConfig = axios.create({
    baseURL: "http://localhost:2077",
})

const DiemDanhApi = {
    get: (id) => {
        return axiosConfig.get(`bang-diem-danh3/${id || ""}`)
    }
}

export default DiemDanhApi