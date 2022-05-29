import axiosConfig from "../axiosConfig"

const BangDiemApi = {
    get: (id) => {
        return axiosConfig.get(`hoc-sinh/${id}/diem-so`)
    }
 }

export default BangDiemApi