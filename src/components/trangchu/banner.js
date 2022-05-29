import React from 'react'
import MainImage from '../../assets/images/banner.jpg';
import {Link } from "react-router-dom"

const banner = () => {
    document.title ="Trang chủ | VNA EDUCATION"

    return (
        <div className="banner-sm position-relative" style={{ marginTop: '56px' }}>
             <img src={MainImage} style={{  objectFit: 'cover' }}
                            className=" w-100" alt="..." />
            <div className="inner-slide text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-10 col-lg-6">
                            <h2 style={{color: "white", letterSpacing: "5px"}}>CÔNG TY CP CÔNG NGHỆ QUỐC TẾ VNA GROUP</h2>
                            <p style={{lineHeight : "28px"}}>VNA GROUP là công ty công nghệ với đội ngũ trẻ nhiệt huyết và tài năng, 
                            mong muốn mang đến các giải pháp chuyển đổi số chất lượng và hiệu quả cao.</p>
                            <Link  className="btn" to="/ve-chung-toi"
                            style={{backgroundColor: "rgb(51 65 117)", color: "white"}}>Xem thêm</Link>
                        </div>
                        <div className="col col-md-2 col-lg-6"></div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default banner
