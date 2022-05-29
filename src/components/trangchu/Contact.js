import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineInfoCircle, AiOutlineGlobal } from "react-icons/ai";
import { useFormik } from 'formik';
import * as yup from 'yup';

const Contact = () => {

    const validationSchema = yup.object().shape({
        hoten: yup.string()
        .required("Họ tên không được bỏ trống")
        .min(5, 'Họ tên không được ít hơn 5 ký tự'),
        email: yup.string()
        .required("Email không được bỏ trống")
        .email("Email không đúng dịnh dạng"),
        sodienthoai: yup.number()
        .required("Số điện thoại không được bỏ trống")
        .typeError('Số diện thoại phải là số'),
        loinhan: yup.string()
        .required("Lời nhắn không được bỏ trống")
        .min(10, 'Lời nhắn không được ít hơn 10 ký tự'),
        
    })

    const onSubmit = data => {
        console.log(data);
    }

    const formilk = useFormik({
        initialValues: {hoten: "" , email: "", sodienthoai : "", loinhan: "" },
        onSubmit,
        validationSchema
    })

    return (
        <div className="banner-sm position-relative " style={{marginTop:"90px"}}>
           <div className="container">
                <div className="row d-flex justify-content-center">
                       <div className="col-md-8 col-12">
                            <h4 className="text-center">LIÊN HỆ VỚI CHÚNG TÔI</h4>
                            <p className="divi"></p>
                            <p style={{fontSize: "1.2rem", textAlign: "center"}}> VNA GROUP Luôn sẳn sàng phục vụ khách hàng.</p>
                       </div>
                </div>
                <div className="row my-5">
                    <div className="col-md-4 p-3">
                        <h3 >THÔNG TIN LIÊN HỆ</h3>
                        <p className="my-3">
                            <IoLocationOutline size={20} style={{ marginRight: "10px" }} />
                            Số 162, đường số 2, khu đô thị Vạn Phúc, Hiệp Bình Phước, Thủ Đức, TP. HCM
                        </p>
                        <p className="my-3">
                            <FiPhoneCall size={20} style={{ marginRight: "10px" }} />
                            028 3535 2523
                        </p>
                        <p className="my-3">
                            <AiOutlineInfoCircle size={20} style={{ marginRight: "10px" }} />
                            info@vnagroup.com.vn
                        </p>
                        <p className="my-3">
                            <AiOutlineGlobal size={20} style={{ marginRight: "10px" }} />
                            vnagroup.com.vn
                        </p>
                    </div>
                    <div className="col-md-8">
                        <div className="card shadow mb-3">
                        <form className="card-body" onSubmit={formilk.handleSubmit}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group has-icon-left">
                                        <label htmlFor="hoten">Họ tên</label>
                                        <div className="position-relative">
                                            <input type="text" className="form-control"
                                                placeholder="Nhập họ tên" name="hoten"
                                                value={formilk.values.hoten}
                                                onChange={formilk.handleChange}
                                                id="hoten" />
                                            <div className="form-control-icon">
                                                <i className="bi bi-person"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { formilk.errors.hoten && <small className="text-danger mb-2">{formilk.errors.hoten}</small>}
                                <div className="col-12">
                                    <div className="form-group has-icon-left">
                                        <label htmlFor="email">Email</label>
                                        <div className="position-relative">
                                            <input type="text" className="form-control"
                                                value={formilk.values.email}
                                                onChange={formilk.handleChange}
                                                placeholder="Địa chỉ Email" id="email" name="email" />
                                            <div className="form-control-icon">
                                                <i className="bi bi-envelope"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { formilk.errors.email && <small className="text-danger mb-2">{formilk.errors.email}</small>}
                                <div className="col-12">
                                    <div className="form-group has-icon-left">
                                        <label htmlFor="sodienthoai">Số điện thoại</label>
                                        <div className="position-relative">
                                            <input type="text" className="form-control" name="sodienthoai"
                                            value={formilk.values.sodienthoai}
                                            onChange={formilk.handleChange}
                                            placeholder="Số điện thoại" id="sodienthoai" />
                                            <div className="form-control-icon">
                                                <i className="bi bi-phone"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { formilk.errors.sodienthoai && <small className="text-danger mb-2">{formilk.errors.sodienthoai}</small>}
                                <div className="col-12">
                                    <div className="form-group has-icon-left">
                                        <label htmlFor="loinhan" className="form-label">Lời nhắn</label>
                                        <textarea className="form-control p-3" id="loinhan" name="loinhan"
                                            onChange={formilk.handleChange}
                                            value={formilk.values.loinhan}
                                            rows="3"></textarea>
                                    </div>
                                </div>
                                { formilk.errors.loinhan && <small className="text-danger mb-2">{formilk.errors.loinhan}</small>}
                                <div className="col-12 d-flex justify-content-end">
                                    <button type="submit"
                                        className="btn btn-primary me-1 mb-1">Gửi thư</button>
                                </div>
                            </div>
                        </form>
                        </div>
                      <i>( Chúng tôi sẽ liên hệ lại ngay sau khi nhận được thông tin. Xin chân thành cảm ơn )</i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
