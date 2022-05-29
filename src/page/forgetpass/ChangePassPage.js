import { useFormik } from 'formik'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import * as yup from 'yup';
import { PasswordApi } from '../../api/auth/PasswordApi';
import { sucAlert } from '../../components/common/CustomAlert'
import img from "../../assets/images/banner.jpg"


const ChangePassPage = () => {
    
    document.title = "Đổi mật khẩu | VNA EDUACTION"
    
    const validationSchema = yup.object().shape({
        newPass: yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(6, 'Mật khẩu không được ít hơn 6 ký tự')
        .max(20, 'Mật khẩu không được lớn hơn 20 ký tự'),
        comNewPass: yup.string()
        .required("Mật khẩu nhập lại không được bỏ trống")
        .oneOf([yup.ref('newPass'), null], 'Mật khẩu nhập lại không khớp')
    })
    
    
    let {token} = useParams()
    
    const onSubmit = data => {    
        token = 1
        PasswordApi.changePass(token,{
            matKhau: data.newPass
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                sucAlert("Đổi mật khẩu thành công")
                .then(() => window.location.href = "/")
            }
        })
    }
    
    const formik = useFormik({
        initialValues: {newPass: '', comNewPass: ''},
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
                        <h2 style={{fontSize: "3rem"}}>Đổi mật khẩu</h2>
                        <p className="auth-subtitle mb-5">Nhập mới mật khẩu của bạn.</p>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group position-relative has-icon-left ">
                                <input type="password" className="form-control form-control-xl" placeholder="Nhập mật khẩu mới" name="newPass"
                                 onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPass}/>
                                <div className="form-control-icon">
                                    <i className="bi bi-shield-lock" />
                                </div>
                            </div>
                             <div className="my-2">
                                {formik.errors.newPass && formik.touched.newPass ? 
                                <small className="text-danger">{formik.errors.newPass}</small> : null}
                            </div>
                            <div className="form-group position-relative has-icon-left">
                                <input type="password" className="form-control form-control-xl" placeholder="Xác nhận mật khẩu mới" name="comNewPass"
                                 onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.comNewPass}/>
                                <div className="form-control-icon">
                                    <i className="bi bi-shield-lock" />
                                </div>
                            </div>
                             <div className="my-2">
                                {formik.errors.comNewPass && formik.touched.comNewPass ? 
                                <small className="text-danger">{formik.errors.comNewPass}</small> : null}
                            </div>
                            <button className="btn btn-primary btn-block btn-lg shadow-lg mt-2" type="submit">Hoàn tất</button>
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

export default ChangePassPage
