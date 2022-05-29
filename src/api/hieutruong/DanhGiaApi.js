import axiosConfig from "../axiosConfig"

const DanhGiaApi = {
    getByWeekAndClass: (week, classc) => {
        return axiosConfig.get(`hieu-truong/danh-gia/theo?tuan=${week}&lop=${classc}`) 
    },
    getDetail: (id) => {
        return axiosConfig.get(`hieu-truong/danh-gia/${id}`)
    },
    patchDetailDaDuyet: (id, boole) => {
        return axiosConfig.patch(`hieu-truong/duyet-danh-gia/${id}?trangThai=${boole}`)
    }
}

export default DanhGiaApi