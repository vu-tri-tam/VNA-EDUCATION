import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, FastField, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import '../css/ThemGV.css';
import InputField from '../customFields/InputField';
import nguoi_dung from '../../../api/NguoiDungApi';

const AddGV=() => {
    // const [imgPreview, setImgPreview] = useState(null);
    // const [error, setError] = useState(false);
    
    // const uploadImage = (e) => {
    //     const formData = e.target.files[0];
    //     const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    //     if (formData && ALLOWED_TYPES.includes(formData.type)) {
    //         let reader = new FileReader();
    //         reader.onloadend = () => {
    //             setImgPreview(reader.result)
    //         }
    //         reader.readAsDataURL(formData);
    //     } else {
    //         setError(true)
    //     }
    // };
    const initialValues = {
        // id: '',
        maND: '',
        hoTen: '',
        soDienThoai: '',
        emailND: '',
        matKhau: '',
        gioiTinh: '',
        ngaySinh: '',
        noiSinh: '',
        danToc: '',
        quocTich:'',
        cccd: '',
        ngayCap: '',
        noiCap:'',
        diaChi: '',
        chucVu  : '',
        tDCM: '',
        hopDong: '',
        dangHoatDong: false
    }
    const validationSchema = Yup.object().shape({
        maND: Yup.string().required('Vui lòng nhập mã người dùng'),
        matKhau: Yup.string()
            .required('Vui lòng nhập password')
            .min(6, 'Mật khẩu không được ít hơn 6 ký tự')
            .max(20, 'Mật khẩu không được lớn hơn 20 ký tự'),
        hoTen: Yup.string().required('Vui lòng nhập họ tên'),
        soDienThoai: Yup.string().required('vui lòng nhập số điện thoại'),
        emailND: Yup.string().email('Email phải đúng định dạng example@gmail.com').required('Vui lòng nhập Email'),
        ngaySinh: Yup.string().required('Vui lòng nhập ngày sinh'),
        noiSinh: Yup.string().required('vui lòng nhập nơi sinh'),
        danToc: Yup.string().required('Vui lòng nhập Dân tộc'),
        quocTich: Yup.string().required('Vui lòng nhập quốc tịch'),
        cccd: Yup.string().required('Vui lòng nhập CMND/CCCD/PASSPORT'),
        ngayCap: Yup.string().required('Vui lòng nhập ngày cấp '),
        noiCap: Yup.string().required('Vui lòng nhập nơi cấp '),
        diaChi: Yup.string().required('Vui lòng nhập địa chỉ'),
        chucVu  : Yup.string().required('Vui lòng nhập Chức vụ'),
        tDCM: Yup.string().required('Vui lòng nhập Trình độ chuyên môn'),
        hopDong: Yup.string().required('Vui lòng nhập hình thức hợp đồng'),
        dangHoatDong :Yup.boolean().required('Vui lòng nhập trạng thái')
    });
    const history = useHistory();
    const [userAdd, setUserAdd] = useState([]);
    useEffect(() => {
        // onSubmit()
        // getSelectOption()
    },[])
    const onChange = (e) => {
        setUserAdd({ ...userAdd, [e.target.name]: e.target.value })
    }
    //Add GV
    const onSubmit = async (data) => {
        data.dangHoatDong = JSON.parse(data.dangHoatDong);  
        await nguoi_dung.addGV({ ...data });
        history.push('/quan-ly/giao-vien/danh-sach')
    }
         
    return (
        <>
            <TitleBreadcrumb title="Thêm giáo viên" pathHome="quan-ly" />
            <div className="page-title">
                <div className="row">
                </div>
            </div>
            <section className="section">
                <div className="card">
                    <div className="card-body">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(data)=>{onSubmit(data)}}
                        >
                            {formikProps => {
                                /* const { values, touched } = formikProps; */
                                return(
                                    <Form >
                                        {/* <div className="card-box-img card-box text-center">
                                            {error && <p className="errorMsg">Chọn file ảnh png, jpeg, jpg</p>}
                                            <div
                                                className="imgPreview"
                                                style={{
                                                    background: imgPreview
                                                        ? `url("${imgPreview}") no-repeat center/cover`
                                                        : "#d8dff7"
                                                    }}
                                            >
                                                {!imgPreview && (
                                                    <>
                                                    <p>Thêm ảnh đại diện</p>
                                                    <label htmlFor="fileUpload" className="customFileUpload ">Chọn ảnh</label>
                                                    <input name="hinhAnh" type="file" id="fileUpload" onChange={uploadImage} />
                                                    </>
                                                )}
                                            </div>
                                            {imgPreview && (<button className="upload-img-button" onClick={()=> setImgPreview(null)}>Xóa ảnh</button>)}
                                        </div> */}
                                        <div className="row input-group">
                                            <div className="col-sm p-5">
                                                <FastField component={InputField} onChange={(e)=>onChange(e)} name="maND" placeholder="Mã giáo viên"/>
                                                <FastField component={InputField} name="hoTen"  placeholder="Họ và tên" />
                                                <FastField component={InputField} name="soDienThoai" placeholder="Số điện thoại" />
                                                <FastField component={InputField} name="emailND" placeholder="Địa chỉ email" />
                                                <FastField component={InputField} name="matKhau"  placeholder="Mật khẩu" />
                                                <Field name="gioiTinh" as="select" className="form-group-table form-select mb-3 ">
                                                    <option>Giới tính</option>
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                </Field>
                                                <FastField component={InputField} name="ngaySinh"  placeholder="Ngày sinh" />
                                                <FastField component={InputField} name="noiSinh"  placeholder="Nơi sinh" />
                                                <FastField component={InputField} name="quocTich" placeholder="Quốc tịch" />                                               
                                            </div>
                                            <div className="col-sm p-5">
                                                <FastField component={InputField} name="danToc"  placeholder="Dân tộc" />    
                                                <FastField component={InputField} name="cccd"  placeholder="CMND/CCCD/PASSPORT" />
                                                <FastField component={InputField} name="ngayCap" placeholder="Ngày cấp" />
                                                <FastField component={InputField} name="noiCap" placeholder="Nơi cấp"/>
                                                <FastField component={InputField} name="diaChi"  placeholder="Địa chỉ" />
                                                <FastField component={InputField} name="chucVu"  placeholder="Chức cụ" />
                                                <FastField component={InputField} name="tDCM"  placeholder="Trình độ chuyên môn" />
                                                <FastField component={InputField} name="hopDong"  placeholder="Hình thức hợp đồng" />
                                                <Field as="select" name="dangHoatDong" className="form-group-table form-select mb-3">
                                                    <option>Trạng thái</option>
                                                    <option value={true}>Đang làm việc</option>
                                                    <option value={false}>Nghỉ việc</option>
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="auth-button-footer">
                                            <button type="reset" className="btn btn-danger mr-5">Xóa</button>
                                            <button type="submit" className="btn btn-primary ">Lưu</button>
                                        </div>
                                    </Form>
                                )
                         }}
                        </Formik>
                    </div>
                </div>
            </section>
        </>
    )
}
AddGV.propTypes = {
    onSubmit: PropTypes.func,
}
AddGV.defaultProps = {
    onSubmit: null,
}

export default AddGV;