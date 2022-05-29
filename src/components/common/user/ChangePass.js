import React from 'react'
import "./changepass.css"
import * as yup from 'yup';
import { PasswordApi } from '../../../api/auth/PasswordApi';
import { errAlert, sucAlert } from '../CustomAlert'
import { useFormik } from 'formik';
import { getIdUser } from '../../../auth/AuthFun';
// import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';


const ChangePass = () => {

    document.title = "Đổi mật khẩu | VNA EDUACTION"
    
    // const his = useHistory()
    const validationSchema = yup.object().shape({
        oldPass: yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(6, 'Mật khẩu không được ít hơn 6 ký tự')
        .max(20, 'Mật khẩu không được lớn hơn 20 ký tự'),
        newPass: yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(6, 'Mật khẩu không được ít hơn 6 ký tự')
        .max(20, 'Mật khẩu không được lớn hơn 20 ký tự'),
        comNewPass: yup.string()
        .required("Mật khẩu nhập lại không được bỏ trống")
        .oneOf([yup.ref('newPass'), null], 'Mật khẩu nhập lại không khớp')
    })
    
    const onSubmit = data => {    
        let id = getIdUser()
        PasswordApi.changePass({
            idUser : id,
            oldPass : data.oldPass,
            newPass : data.newPass,
        }).then((res) => {
            if (res.data.checkOK === true) {
                sucAlert(`${res.data.msg}`)
                .then(() => {
                    errAlert(`Vui lòng đăng nhập lại`)
                    .then(() => {
                        Cookies.remove('_token')
                        window.location.href ="/dang-nhap"
                    })
                })
            } else {
                errAlert(`${res.data.msg}`)
            }
        })
    }
    
    const formik = useFormik({
        initialValues: {oldPass: '',newPass: '', comNewPass: ''},
        onSubmit ,
        validationSchema
    })

    return (
        <>
         <div className="page-heading">
                <section className="section ">
                    <div className="card shadow-sm mb-3">
                        <div className="card-body">
                            <div className="row h-100">
                                <div className="col-lg-6 col-12 w-80 mx-auto p-3 font-size-full">
                                        <h1 className="auth-title h3">Chào mừng đến với trang thay đổi mật khẩu</h1>
                                        <p className="auth-subtitle mb-2">
                                            Nhập mật khẩu của bạn và chúng tôi sẽ cài cho bạn mật khẩu mới.</p>
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="form-group position-relative has-icon-left mt-2">
                                                <input type="password" className="form-control form-control-xl" placeholder="Mật khẩu cũ"
                                                 name="oldPass" onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                                 value={formik.values.oldPass}  />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-key" />
                                                </div>
                                            </div>
                                            {formik.errors.oldPass && formik.touched.oldPass  ? 
                                            <small className="text-danger">{formik.errors.oldPass}</small> : null}

                                            <div className="form-group position-relative has-icon-left mt-2">
                                                <input type="password" className="form-control form-control-xl" placeholder="Mật khẩu mới"
                                                 name="newPass" onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                                 value={formik.values.newPass} />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-shield-lock" />
                                                </div>
                                            </div>
                                            {formik.errors.newPass && formik.touched.newPass ? 
                                            <small className="text-danger">{formik.errors.newPass}</small> : null}

                                            <div className="form-group position-relative has-icon-left mt-2">
                                                <input type="password" className="form-control form-control-xl" placeholder="Xác nhận mật khẩu mới"
                                                 name="comNewPass" onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                                 value={formik.values.comNewPass} />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-shield-lock" />
                                                </div>
                                            </div>
                                            {formik.errors.comNewPass && formik.touched.comNewPass ? 
                                            <small className="text-danger">{formik.errors.comNewPass}</small> : null}

                                            <button className="btn btn-primary btn-block btn-lg shadow-lg mt-2" type="submit">Hoàn tất</button>
                                        </form>
                                      
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>   
        </>
    )
}

export default ChangePass