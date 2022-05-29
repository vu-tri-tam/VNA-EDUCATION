import axiosConfig from "../axiosConfig"

const LichHocApi = {
    getByTuanVaLop: (tuan, lop) => {
        return axiosConfig.get(`lich-hoc?tuan=${tuan}&lop=${lop}`)
    }
 }

export default LichHocApi