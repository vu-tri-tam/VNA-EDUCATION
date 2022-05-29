import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import '../../assets/css/showTKB.css'
import '../../assets/css/showListStudent.css'
import '../../assets/css/showStudent.css'
import '../../assets/css/showDiemdanh.css'
// import '../../assets/css/profile.css'
// import '../../assets/css/Main.css'
import Header from '../../components/common/Header';
import Thongke from '../../components/admin/thongke/Thongke'; // Thay Bang tin = thống kê
import DanhSachGV from '../../components/admin/teacher/DanhSachGV';
import ThemGV from '../../components/admin/teacher/ThemGV';
import DetailShow from '../../components/admin/teacher/DetailShow';
import DanhSachHS from '../../components/admin/Students/DanhSachHS';
import DiemDanh from '../../components/admin/Students/Information/DiemDanh';
import ThemHS from '../../components/admin/Students/ThemHS';
import EditHS from '../../components/admin/Students/EditHS';
import DetailShowHS from '../../components/admin/Students/DetailShow';
import EditGV from '../../components/admin/teacher/EditGV';

///quan lí đánh giá và  bảng tin
import QuanLyDanhGia from '../../components/admin/quanlydanhgia/QuanLyDanhGia';
import AddBangTin from '../../components/admin/quanlybangtin/AddBangTin';
// import DanhGiaGVCHS from '../../components/admin/quanlydanhgia/DanhGiaGVCHS';
// import DetailDanhGiaGVCHS from '../../components/admin/quanlydanhgia/DetailDanhGiaGVCHS';
// import DetailDGCHocSinh from '../../components/admin/quanlydanhgia/DetailDGCHS';
// import DanhGiaGVCPH from '../../components/admin/quanlydanhgia/DanhGiaGVCPH';
// // import DetailDanhGiaGVCPH from '../../components/admin/quanlydanhgia/DetailDanhGiaGVCPH';
// import DetailDGCPhuHuynh from '../../components/admin/quanlydanhgia/DetailDGCPH';
import PhieuDanhGia from '../../components/admin/quanlydanhgia/PhieuDanhGia';

//end quản lí đánh giá
import Profile from '../../components/common/user/Profile';
import ChangePass from '../../components/common/user/ChangePass';

//quản lí lịch học
import quanLyLichHoc from '../../components/admin/quanLyLichHoc/quanLyLichHoc';
// import quanLyThu from '../../components/admin/quanLyThu/quanLyThu';
// import quanLyNamHoc from '../../components/admin/quanlynamhoc/namHoc';
import quanLyTuanHoc from '../../components/admin/quanlytuanhoc/quanLyTuan';
import quanLyLop from '../../components/admin/quanLyLichHoc/quanLyLop';
import quanLyTietHoc from '../../components/admin/quanLyLichHoc/quanLyTietHoc';
import NamHocReducers from '../../components/admin/quanlynamhoc/namHocReducer';//test reducer
//quản trị của hải
//Quản-trị
import DanhSachQT from '../../components/admin/quantri/DanhSachQT';
import DetailShowQT from '../../components/admin/quantri/DetailShowQT';
import ThemQT from '../../components/admin/quantri/ThemQT';
import EditQT from '../../components/admin/quantri/EditQT';
//lớp-học
import DanhSachLH from '../../components/admin/lophoc/DanhSachLH';
import ThemLH from '../../components/admin/lophoc/ThemLH';
import EditLopHoc from '../../components/admin/lophoc/EditLopHoc';
//Phụ huynh
// import DanhSachPH from '../../components/admin/phuhuynh/DanhSachPH';
// import AddPH from '../../components/admin/phuhuynh/ThemPH';
//Quản lý thống kê
import QuanLyTK from '../../components/admin/quanlyTK/QuanLyTK';
// import PhanLop from '../../components/admin/Students/PhanLop';
//Quản lý môn học
import DanhSachMH from '../../components/admin/monhoc/DanhSachMH';
import ThemMH from '../../components/admin/monhoc/ThemMH';
import EditMH from '../../components/admin/monhoc/EditMH';




const QuanLyPage = () => {

    return (
        <Router>
            <div id="app">
                <Sidebar />
                <div id="main">
                    <Header match="quan-ly" />
                    <Switch>
                        <Route path='/quan-ly' exact component={Thongke} />
                        <Route path='/quan-ly/giao-vien/danh-sach' exact component={DanhSachGV} />
                        <Route path='/quan-ly/giao-vien/them-giao-vien' exact component={ThemGV} />
                        {/* */}
                        <Route path='/quan-ly/giao-vien/danh-sach/chi-tiet/:id' exact component={DetailShow} />
                        <Route path='/quan-ly/hoc-sinh/danh-sach' exact component={DanhSachHS} />
                        <Route path='/quan-ly/hoc-sinh/them-hoc-sinh' exact component={ThemHS} />
                        <Route path='/quan-ly/hoc-sinh/danh-sach/chi-tiet/:id' exact component={DetailShowHS} />
                        <Route path='/quan-ly/hoc-sinh/danh-sach/diem-danh' exact component={DiemDanh} />
                        {/*PAGE sửa thông tin gv */}
                        <Route path='/quan-ly/hoc-sinh/sua-hoc-sinh/:id' exact component={EditHS} />

                        {/*PAGE sửa thông tin hs */}
                        <Route path='/quan-ly/giao-vien/sua-giao-vien/:id' exact component={EditGV} />


                        <Route path='/quan-ly/danh-gia/danh-sach' exact component={QuanLyDanhGia} />
                        <Route path='/quan-ly/bang-tin/them-bang-tin' exact component={AddBangTin} />

                        {/* <Route path='/quan-ly/danh-gia/cua-hoc-sinh' exact component={DanhGiaGVCHS} />
                        <Route path='/quan-ly/danh-gia/cua-hoc-sinh/chi-tiet/:idMH' exact component={DetailDanhGiaGVCHS} />
                        <Route path='/quan-ly/danh-gia/cua-hoc-sinh/chi-tiet/:idMH/:idgv' exact component={DetailDGCHocSinh} />
                        <Route path='/quan-ly/danh-gia/cua-phu-huynh' exact component={DanhGiaGVCPH} />
                        <Route path='/quan-ly/danh-gia/cua-phu-huynh/chi-tiet' exact component={DetailDGCPhuHuynh} /> */}
                        <Route path='/quan-ly/danh-gia/danh-sach-phieu-danh-gia' exact component={PhieuDanhGia} />


                        {/* ---quan lí lịch hoc */}
                        {/* <Route path='/quan-ly/quan-li-lich-hoc' exact component={quanLyLichHoc} /> */}
                        <Route path='/quan-ly/quan-li-lich-hoc' exact component={quanLyLop} />
                        {/* <Route path='/quan-ly/quan-li-nam-hoc/thu' exact component={quanLyThu} /> */}
                        {/* <Route path='/quan-ly/quan-li-nam-hoc/nam-hoc' exact component={quanLyNamHoc} /> */}

                        <Route path='/quan-ly/quan-li-lich-hoc/:idLH' exact component={quanLyLichHoc} />
                        <Route path='/quan-ly/quan-li-lich-hoc/quan-ly-lop/:idLH/:idBH' exact component={quanLyTietHoc} />
                        <Route path='/quan-ly/quan-li-nam-hoc/nam-hoc' exact component={NamHocReducers} />
                        <Route path='/quan-ly/quan-li-nam-hoc/tuan-hoc' exact component={quanLyTuanHoc} />


                        {/*Page Quản trị */}
                        <Route path='/quan-ly/quan-tri/danh-sach' exact component={DanhSachQT} />
                        <Route path='/quan-ly/quan-tri/danh-sach/chi-tiet/:id' exact component={DetailShowQT} />
                        <Route path='/quan-ly/quan-tri/them-quan-tri' exact component={ThemQT} />
                        <Route path='/quan-ly/quan-tri/sua-quan-tri-vien/:id' exact component={EditQT} />

                        {/*Page Lớp học*/}
                        <Route path='/quan-ly/lop-hoc/danh-sach' exact component={DanhSachLH} />
                        <Route path='/quan-ly/lop-hoc/them-lop-hoc' exact component={ThemLH} />
                        <Route path='/quan-ly/lop-hoc/sua-lop-hoc/:id' exact component={EditLopHoc} />
                        {/*Phu huynh */}
                        {/* <Route path='/quan-ly/phu-huynh/danh-sach' exact component={DanhSachPH} /> */}
                        {/* <Route path='/quan-ly/phu-huynh/them-danh-sach' exact component={AddPH} /> */}
                        {/*Quản lý thống kê*/}
                        <Route path='/quan-ly/thong-ke' exact component={QuanLyTK} />
                        {/*Quan lý môn học */}
                        <Route path='/quan-ly/mon-hoc/danh-sach' exact component={DanhSachMH} />
                        <Route path='/quan-ly/mon-hoc/them-mon-hoc' exact component={ThemMH} />
                        <Route path='/quan-ly/mon-hoc/sua-mon-hoc/:id' exact component={EditMH} />



                        <Route path='/quan-ly/tai-khoan/thong-tin' exact component={Profile} />
                        <Route path='/quan-ly/tai-khoan/doi-mat-khau' exact component={ChangePass} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default QuanLyPage;