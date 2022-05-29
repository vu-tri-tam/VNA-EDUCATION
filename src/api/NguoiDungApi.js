import axiosConfig from "./axiosConfig";

const NguoiDungApi = {
    getAll: (params) => {
        return axiosConfig.get(`/nguoi-dung`, params)
    },
    getById: (_id) => {
        _id = _id || '';
        return axiosConfig.get(`/nguoi-dung/${_id}`)
    },
    addGV: (params) => {
        return axiosConfig.post(`/nguoi-dung`, params);
    },

    updateGV: (id, params) => {
        // id = id || '';
        return axiosConfig.patch(`/nguoi-dung/${id}`, params)
    },
    deleteGV: (id) => {
        return axiosConfig.delete(`/nguoi-dung/${id}`)
    },
    getUserByI: (id) => {
        return axiosConfig.get(`/nguoi-dung/${id}`)
    },
    getUserById: (id) => {
        return axiosConfig.get(`/thong-tin?user=${id}`)
    },
    getSelect: (params) => {
        return axiosConfig.get(`/lop-hoc`, params)
    },

    //lop-hoc
    getAllLH: (params) => {
        return axiosConfig.get(`/lop-hoc`, params)
    },
    AddLH: (params) => {
        return axiosConfig.post(`/lop-hoc`, params)
    },
    getOneLH: (id) => {
        return axiosConfig.get(`/lop-hoc/${id}`)
    },
    deleteLH: (id) => {
        return axiosConfig.delete(`/lop-hoc/${id}`)
    },
    JoinClass: (UserId, classId) => {
        return axiosConfig.patch(`/hoc-sinh/${UserId}/vao-lop/${classId}`);
    },
    //api hoc sinh
    addHS: (params) => {
        return axiosConfig.post(`/nguoi-dung`, params)
    },

    getDSClass: (id) => {
        return axiosConfig.get(`/hoc-sinh/lop/${id}`)
    },
    getByIdHS: (id) => {
        return axiosConfig.get(`/thong-tin?user=${id}`)
    },
    getGVExport: () => {
        return axiosConfig.get(`/nguoi-dung/theo?role=GV`)
    },
    getQTExport: () => {
        return axiosConfig.get(`/nguoi-dung/theo?role=QT-HT`)
    },
    importGV: (params) => {
        return axiosConfig.post(`/nguoi-dung/import`, params)
    },
    importHS: (params) => {
        return axiosConfig.post(`/nguoi-dung/import`, params)
    },
    getAllGV: () => {
        return axiosConfig.get(`/nguoi-dung/theo?role=GV`)
    },
    getAllHS: () => {
        return axiosConfig.get(`nguoi-dung/theo?role=HS`)
    },
    getNamHoc: () => {
        return axiosConfig.get(`/nam-hoc`);
    },
    editLopHoc: (id, params) => {
        return axiosConfig.patch(`/lop-hoc/${id}`, params)
    },
    // getStudentByClass: (classId) => {
    //   return axiosConfig.get(`/nguoi-dung/theo?lop=${classId}`)  
    // },
    getStudentByClass: (classId) => {
        return axiosConfig.get(`/hoc-sinh/thuoc-lop/${classId}`)
    },
    addClass: (id, params) => {
        return axiosConfig.patch(`/hoc-sinh/vao-lop/${id}`, params)
    },
    getMH: () => {
        return axiosConfig.get(`/mon-hoc`)
    },
    getByIdMH: (id) => {
        return axiosConfig.get(`/mon-hoc/${id}`)
    },
    addMH: (params) => {
        return axiosConfig.post(`/mon-hoc`, params)
    },
    deleteMH: (id) => {
        return axiosConfig.delete(`/mon-hoc/${id}`)
    },
    updateMH: (id, params) => {
        return axiosConfig.patch(`/mon-hoc/${id}`, params)
    },
    //hieu-truong
    getDanhSachMH: () => {
        return axiosConfig.get('/mon-hoc')
    },
    getDanhSachGV: (id) => {
        return axiosConfig.get(`/giao-vien/theo?mon=${id}`)
    },
    getLopHocDanhSachDG: (idGV, idMH) => {
        return axiosConfig.get(`/danh-gia/theo?gv=${idGV}&mon=${idMH}`)
    },
    getDanhGiaByMonGV: (idGV, idLH) => {
        return axiosConfig.get(` /hieu-truong/danh-gia/bo-mon?gv=${idGV}&lop=${idLH} `)
    },
    getGVCN: () => {
        return axiosConfig.get(`/giao-vien/chu-nhiem`)
    },
    getDiemDanh: (id) => {
        return axiosConfig.get(`/hoc-sinh/${id}/diem-danh`)
    },

    //thong ke
    thongKeTuan: (idTuan) => {
        return axiosConfig.get(`/thong-ke/giao-vien/diem-danh-gia?tuan=${idTuan}`)
    },
    thongKeAll: () => {
        return axiosConfig.get(`/thong-ke`)
    },
    getTongSoGV: () => {
        return axiosConfig.get(`/nguoi-dung/theo?role=GV`)
    },
    getTongSoHS: () => {
        return axiosConfig.get(`/nguoi-dung/theo?role=HS`)
    },
}

export default NguoiDungApi