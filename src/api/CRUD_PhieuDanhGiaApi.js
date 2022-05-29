import axiosConfig from "./axiosConfig"

const CRUD_PhieuDanhGia = {

    add: (data) => {
        return axiosConfig.post(`/danh-gia`, data)
    },
    remove: (id) => {
        return axiosConfig.delete(`/danh-gia/${id}`)
    },
    Edit: (id) => {
        return axiosConfig.get(`/danh-gia/${id}`)
    },
    update: (id, data) => {
        return axiosConfig.patch(`/danh-gia/${id}`, data)
    }

}

export default CRUD_PhieuDanhGia