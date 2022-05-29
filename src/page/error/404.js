import React from 'react'
import { useHistory } from 'react-router-dom'
import Img404 from '../../assets/images/samples/error-404.png'

const NotFound = () => {
    let history = useHistory();
    return (
        <div className="col-md-8 col-12 offset-md-2 img-errorx position-relative">
            <img className="" src={Img404} alt="Not Found" />
            <div className="text-center position-absolute w-100" style={{marginTop :"410px"}}>
                <h1 className="error-title">LỖI KHÔNG TIM THẤY</h1>
                <p className='fs-5 text-gray-600'>Trang bạn đang tìm hiện không tồn tại.</p>
                <button  onClick={() => history.goBack()} className="btn btn-lg btn-outline-primary mt-3">Trở về</button>
            </div>
        </div>
    )
}

export default NotFound
