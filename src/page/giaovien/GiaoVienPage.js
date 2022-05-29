import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// css dashboard
import '../../assets/css/app.css';
// hocsinh component
import Header from '../../components/common/Header';
import SideBar from '../../components/giaovien/SideBar'
import BangTin from '../../components/common/bangtin/BangTin'
import BaiViet from '../../components/common/bangtin/BaiViet';
import ChangePass from '../../components/common/user/ChangePass'
import Profile from '../../components/common/user/Profile'
import DanhGia from '../../components/giaovien/danhgia/DanhGia';
import LichDay from '../../components/giaovien/hoctap/LichDay';
// import BangDiem from '../../components/giaovien/hoctap/BangDiem';
// import DiemDanh from '../../components/giaovien/hoctap/DiemDanh';
// import BangDiemLop from '../../components/giaovien/hoctap/BangDiemLop';
// import ChiTietDiem from '../../components/giaovien/hoctap/ChiTietDiem';
import NotFound from '../error/404';
// import DiemDanhDetai from '../../components/giaovien/hoctap/DiemDanhDetai';
import ListBaiViet from '../../components/common/bangtin/ListBaiViet';
// import SuaDiem from '../../components/giaovien/hoctap/SuaDiem';
import DanhGiaDetail from '../../components/giaovien/danhgia/DanhGiaDetail';
import DangCapNhat from '../../components/common/DangCapNhat';

const GiaoVienPage = () => {
    return (
        <Router>
            <div id="app">
            <SideBar/>
            <div id="main">
                <Header match="giao-vien" />
                <Switch>
                    {/* bảng tin  */}
                    <Redirect exact from="/giao-vien" to="/giao-vien/bang-tin" />
                    <Route path='/giao-vien/bang-tin' exact component={ BangTin }/>
                    <Route path='/giao-vien/bang-tin/:catalog' exact component={ListBaiViet} />
                    <Route path='/giao-vien/bai-viet/:id' exact component={ BaiViet } />
                    {/* xem đánh giá */}
                    <Route path='/giao-vien/xem-danh-gia/gvbm' exact component={ DanhGia } />
                    <Route path='/giao-vien/xem-danh-gia/gvcn' exact component={ DanhGia } />
                    <Route path='/giao-vien/xem-danh-gia/gv/:id' exact component={ DanhGiaDetail } />
                    {/* Học tập */}
                    <Route path='/giao-vien/hoc-tap/lich-day' exact component={ LichDay } />
                    <Route path='/giao-vien/hoc-tap/diem-danh' exact component={ DangCapNhat } />
                    {/* <Route path='/giao-vien/hoc-tap/diem-danh' exact component={ DiemDanh } />
                    <Route path='/giao-vien/hoc-tap/diem-danh/:id' exact component={ DiemDanhDetai } /> */}
                    <Route path='/giao-vien/hoc-tap/bang-diem' exact component={ DangCapNhat } />
                    {/* <Route path='/giao-vien/hoc-tap/bang-diem' exact component={ BangDiem } />
                    <Route path='/giao-vien/hoc-tap/bang-diem/:id' exact component={ BangDiemLop } />
                    <Route path='/giao-vien/hoc-tap/bang-diem/:lop/sua-diem/:id' exact component={ SuaDiem } /> */}
                    {/* <Route path='/giao-vien/hoc-tap/chi-tiet-diem/:id' exact component={ ChiTietDiem } /> */}
                    {/* Thông tin cá nhân */}
                    <Route path='/giao-vien/tai-khoan/thong-tin' exact component={ Profile } />
                    <Route path='/giao-vien/tai-khoan/doi-mat-khau' exact component={ ChangePass } />
                    <Route component={NotFound} />
                </Switch>
            </div>
            </div>
        </Router>
    )
}

export default GiaoVienPage
