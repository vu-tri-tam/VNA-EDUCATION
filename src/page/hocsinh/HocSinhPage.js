import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// css dashboard
import '../../assets/css/app.css';
// hocsinh component
import Header from '../../components/common/Header';
import SideBar from '../../components/hocsinh/SideBar'
import BangTin from '../../components/common/bangtin/BangTin'
import BaiViet from '../../components/common/bangtin/BaiViet';
import ChangePass from '../../components/common/user/ChangePass'
import Profile from '../../components/common/user/Profile'
import Lichhoc from '../../components/hocsinh/hoctap/LichHoc'
import BangDiem from '../../components/hocsinh/hoctap/BangDiem';
// import DiemDanh from '../../components/hocsinh/hoctap/DiemDanh';
import NotFound from '../error/404';
import ChiTietDiemDanh from '../../components/hocsinh/hoctap/ChiTietDiemDanh';
import ListBaiViet from '../../components/common/bangtin/ListBaiViet';
// Danh gia
import Danhgia from '../../components/hocsinh/danhgia/DanhGia'
import DanhGiaDetail from '../../components/hocsinh/danhgia/DanhGiaDetail'
import ThongBaoDG from '../../components/hocsinh/ThongBaoDG';
import DangCapNhat from '../../components/common/DangCapNhat';

const HocSinhPage = () => {
    return (
        <Router>
            <div id="app">
                <SideBar />
                <div id="main">
                    <Header match="hoc-sinh" />
                    {/* // show alway */}
                    <ThongBaoDG />
                    <Switch>
                        {/* bảng tin  */}
                        <Redirect exact from="/hoc-sinh" to="/hoc-sinh/bang-tin" />
                        <Route path='/hoc-sinh/bang-tin' exact component={BangTin} />
                        <Route path='/hoc-sinh/bang-tin/:catalog' exact component={ListBaiViet} />
                        <Route path='/hoc-sinh/bai-viet/:id' exact component={BaiViet} />
                        {/* học tập */}
                        <Route path='/hoc-sinh/hoc-tap/lich-hoc' exact component={Lichhoc} />
                        <Route path='/hoc-sinh/hoc-tap/bang-diem' exact component={BangDiem} />
                        <Route path='/hoc-sinh/hoc-tap/diem-danh' exact component={DangCapNhat} />
                        <Route path='/hoc-sinh/hoc-tap/chi-tiet-diem-danh/:id' exact component={ChiTietDiemDanh} />
                        {/* đánh giá */}
                        <Route path='/hoc-sinh/danh-gia/gvbm' exact component={Danhgia} />
                        <Route path='/hoc-sinh/danh-gia/gvcn' exact component={Danhgia} />
                        <Route path='/hoc-sinh/danh-gia/gv/:id' exact component={DanhGiaDetail} />
                        {/* tài khoản */}
                        <Route path='/hoc-sinh/tai-khoan/thong-tin' exact component={Profile} />
                        <Route path='/hoc-sinh/tai-khoan/doi-mat-khau' exact component={ChangePass} />
                        <Route path='/hoc-sinh/404' component={NotFound} />
                        <Redirect from='*' to='/hoc-sinh/404' /> 
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default HocSinhPage
