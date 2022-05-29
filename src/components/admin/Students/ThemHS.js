import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
// import { v4 as uuid } from 'uuid';
import { Formik, Form, FastField, Field } from 'formik';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import '../css/ThemGV.css';
import InputField from '../customFields/InputField';
import { useHistory } from 'react-router-dom';
import nguoi_dung from '../../../api/NguoiDungApi';

const AddHS = () => {
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
        maND: '',
        hoTen: '',
        lopHoc: '',
        soDienThoai: '',
        emailND: '',
        matKhau: '',
        gioiTinh: '',
        ngaySinh: '',
        noiSinh: '',
        danToc: '',
        quocTich: '',
        cccd: '',
        ngayCap: '',
        noiCap: '',
        ngayNhapHoc: '',
        diaChi: '',
        dangHoatDong: true
    };
    const validationSchema = Yup.object().shape({
        maND: Yup.string().required('Vui lòng nhập mã người dùng'),
        matKhau: Yup.string().required('Vui lòng nhập password'),
        hoTen: Yup.string().required('Vui lòng nhập họ tên'),
        lopHoc: Yup.string().required('Vui lòng nhập Lớp'),
        soDienThoai: Yup.string().required('vui lòng nhập số điện thoại'),
        gioiTinh: Yup.string().required('Vui lòng chọn giới tính'),
        emailND: Yup.string().required('Vui lòng nhập Email'),
        ngaySinh: Yup.string().required('Vui lòng nhập ngày sinh'),
        noiSinh: Yup.string().required('vui lòng nhập nơi sinh'),
        danToc: Yup.string().required('Vui lòng nhập Dân tộc'),
        quocTich: Yup.string().required('Vui lòng nhập quốc tịch'),
        cccd: Yup.string().required('Vui lòng nhập CMND/CCCD/PASSPORT'),
        ngayCap: Yup.string().required('Vui lòng nhập ngày cấp '),
        noiCap: Yup.string().required('Vui lòng nhập nơi cấp'),
        diaChi: Yup.string().required('Vui lòng nhập địa chỉ'),
        ngayNhapHoc: Yup.string().required('Vui lòng nhập ngày nhập học'),
        // conCai: Yup.string().required('Vui lòng nhập tên phụ huynh'),
        dangHoatDong: Yup.boolean().required('Vui lòng nhập trạng thái')
    });
    const history = useHistory();
    const [userAdd, setUserAdd] = useState([]);
    const [selectLH, setselectLH] = useState([])
    useEffect(() => {
        // onSubmit();
        getSelectOption()
    }, []);
    const onChange = (e) => {
        setUserAdd({ ...userAdd, [e.target.name]: e.target.value })
    }
    //add HS
    const onSubmit = async (data) => {
        data.dangHoatDong = JSON.parse(data.dangHoatDong);
        // await nguoi_dung.addHS({ ...data });
        // console.log(data,1212122)
        nguoi_dung.addHS({ ...data }).then((response) => {
            // const userId = response?.data?._id;
            // const classId = data?.lopHoc;
            // nguoi_dung.JoinClass(userId, classId);
        })
        history.push('/quan-ly/hoc-sinh/danh-sach');
        // console.log(data.id);
    }
    const getSelectOption = async () => {
        const res = await nguoi_dung.getSelect();
        // console.log(res.data);
        setselectLH(res.data)
    }
    return (
        <>
            <TitleBreadcrumb title="Thêm học sinh" pathHome="quan-ly" />
            <div className="page-title">
                <div className="row">
                </div>
            </div>
            <section className="section">
                <div className="card">
                    <div className="card-body">
                        <Formik
                            validationSchema={validationSchema}
                            onSubmit={(data) => onSubmit(data)}
                            initialValues={initialValues}
                        >
                            {formikProps => {
                                /* const { values, touched } = formikProps;
                                console.log({ values, error, touched }); */
                                return (
                                    <Form>
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
                                                <input type="file" id="fileUpload" onChange={uploadImage} />
                                                </>
                                            )}
                                        </div>
                                        {imgPreview && (<button className="upload-img-button" onClick={()=> setImgPreview(null)}>Xóa ảnh</button>)}
                                    </div> */}
                                        <div className="row input-group">
                                            <div className="col-sm p-5">
                                                <FastField component={InputField} onChange={(e) => onChange(e)} name="maND" placeholder="Mã học sinh" />
                                                <FastField component={InputField} name="hoTen" placeholder="Họ và tên" />
                                                {/* <FastField component={InputField} name="lopHoc" placeholder="Lớp" /> */}
                                                <Field as="select" name="lopHoc" className="form-group-table form-select mb-3">
                                                    <option>Lớp học</option>
                                                    {selectLH.map((sl, idx) => (
                                                        <option key={idx + 1} value={sl.maLH}>{sl.maLH}</option>
                                                    ))}
                                                </Field>
                                                <FastField component={InputField} name="soDienThoai" placeholder="Số điện thoại" />
                                                <FastField component={InputField} name="emailND" placeholder="Địa chỉ email" />
                                                <FastField component={InputField} name="matKhau" placeholder="Mật khẩu" />
                                                <Field name="gioiTinh" as="select" className="form-group-table form-select mb-3 ">
                                                    <option>Giới tính</option>
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                </Field>
                                                {/* <div className="auth-radio">
                                                <label>Giới tính: </label>
                                                <div className="form-check form-check-inline">
                                                    <FastField className="auth-check" type="radio" name="gioiTinh" checked={true} value="1" />
                                                    <label>Nam</label>
                                                    <FastField className="auth-check" type="radio" name="gioiTinh" value="2"/>
                                                    <label>Nữ</label>
                                                </div>
                                            </div> */}
                                                <FastField component={InputField} name="ngaySinh" placeholder="Ngày sinh" />
                                                <FastField component={InputField} name="noiSinh" placeholder="Nơi sinh" />

                                            </div>
                                            <div className="col-sm p-5">
                                                <FastField component={InputField} name="quocTich" placeholder="Quốc tịch" />
                                                <FastField component={InputField} name="danToc" placeholder="Dân tộc" />
                                                <FastField component={InputField} name="cccd" placeholder="CMND/CCCD/PASSPORT" />
                                                <FastField component={InputField} name="ngayCap" placeholder="Ngày cấp" />
                                                <FastField component={InputField} name="noiCap" placeholder="Nơi cấp" />
                                                <FastField component={InputField} name="diaChi" placeholder="Địa chỉ" />
                                                <FastField component={InputField} name="ngayNhapHoc" placeholder="Ngày nhập học" />
                                                {/* <FastField component={InputField} name="phuHuynh" placeholder="Họ tên Ba/Mẹ (Cha/Má)" /> */}
                                                <Field className="form-group-table form-select" as="select" name="dangHoatDong" disabled={true} placeholder="Trạng thái">
                                                    <option >Trạng thái</option>
                                                    <option value={true}>Đang học </option>
                                                    <option value={false}>Nghĩ học</option>
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="auth-button-footer">
                                            <button type="reset" className="btn btn-danger mr-5">Xóa</button>
                                            <button type="submit" name="Submit" className="btn btn-primary ">Lưu</button>
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
AddHS.propTypes = {
    onSubmit: PropTypes.func
};
AddHS.defaultProps = {
    onSubmit: null,
}

export default AddHS;