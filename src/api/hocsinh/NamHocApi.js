import axiosConfig from "../axiosConfig"

const NamHocApi = {
    getNamHoc: () => {
        return axiosConfig.get(`nam-hoc`)
    },
    getNamHocMoiNhat: () => {
        // trả về năm gần nhất bao gồm các tuần bên trong
        return axiosConfig.get(`nam-hoc/gan-nhat`)
    },
    getTuanMoiNhat: () => {
        return axiosConfig.get(`nam-hoc/gan-nhat/tuan-gan-nhat`)
    }
 }

export default NamHocApi