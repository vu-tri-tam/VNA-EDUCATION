import { useFormik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup';
import img from "../../assets/images/banner.jpg"

const validationSchema = yup.object().shape({
    email: yup.string()
    .email("Email này không hợp lệ")
    .required("email không được bỏ trống")
})

const onSubmit = data => {
    console.log(data);
}

const ForgetPassPage = () => {

    document.title = "Quên mật khẩu | VNA EDUACTION"

    const formik = useFormik({
        initialValues: {email: ''},
        onSubmit ,
        validationSchema
    })

    return (
        <>
        <div id="auth">
            <div className="row h-100">
                <div className="col-lg-6 col-12">
                    <div id="auth-left">
                        <div className="auth-logo">
                            <Link to="/" className="d-flex align-items-center">
                                <img src="icon.png" alt="Logo"/>
                                <span style={{fontSize: "2rem" , marginLeft: "1rem"}}>VNA EDUCATION</span>
                            </Link>
                        </div>
                        <h2 style={{fontSize: "3rem"}}>Quên mật khẩu</h2>
                        <p className="auth-subtitle mb-5">Nhập email của bạn và chúng tôi sẽ gửi cho bạn liên kết đặt lại mật khẩu.</p>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group position-relative has-icon-left mb-1">
                                <input type="text" className="form-control form-control-xl" name="email" placeholder="Tài khoản email"
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                value={formik.values.email} />
                                <div className="form-control-icon">
                                    <i className="bi bi-envelope"></i>
                                </div>
                            </div>
                            <div className="my-2">
                                {formik.errors.email && formik.touched.email ? 
                                <small className="text-danger">{formik.errors.email}</small> : null}
                            </div>
                            <button className="btn btn-primary btn-block btn-lg shadow-lg mt-1" type="submit">Gửi</button>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6 d-none d-lg-block">
                    <div id="auth-right">
                        <img src={img} alt="" className="bannerLogin" />
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default ForgetPassPage
