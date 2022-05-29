import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BackBtn from '../../common/BackBtn';
// import { v4 as uuid } from 'uuid';
import { Formik, Form, FastField, Field } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
// import { sucAdd, errAdd } from '../../common/CustomAlert';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import '../css/ThemGV.css';
import InputField from '../customFields/InputField';
import nguoi_dung from '../../../api/NguoiDungApi';

const EditGV=() => {
    // const [imgPreview, setImgPreview] = useState(null);
    // const [error, setError] = useState(false);
    const history = useHistory();
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
        soDienThoai: '',
        emailND: '',
        gioiTinh: '',
        ngaySinh: '',
        noiSinh: '',
        danToc: '',
        quocTich:'',
        cccd: '',
        ngayCap: '',
        noiCap:'',
        diaChi: '',
        chucVu: '',
        tDCM: '',
        hopDong: '',
        monDay: '',
        dangHoatDong: false,
    }
    const [userEdit, setUserEdit] = useState(initialValues);
    // const [selectLH, setselectLH] = useState([])
    const { id } = useParams();

    useEffect(() => {
        const loadData = async () => {
        const res = await nguoi_dung.getById(id);
        setUserEdit(res.data);
        //  console.log(res.data);
    };
        loadData();
        // getSelectOption();
    }, [id]);

    const onChange = (e) => {
        setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
    }
    const EditData = async (data) => {
        try {
            // console.log(data)
            const res = await nguoi_dung.updateGV(data._id,data);
            setUserEdit(res.data);
            history.goBack()
            //history.push('/quan-ly/giao-vien/danh-sach')
            // loadData();
        } catch (err) {
            console.log(err);
        }
    
    };
    // const getSelectOption = async () => {
    //     const res = await nguoi_dung.getSelect();
    //     // console.log(res.data);
    //     setselectLH(res.data)
    // }
    return (
        <>
            <TitleBreadcrumb title="Sửa thông tin giáo viên" pathHome="quan-ly" />
            <div className="page-title">
                <div className="row">
                </div>
            </div>
            <section className="section">
                <div className="card">
                    <div className="card-body">
                        <BackBtn onClick={()=>history.goBack()}/>
                        {userEdit._id !== '' ?
                        <Formik
                            initialValues={userEdit}
                            onSubmit={(data)=>EditData(data)}
                        >
                            { formikProps => {
                                    /* const { values, touched } = formikProps; */
                                    /* console.log() */
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
                                                <FastField component={InputField} onChange={()=>onChange()} name="maND" placeholder="Mã giáo viên"/>
                                                <FastField component={InputField} name="hoTen"  placeholder="Họ và tên" />
                                                <FastField component={InputField} name="soDienThoai" placeholder="Số điện thoại" />
                                                <FastField component={InputField} name="emailND" placeholder="Địa chỉ email" />
                                                {/* <FastField component={InputField} name="matKhau"  placeholder="Mật khẩu" /> */}
                                                {/* <FastField component={InputField} name="truongTrucThuoc" placeholder="Chọn trường trực thuộc" /> */}
                                                <Field name="gioiTinh" as="select" className="form-group-table form-select mb-3 ">
                                                    <option>Giới tính</option>
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                </Field>
                                                {/* <div className="auth-radio">
                                                    <label>Giới tính: </label>
                                                    <div className="form-check form-check-inline">
                                                    
                                                        <FastField className="auth-check" type="radio"  name="gioiTinh" checked={userEdit.gioiTinh==='Nam'?true:false} value="1" />
                                                        <label>Nam</label>
                                                        <FastField className="auth-check" type="radio"  name="gioiTinh" checked={userEdit.gioiTinh==='Nữ'?true:false} value="2"/>
                                                        <label>Nữ</label>
                                                    </div>
                                                </div> */}
                                                <FastField component={InputField} name="ngaySinh"  placeholder="Ngày sinh" />
                                                <FastField component={InputField} name="noiSinh"  placeholder="Nơi sinh" />
                                                <FastField component={InputField} name="quocTich" placeholder="Quốc tịch" />
                                                <FastField component={InputField} name="danToc" placeholder="Dân tộc" />
                                            </div>
                                            <div className="col-sm p-5">
                                                <FastField component={InputField} name="cccd.maSo"   placeholder="CMND/CCCD/PASSPORT" />
                                                <FastField component={InputField} name="cccd.ngayCap" placeholder="Ngày cấp" />
                                                <FastField component={InputField} name="cccd.noiCap" placeholder="Nơi cấp" />
                                                <FastField component={InputField} name="diaChi"  placeholder="Địa chỉ" />
                                                <FastField component={InputField} name="chucVu.chucVu" placeholder="Chọn chức cụ" />
                                                {/* <Field as="select" name="lopHoc" className="form-group-table form-select mb-3">
                                                    <option>Chủ nhiệm của lớp</option>
                                                    {selectLH.map((sl, idx) => (
                                                        <option key={idx+1} value={sl._id}>{sl.maLH}</option>
                                                    ))}
                                                </Field> */}
                                                {/* <FastField component={InputField} name="nhomChuVu"  placeholder="Chọn nhóm chức cụ" /> */}
                                                <FastField component={InputField} name="chucVu.trinhDo"  placeholder="Trình độ chuyên môn" />
                                                {/* <FastField component={InputField} name="monDay"  placeholder="Môn dạy" /> */}
                                                <FastField component={InputField} name="chucVu.hopDong" placeholder="Hình thức hợp đồng" />
                                                {/* field trạng thái */ }
                                                <Field className="form-group-table form-select mb-3"  as="select" name="dangHoatDong">
                                                    <option>Trạng thái</option>
                                                    <option value={true}>Đang làm việc</option>
                                                    <option value={false}>Nghỉ việc</option>
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="auth-button-footer">
                                            <button type="reset" className="btn btn-danger mr-5">Xóa</button>
                                            <button type="submit" value="submit" className="btn btn-primary ">Lưu</button>
                                        </div>
                                    </Form>
                                )
                         }}
                        </Formik>
                        :<></>
                      }
                    </div>
                </div>
            </section>
        </>
    )
}
EditGV.propTypes = {
    onSubmit: PropTypes.func,
}
EditGV.defaultProps = {
    onSubmit: null,
}

export default EditGV;