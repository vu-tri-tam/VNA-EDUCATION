import { useFormik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import LoginApi from '../../api/auth/LoginApi'
import { errAlert } from '../../components/common/CustomAlert'
import './DangNhap.css'
import * as yup from 'yup';
import { StoreAndRedirect } from '../../auth/AuthFun'
import img from "../../assets/images/banner.jpg"

const Login = () => {

    document.title = "Đăng nhập | VNA EDUACTION"
    
    const validationSchema = yup.object().shape({
        user: yup.string()
        .required("Tài khoản không được bỏ trống")
        .min(5, 'Tài khoản không được ít hơn 5 ký tự')
        .max(25, 'Tài khoản không được lớn hơn 20 ký tự'),
        pass: yup.string()
        .required("Mật khẩu nhập lại không được bỏ trống")
        .min(6, 'Mật khẩu không được ít hơn 6 ký tự')
        .max(20, 'Mật khẩu không được lớn hơn 20 ký tự')
    })

    const onSubmit = data => {
        let user = data.user.toUpperCase().trim()
        let pass = data.pass.trim()

        LoginApi.login(
            {
                username: user,
                password : pass
            })
            .then(res => {
                // console.log(res.data);
                if (res.data.resOK && res.data.id !== null && res.data.dangHD) {
                    let id = res.data.id
                    if (!data.remember) {        
                        StoreAndRedirect(user,id)
                    } else StoreAndRedirect(user,id,true)
                } else if (!res.data.dangHD) {
                    return errAlert("Tài khoản này đã bị khóa !")
                } else {
                    return errAlert("Tài khoản hoặc mật khẩu sai !")
                }
            })
    }   

    
    const formilk = useFormik({
        initialValues: {user: "" , pass: "", remember: false},
        onSubmit,
        validationSchema
    })

    return (
        <>
            <div id="auth">
                <div className="row h-100">
                    <div className="col-lg-6 col-12">
                        <div id="auth-left">
                            <div className="auth-logo " >
                                <Link to="/" className="d-flex align-items-center">
                                    <img src="icon.png" alt="Logo"/>
                                    <span style={{fontSize: "2rem" , marginLeft: "1rem"}}>VNA EDUCATION</span>
                                </Link>
                            </div>
                            <h2 style={{fontSize: "3rem"}}>Đăng nhập</h2>
                            <p className="auth-subtitle mb-5">Vui lòng đăng nhập để sử dụng các tính năng của chúng tôi</p>

                            <form onSubmit={formilk.handleSubmit}>
                                <div className="form-group position-relative has-icon-left ">
                                    <input type="text" className="form-control form-control-xl" 
                                    placeholder="Tài khoản" name="user" value={formilk.values.user} 
                                    onBlur={formilk.handleBlur} onChange={formilk.handleChange}  />
                                    <div className="form-control-icon">
                                        <i className="bi bi-person"></i>
                                    </div>
                                </div>
                                <div className="my-2">
                                    {formilk.errors.user && <small className="text-danger">{formilk.errors.user}</small>}
                                </div>
                                <div className="form-group position-relative has-icon-left">
                                    <input type="password" className="form-control form-control-xl" 
                                    placeholder="Mật khẩu" name="pass" value={formilk.values.pass} 
                                    onBlur={formilk.handleBlur} onChange={formilk.handleChange} />
                                    <div className="form-control-icon">
                                        <i className="bi bi-shield-lock"></i>
                                    </div>
                                </div>
                                <div className="my-2">
                                    {formilk.errors.pass && <small className="text-danger">{formilk.errors.pass}</small>}
                                </div>
                                <div className="form-check form-check-lg d-flex align-items-end">
                                    <input className="form-check-input me-2" type="checkbox"
                                    onChange={formilk.handleChange}
                                    id="remember" name="remember" />
                                        <label className="form-check-label text-gray-600" htmlFor="remember">
                                            Ghi nhớ đăng nhập
                                        </label>
                                    </div>
                                    <button className="btn btn-primary btn-block btn-lg shadow-lg mt-5" type="submit">Đăng nhập</button>
                            </form>
                            <div className="text-center mt-5 text-lg fs-4">
                                <p>
                                    <Link className="font-bold" to="/quen-mat-khau" > Quên mật khẩu?</Link>.
                                </p>
                            </div>
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

export default Login
