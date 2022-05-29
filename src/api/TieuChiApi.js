import axiosConfig from "./axiosConfig"

const TieuChiApi = {
    getAll: () => {
        return axiosConfig.get('tieu-chi-danh-gia')
    },
    get: (id) => {
        return axiosConfig.get(`tieu-chi-danh-gia/${id}`)
    },
    patch: (id,data) => {
        return axiosConfig.patch(`tieu-chi-danh-gia/${id}`,data)
    }
}

export default TieuChiApi