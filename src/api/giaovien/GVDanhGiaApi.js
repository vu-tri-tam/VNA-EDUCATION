import axiosConfig from "../axiosConfig"

const GVDanhGiaApi = {
    getAll: (id,week) => {
        return axiosConfig.get(`giao-vien/danh-gia?gv=${id}&tuan=${week}`)
    },
    get: (id) => {
        return axiosConfig.get(`/giao-vien/danh-gia/${id}`)
    }
}

export default GVDanhGiaApi