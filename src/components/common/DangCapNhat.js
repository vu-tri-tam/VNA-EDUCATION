import React from 'react'
import { useHistory } from 'react-router-dom'
import Img from "../../assets/images/11104.png"
const DangCapNhat = () => {
    const history = useHistory()
    return (
        <div className="col-md-8 col-12 offset-md-2 img-errorx position-relative">
            <img className="" src={Img} alt="Not Found" />
            <div className="text-center position-absolute w-100" style={{marginTop :"410px"}}>
                <h3 className="error-title">NỘI DUNG CHƯA ĐƯỢC CẬP NHẬT</h3>
                <p className='fs-5 text-gray-600'>Trang bạn đang tìm hiện chưa có nội dung.</p>
                <button  onClick={() => history.goBack()} className="btn btn-lg btn-outline-primary mt-3">Trở về</button>
            </div>
        </div>
    )
}

export default DangCapNhat
