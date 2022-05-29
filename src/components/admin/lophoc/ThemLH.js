import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import '../css/ThemGV.css';
import InputField from '../customFields/InputField';
import nguoi_dung from '../../../api/NguoiDungApi';
import { Formik, Form, FastField, Field } from 'formik';

const ThemLH = () => {
    const initialValues = {
        maLH: '',
        GVCN: '',
        namHoc:'',
        hocSinh:[],
    }
    const validationSchema = Yup.object().shape({
        maLH: Yup.string().required('Vui lòng nhập mã người dùng'),
        GVCN: Yup.string().required('Vui lòng nhập tên giáo viên chủ nhiệm')
    })
    // const [classAdd, setClassAdd] = useState([]);
    const [userList, setUserList] = useState([]);
    const [namHoc, setNamHoc] = useState([]);
    const history = useHistory();
    useEffect(()=>{
        getDanhSach();
        getAllNamHoc()
    },[])
    const getDanhSach = async () => {
        const res = await nguoi_dung.getAllGV();
            setUserList(res.data)
        }
    const onSubmit = async (data) => {
        await nguoi_dung.AddLH({ ...data })
        history.push('/quan-ly/lop-hoc/danh-sach')
        console.log(data);
    }
    const getAllNamHoc = async () => {
        const res = await nguoi_dung.getNamHoc();
        console.log(res?.data);
        setNamHoc(res?.data)
    }
    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Thêm lớp học" />
                <section className="section">
                    <div className="card">
                        <div className="card-body">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={(data)=>{onSubmit(data)}}
                            >
                                {formikProps => {
                                    return (
                                        <Form>
                                            <div className="row input-group">
                                                <div className="col-sm-6 p-5">
                                                    <FastField component={InputField} name="maLH" placeholder="Mã lớp học" />
                                                    <Field as="select" name="namHoc" className="form-group-table form-select mb-3" >
                                                        <option>Chon năm học</option>
                                                        {
                                                            namHoc?.map((nh, index) => {
                                                                return (
                                                                    <option key={index} value={nh._id}>{nh.tenNam}</option>
                                                                )
                                                            })
                                                        }
                                                    </Field>
                                                    <Field as="select" name="GVCN" className="form-group-table form-select mb-3">
                                                        <option >Chọn giáo viên chủ nhiệm</option>
                                                        {
                                                            userList?.map((user, idx) => {
                                                                return (
                                                                    <option key={idx} value={user._id}>{user.hoTen}</option>
                                                                )
                                                            })
                                                        }
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
            </div>
        </>
    )
}

ThemLH.protoType = {
    onsubmit: PropTypes.func,
}
ThemLH.defaultProps = {
    onsubmit: null
}
export default ThemLH;