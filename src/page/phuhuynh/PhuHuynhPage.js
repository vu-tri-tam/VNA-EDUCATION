import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Sidebar from '../../components/phuhuynh/Sidebar'
// import '../../assets/css/showTKB.css'
import '../../assets/css/showListStudent.css'
import '../../assets/css/showStudent.css'
import '../../assets/css/showDiemdanh.css'
import '../../assets/css/profile.css'
import '../../assets/css/Main.css'

import Header from '../../components/common/Header';
import BangTin from '../../components/common/bangtin/BangTin'
import BaiViet from '../../components/common/bangtin/BaiViet'
import DanhGiaGVCN from '../../components/phuhuynh/DanhGia/DanhGiaGVCN';
import DanhSachGVCN from '../../components/phuhuynh/DanhGia/DanhSachGVCN';

import MonHoc from '../../components/phuhuynh/DanhGia/MonHoc';
import XemDanhGia from '../../components/phuhuynh/DanhGia/XemDanhGia';
import XemDanhGiaDetail from '../../components/phuhuynh/DanhGia/XemDanhGiaDetail';
import Danhgia from '../../components/phuhuynh/DanhGia/DanhGia'
import Lichhoc from '../../components/phuhuynh/DuLieuHS/DanhSachHocSinh'
import DiemHS from '../../components/phuhuynh/DuLieuHS/DiemHS';
import FormDiemDanh from '../../components/phuhuynh/DuLieuHS/FormDiemDanh'
import ChiTietBuoiNghi from '../../components/phuhuynh/DuLieuHS/ChiTietBuoiNghi';
import ThoiKhoaBieu from '../../components/phuhuynh/DuLieuHS/ThoiKhoaBieu'

import NotFound from '../error/404';
import Profile from '../../components/common/user/Profile';
import ChangePass from '../../components/common/user/ChangePass';

const PhuHuynhPage = () => {

  return (
    <Router>
      <div id="app">
        <Sidebar />
        <div id="main">
          {/* <Navbar /> */}
          <Header match="phu-huynh" />
          <Switch>
            {/* bảng tin */}
            <Redirect exact from="/phu-huynh" to="/phu-huynh/bang-tin" />
            <Route path='/phu-huynh/bang-tin' exact component={BangTin} />
            <Route path='/phu-huynh/bai-viet/:id' exact component={BaiViet} />
            {/* đánh giá */}
            <Route path='/phu-huynh/danh-gia/danh-gia-giao-vien-chu-nhiem' exact component={DanhSachGVCN} />
            <Route path='/phu-huynh/danh-gia/danh-gia-giao-vien-chu-nhiem/:id' exact component={DanhGiaGVCN} />
            <Route path='/phu-huynh/danh-gia/xem-thu-hang-danh-gia' exact component={MonHoc} />
            <Route path='/phu-huynh/danh-gia/xem-thu-hang-danh-gia/danh-sach-giao-vien-bo-mon/:id' exact component={XemDanhGia} />
            <Route path='/phu-huynh/danh-gia/xem-thu-hang-danh-gia/danh-sach-giao-vien-bo-mon/:id/:idgv' exact component={XemDanhGiaDetail} />
            {/* học sinh */}
            <Route path='/phu-huynh/quan-ly-hoc-sinh/danh-gia-hoc-sinh' exact component={Danhgia} />
            <Route path='/phu-huynh/quan-ly-hoc-sinh/danh-sach-hoc-sinh' exact component={Lichhoc} />
            <Route path='/phu-huynh/quan-ly-hoc-sinh/danh-sach-hoc-sinh/chi-tiet-diem-hoc-sinh' exact component={DiemHS} />
            <Route path='/phu-huynh/quan-ly-hoc-sinh/danh-sach-hoc-sinh/Diem-danh-hoc-sinh' exact component={FormDiemDanh} />
            <Route path='/phu-huynh/quan-ly-hoc-sinh/danh-sach-hoc-sinh/Diem-danh-hoc-sinh/chi-tiet-buoi-nghi' exact component={ChiTietBuoiNghi} />
            <Route path='/phu-huynh/quan-ly-hoc-sinh/danh-sach-hoc-sinh/Thoi-khoa-bieu' exact component={ThoiKhoaBieu} />

            <Route path='/phu-huynh/tai-khoan/thong-tin' exact component={Profile} />
            <Route path='/phu-huynh/tai-khoan/doi-mat-khau' exact component={ChangePass} />
            <Route exact component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default PhuHuynhPage
