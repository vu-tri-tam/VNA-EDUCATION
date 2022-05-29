import axiosConfig from "./axiosConfig"

const MauDanhGiaApi = {
    getMauDanhGia: () => {
        return axiosConfig.get(`/mau-danh-gia`)
    },
    add: (data) => {
        return axiosConfig.post(`/mau-danh-gia`, data)
    },
    remove: (id) => {
        return axiosConfig.delete(`/mau-danh-gia/${id}`)
    },
    EditData: (id) => {
        return axiosConfig.get(`/mau-danh-gia/${id}`)
    },
    update: (id, data) => {
        return axiosConfig.patch(`/mau-danh-gia/${id}`, data)
    }

}

export default MauDanhGiaApi