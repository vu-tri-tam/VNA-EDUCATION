import axiosConfig from "./axiosConfig"

const DanhGiaApi = {
    getAll: () => {
        return axiosConfig.get('danhgia')
    },
    getGV: () => {
        return axiosConfig.get('gv-xem-danh-gia')
    },
    getGVDetail: (id) => {
        return axiosConfig.get(`gv-xem-danh-gia/${id}`)
    },
    get: (id) => {
        return axiosConfig.get(`danh-gia/${id}`)
    },
    getAllById: (id) => {
        return axiosConfig.get(`danh-gia/theo?user=${id}`)
    },
    post: (id,data) => {
        return axiosConfig.post(`hoc-sinh/danh-gia/${id}`,data)
    },
    put: (id,data) => {
        return axiosConfig.put(`danh-gia/${id}`,data)
    }
}

export default DanhGiaApi