import axiosConfig from "./axiosConfig"

const NamHocApi = {
    getNamHoc: () => {
        return axiosConfig.get(`/nam-hoc`)
    },
    add: (data) => {
        return axiosConfig.post(`/nam-hoc`, data)
    },
    remove: (id) => {
        return axiosConfig.delete(`/nam-hoc/${id}`)
    },
    Edit: (id) => {
        return axiosConfig.get(`/nam-hoc/${id}`)
    },
    update: (id, data) => {
        return axiosConfig.patch(`/nam-hoc/${id}`, data)
    }

}

export default NamHocApi