import axios from "axios"
import axiosConfig from "../axiosConfig"

const DanhGiaApi = {
    getGV: () => {
        return axios.get('http://localhost:2077/gv-get-danhGia-ngay')
    },
    getGVDetail: (id) => {
        return axios.get(`http://localhost:2077/gv-get-danhGia-ngay/${id}`)
    },
    getByWeekAndId: (id, week) => {
        return axiosConfig.get(`hoc-sinh/${id}/danh-gia?tuan=${week}`) 
    },
    post: (id,data) => {
        return axiosConfig.post(`hoc-sinh/danh-gia/${id}`,data)
    },
    getDetail: (id) => {
        return axiosConfig.get(`hoc-sinh/danh-gia/${id}`)
    },
    getDGChuaLam: (id, week) => {
        return axiosConfig.get(`danh-gia/chua-lam?hs=${id}&tuan=${week}`)
    }
}

export default DanhGiaApi