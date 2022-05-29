import axiosConfig from "./axiosConfig"

// import axios from "axios"

// const axiosConfig = axios.create({
//     baseURL: "http://localhost:2077",
// })

const BangDiemApi = {
    get: (id) => {
        return axiosConfig.get(`bang-diem2/${id}`)
    }
 }

export default BangDiemApi