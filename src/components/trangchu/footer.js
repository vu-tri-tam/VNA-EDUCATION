import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineInfoCircle, AiOutlineGlobal, AiFillFacebook, AiFillInstagram, AiFillSkype, AiFillYoutube } from "react-icons/ai";

const footer = () => {
    return (
        <>
            {/* <!-- OPEN FOOTER --> */}
            <div className="w-100" style={{ minHeight: "400px", backgroundColor: "rgb(51 65 117)"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-12 col-xs text-white py-3">
                            <img src="https://vnagroup.com.vn/wp-content/uploads/elementor/thumbs/Logo-VNA-1-p4vwbdksrgqadbir0znzg2i1hcw1oagkiyhgdkb0n4.png"
                                alt="" className="d-block mt-5" style={{ height: "65px" }} />
                            <h5 className="mt-3 w-75"  style={{color: "white" }}>CÔNG TY CỔ PHẦN CÔNG NGHỆ QUỐC TẾ VNA</h5>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs text-white py-3">
                            <h3 className="mt-5"  style={{color: "white"}}>THÔNG TIN LIÊN HỆ</h3>
                            <p className="mt-3">
                                <IoLocationOutline size={20} style={{ marginRight: "10px" }} />
                                Số 162, đường số 2, khu đô thị Vạn Phúc, Hiệp Bình Phước, Thủ Đức, TP. HCM
                            </p>
                            <p>
                                <FiPhoneCall size={20} style={{ marginRight: "10px" }} />
                                028 3535 2523
                            </p>
                            <p>
                                <AiOutlineInfoCircle size={20} style={{ marginRight: "10px" }} />
                                info@vnagroup.com.vn
                            </p>
                            <p>
                                <AiOutlineGlobal size={20} style={{ marginRight: "10px" }} />
                                vnagroup.com.vn
                            </p>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs text-white py-3">
                            <h3 className="mt-5"  style={{color: "white"}}>FANPAGE</h3>

                            <p>
                                <AiFillFacebook size={20} style={{ marginRight: "10px" }} />
                                Facebook
                            </p>

                            <p>
                                <AiFillInstagram size={20} style={{ marginRight: "10px" }} />
                                Instagram
                            </p>

                            <p>
                                <AiFillSkype size={20} style={{ marginRight: "10px" }} />
                                Skype
                            </p>

                            <p>
                                <AiFillYoutube size={20} style={{ marginRight: "10px" }} />
                                Youtube
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- CLOSE CAROUSEL -->    */}
        </>
    )
}

export default footer
