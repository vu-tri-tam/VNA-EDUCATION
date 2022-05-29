import React from 'react'
import Logo from '../../assets/images/icon.png'
import {Link} from 'react-router-dom'
const navbar = () => {
    return (
        <div>
            {/* <!-- OPEN NAVBAR --> */}
            <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm py-2" style={{backgroundColor: "white"}}>
                <div className="container">
                    <a className="navbar-brand" href="/trang-chu">
                        <img src={Logo} alt="Logo" />
                        <small style={{fontSize: "1.1rem", marginLeft: "10px"}}>VNA EDUCATION</small>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav" style={{ justifyContent: 'flex-end' }}>
                        <ul className="navbar-nav">
                            <li className="nav-item ms-2">
                                <Link className="nav-link active" to="/trang-chu">Trang chủ</Link>
                            </li>
                            <li className="nav-item ms-2">
                                <Link className="nav-link active" to="/ve-chung-toi">Về chúng tôi</Link>
                            </li>
                            <li className="nav-item ms-2">
                                <Link className="nav-link active" to="/lien-he">Liên hệ</Link>
                            </li>
                            <li className="nav-item ms-2">
                                <a href="/dang-nhap" className="btn btn-primary"  >Đăng nhập</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            {/* <!-- CLOSE NAVBAR --> */}
        </div>
    )
}

export default navbar
