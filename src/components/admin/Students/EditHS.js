import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BackBtn from '../../common/BackBtn';
import { Formik, Form, FastField, Field } from 'formik';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import '../css/ThemGV.css';
// import {sucAdd, errAdd} from '../../common/CustomAlert';
import InputField from '../customFields/InputField';
import { useHistory, useParams } from 'react-router-dom';
import nguoi_dung from '../../../api/NguoiDungApi';

const AddGV = (props) => {
    // const [imgPreview, setImgPreview] = useState(null);
    // const [error, setError] = useState(false);
    const [userAdd, setUserAdd] = useState();

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
    let initialValues = {
        _id: '',
        maND: '',
        hoTen: '',
        lopHoc: '',
        soDienThoai: '',
        emailND: '',
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
        dangHoatDong: false
    };
    const [userEdit, setUserEdit] = useState(initialValues);
    const history = useHistory();
    const [selectLH, setselectLH] = useState([])
    const { id } = useParams();

    useEffect(() => {
        loadData();
        getSelectOption()
    }, []);

    const onChange = (e) => {
        setUserAdd({ ...userAdd, [e.target.name]: e.target.value })
    }
    //load dữ liệu đê edit
    const loadData = async () => {
        const res = await nguoi_dung.getById(id);
        setUserEdit(res.data);
        // console.log(res.data);
    }
    //edit 
    const EditData = async (data) => {
        // console.log(data)
        try {
            const res = await nguoi_dung.updateGV(data._id, data);
            setUserEdit(res?.data);
            history.push(`/quan-ly/hoc-sinh/danh-sach`);
            loadData();
        } catch (err) {
            console.log(err);
        }
    }
    const getSelectOption = async () => {
        const res = await nguoi_dung.getSelect();
        // console.log(res.data);
        setselectLH(res.data)
    }
    return (
        <>
            <TitleBreadcrumb title="Sửa thông tin học sinh" subTitile="" pathHome="quan-ly" />
            <div className="page-title">
                <div className="row">
                </div>
            </div>
            <section className="section">
                <div className="card">
                    <div className="card-body">
                        <BackBtn onClick={() => history.goBack()} />
                        {userEdit._id !== '' ?
                            <Formik
                                initialValues={userEdit}
                                onSubmit={(data) => EditData(data)}
                            >
                                {formikProps => {
                                    //const { values, touched } = formikProps;
                                    //console.log({ values, touched });
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
                                                {imgPreview && (<button className="upload-img-button" onClick={() => setImgPreview(null)}>Xóa ảnh</button>)}
                                            </div> */}
                                            <div className="row input-group">
                                                <div className="col-sm p-5">
                                                    <FastField component={InputField} onChange={(e) => onChange(e)} name="maND" placeholder="Mã học sinh" />
                                                    <FastField component={InputField} name="hoTen" placeholder="Họ và tên" />
                                                    <Field as="select" value={userEdit?.hocTap?.idLop} name="lopHoc" className="form-group-table form-select mb-3">
                                                        <option>Lớp học</option>
                                                        {selectLH.map((sl, idx) => (
                                                            <option key={idx} value={sl._id}>{sl.maLH}</option>
                                                        ))}
                                                    </Field>
                                                    <FastField component={InputField} name="soDienThoai" placeholder="Số điện thoại" />
                                                    <FastField component={InputField} name="emailND" placeholder="Địa chỉ email" />
                                                    {/* <FastField component={InputField} name="matKhau" placeholder="Mật khẩu" /> */}
                                                    <Field name="gioiTinh" as="select" className="form-group-table form-select mb-3 ">
                                                        <option>Giới tính</option>
                                                        <option value="Nam">Nam</option>
                                                        <option value="Nữ">Nữ</option>
                                                    </Field>
                                                    <FastField component={InputField} name="ngaySinh" placeholder="Ngày sinh" />
                                                    <FastField component={InputField} name="noiSinh" placeholder="Nơi sinh" />
                                                </div>
                                                <div className="col-sm p-5">
                                                    <FastField component={InputField} name="quocTich" placeholder="Quốc tịch" />
                                                    <FastField component={InputField} name="danToc" placeholder="Dân tộc" />
                                                    <FastField component={InputField} name="cccd.maSo" placeholder="CMND/CCCD/PASSPORT" />
                                                    <FastField component={InputField} name="cccd.ngayCap" placeholder="Ngày cấp" />
                                                    <FastField component={InputField} name="cccd.noiCap" placeholder="Nơi cấp" />
                                                    <FastField component={InputField} name="diaChi" placeholder="Địa chỉ" />
                                                    <FastField component={InputField} name="hocTap.ngayNhapHoc" placeholder="Ngày nhập học" />
                                                    {/* <FastField component={InputField} name="conCai" placeholder="Họ tên Ba/Mẹ (Cha/Má)" />                    */}
                                                    <Field className="form-group-table form-select" as="select" name="dangHoatDong" >
                                                        <option >Trạng thái</option>
                                                        <option value={true}>Đang học </option>
                                                        <option value={false}>Nghĩ học</option>
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
                            : <></>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
AddGV.propTypes = {
    onSubmit: PropTypes.func
};
AddGV.defaulProps = {
    onSubmit: null,
}

export default AddGV;