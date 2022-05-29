import axiosConfig from "./axiosConfig"

const LopHocApi = {
    getLopHoc: () => {
        return axiosConfig.get(`/lop-hoc`)

    },
    getNameLopHocById: (idLH) => {
        return axiosConfig.get(`/lop-hoc/${idLH}`)

    },
    add: (data) => {
        return axiosConfig.post(`/lop-hoc`, data)
    },
    remove: (id) => {
        return axiosConfig.delete(`/lop-hoc/${id}`)
    },
    Edit: (id) => {
        return axiosConfig.get(`/lop-hoc/${id}`)
    },
    update: (id, data) => {
        return axiosConfig.patch(`/lop-hoc/${id}`, data)
    }

}

export default LopHocApi
