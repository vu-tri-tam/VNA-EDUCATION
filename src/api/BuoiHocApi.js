import axiosConfig from "./axiosConfig"

const BuoiHocApi = {
    getBuoiHoc: () => {
        return axiosConfig.get(`/buoi-hoc`)

    },

    add: (data) => {
        return axiosConfig.post(`/buoi-hoc`, data)
    },
    remove: (id) => {
        return axiosConfig.delete(`/buoi-hoc/${id}`)
    },
    Edit: (id) => {
        return axiosConfig.get(`/buoi-hoc/${id}`)
    },
    update: (id, data) => {
        return axiosConfig.patch(`/buoi-hoc/${id}`, data)
    }

}

export default BuoiHocApi