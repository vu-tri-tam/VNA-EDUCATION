import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
// css & bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js';
import './assets/vendors/iconly/bold.css';
import './assets/vendors/bootstrap-icons/bootstrap-icons.css';
import './assets/vendors/perfect-scrollbar/perfect-scrollbar.css';
import './assets/css/style.css';

// Route Custom
import PrivateRoute from './auth/PrivateRoute'
import BackToPrivateRoute from './auth/BackToPrivateRoute'

// page
import TrangChuPage from './page/trangchu/TrangChuPage'
import VeChungToiPage from './page/trangchu/VeChungToiPage';
import LienHePage from './page/trangchu/LienHePage';
// 
import HocSinhPage from './page/hocsinh/HocSinhPage'
import PhuHuynhPage from './page/phuhuynh/PhuHuynhPage';
import GiaoVienPage from './page/giaovien/GiaoVienPage';
import QuanLyPage from './page/admin/QuanLyPage';
import HieuTruongPage from './page/hieutruong/HieuTruongPage';
import DangNhapPage from './page/dangnhap/DangNhapPage'
import ForgetPassPage from './page/forgetpass/ForgetPassPage';
import ChangePassPage from './page/forgetpass/ChangePassPage';
import notFound from './page/error/404'


function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* home page layout & chuyển trang */}
          <Redirect exact from="/" to="/trang-chu" />
          <BackToPrivateRoute path="/trang-chu" component={TrangChuPage} />
          <BackToPrivateRoute path="/ve-chung-toi" exact component={VeChungToiPage} />
          <BackToPrivateRoute path="/lien-he" exact component={LienHePage} />
          {/* cliend hoc sinh */}
          <PrivateRoute path='/hoc-sinh' component={HocSinhPage} />
          {/* cliend giao vien */}
          <PrivateRoute path='/giao-vien' component={GiaoVienPage} />
          {/* cliend phu huynh */}
          <PrivateRoute path='/phu-huynh' component={PhuHuynhPage} />
          {/*cliend hiệu trưởng */}
          <PrivateRoute path='/hieu-truong' component={HieuTruongPage} />
          {/* admin quản trị */}
          <PrivateRoute path='/quan-ly' component={QuanLyPage} />
          {/* login layout */}
          <BackToPrivateRoute path='/dang-nhap' component={DangNhapPage} />
          <Route path='/quen-mat-khau' component={ForgetPassPage} />
          <Route path='/doi-mat-khau/:token' component={ChangePassPage} />
          <Route component={notFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
