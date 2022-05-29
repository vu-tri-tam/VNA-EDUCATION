import axiosConfig from "./axiosConfig"

const TuanHocApi = {
    getTuanHoc: () => {
        return axiosConfig.get(`/tuan-hoc`)

    },
    add: (data) => {
        return axiosConfig.post(`/tuan-hoc`, data)
    },
    remove: (id) => {
        return axiosConfig.delete(`/tuan-hoc/${id}`)
    },
    Edit: (id) => {
        return axiosConfig.get(`/tuan-hoc/${id}`)
    },
    update: (id, data) => {
        return axiosConfig.patch(`/tuan-hoc/${id}`, data)
    }

}

export default TuanHocApi
