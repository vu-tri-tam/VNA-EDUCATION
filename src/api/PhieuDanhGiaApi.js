import axiosConfig from "./axiosConfig"

const PhieuDanhGiaApi = {
    getPhieuDanhGia: () => {
        return axiosConfig.get(`/quan-tri/danh-gia`)
    },
    getPhieuDanhGiaToHieuTruong: () => {
        return axiosConfig.get(`/quan-tri/danh-gia`)
    },
    getGVCN: () => {
        return axiosConfig.get(`/giao-vien/chu-nhiem`)
    },
    getMonHoc: () => {
        return axiosConfig.get(`/mon-hoc`)
    },
    getMauDanhGia: () => {
        return axiosConfig.get(`/mau-danh-gia`)
    },
    getLopHoc: () => {
        return axiosConfig.get(`/lop-hoc`)
    },
    getGiaoVien: () => {
        return axiosConfig.get(`/nguoi-dung`)
    },


}

export default PhieuDanhGiaApi