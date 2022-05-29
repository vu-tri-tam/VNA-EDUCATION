import axiosConfig from "./axiosConfig"

const BangTinApi = {
    getAll: () => {
        return axiosConfig.get("thong-bao")
    },
    get: (id) => {
        return axiosConfig.get(`thong-bao/${id}`)
    },
    getByCata: (cata) => {
        return axiosConfig.get(`thong-bao/theo?muc=${cata}`)
    }
}

export default BangTinApi