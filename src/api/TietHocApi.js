import axiosConfig from "./axiosConfig"

const TietHocApi = {
    getTietHoc: () => {
        return axiosConfig.get(`/tiet-hoc`)

    },
    getMonHocById: (idMH) => {
        return axiosConfig.get(`/giao-vien/theo?mon=${idMH}`)

    },
    getTietHocTheoBuoi: (idBH) => {
        return axiosConfig.get(`/tiet-hoc/theo?buoi=${idBH}`);
    },
    add: (data) => {
        return axiosConfig.post(`/tiet-hoc`, data)
    },
    remove: (id) => {
        return axiosConfig.delete(`/tiet-hoc/${id}`)
    },
    Edit: (id) => {
        return axiosConfig.get(`/tiet-hoc/${id}`)
    },
    update: (id, data) => {
        return axiosConfig.patch(`/tiet-hoc/${id}`, data)
    }

}

export default TietHocApi
