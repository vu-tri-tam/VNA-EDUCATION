import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Sidebar from '../../components/hieutruong/Sidebar';
import '../../assets/css/showTKB.css'
import '../../assets/css/showListStudent.css'
import '../../assets/css/showStudent.css'
import '../../assets/css/showDiemdanh.css'
import '../../assets/css/profile.css'
import '../../assets/css/Main.css'
import Header from '../../components/common/Header';
import ThongKe from '../../components/hieutruong/thongke/Thongke';
import DanhGiaTheoLop from '../../components/hieutruong/xemdanhgia/DanhGiaTheoLop';
import DanhGiaChung from '../../components/hieutruong/xemdanhgia/DanhGiaChung';
import DanhGiaDetail from '../../components/hieutruong/xemdanhgia/DanhGiaDetail';
import Profile from '../../components/common/user/Profile';
import ChangePass from '../../components/common/user/ChangePass';
import NotFound from '../error/404';

const HieuTruongPage = () => {
    return (
        <Router>
            <div id="app">
                <Sidebar />
                <div id="main">
                    <Header match="hieu-truong" />
                    <Switch>
                        <Route path='/hieu-truong' exact component={ThongKe} />
                        {/* Đánh giá */}
                        <Route path='/hieu-truong/xem-danh-gia' exact component={DanhGiaChung} />
                        <Route path='/hieu-truong/xem-danh-gia/lop/:lop' exact component={DanhGiaTheoLop} />
                        <Route path='/hieu-truong/xem-danh-gia/lop/:lop/:id' exact component={DanhGiaDetail} />
                        {/* tài khoản */}
                        <Route path='/hieu-truong/tai-khoan/thong-tin' exact component={Profile} />
                        <Route path='/hieu-truong/tai-khoan/doi-mat-khau' exact component={ChangePass} />
                        <Route path='/hieu-truong/404' component={NotFound} />
                        <Redirect from='*' to='/hieu-truong/404' />    
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default HieuTruongPage;