import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import NguoiDungApi from '../../../api/NguoiDungApi';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import InputField from '../customFields/InputField';
import { useHistory } from 'react-router-dom';
import '../css/ThemMH.css'

const ThemMH = () => {
    const initialValues = {
        tenMH: '',
        maMH: '',
        // giaoVien: [],
    }
    const validationSchema = Yup.object().shape({
        tenMH: Yup.string().required('Vui lòng nhập tên môn học'),
        maMH: Yup.string().required('Vui lòng nhập số tiết học'),
        // giaoVien: Yup.string().required('Vui lòng chọn giáo viên'),
    })
    const [listGV, setListGV] = useState([]);
    const [selectGV, setSelectGV] = useState([]);
    const [GVCN, setListGVCN] = useState([]);
    const history = useHistory();
    useEffect(() => {
        getListGV();
        getListGVCN()
    }, [])
    const getListGV = async () => {
        const res = await NguoiDungApi.getAllGV();
        const giaovienCN = await NguoiDungApi.getAllLH();
        const filerList = res?.data?.filter((e) => {
            return giaovienCN?.data?.findIndex(f => f.GVCN._id === e._id) === -1;//trả về giáo viên ko phải là gvcn
        })
        setListGV(filerList);
    }
    const getListGVCN = async () => {
        const res = await NguoiDungApi.getAllLH()
        // console.log(res.data);
        setListGVCN(res?.data);
    }
    const onSubmit = (e) => {
        if (selectGV?.length > 0) {
            NguoiDungApi.addMH({ ...e, giaoVien: selectGV });
            history.push('/quan-ly/mon-hoc/danh-sach')
        }
    }
    // console.log(GVCN, 'GVCN');
    function selectInput(gv) {
        const teachers = [...selectGV];
        const index = teachers?.findIndex(e => e === gv);
        if (index === -1) {
            teachers.push(gv)

        } else {
            teachers.splice(index, 1);
        }
        setSelectGV(teachers);
    }
    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Thêm môn học" />
                <section className="section">
                    <div className="card">
                        <div className="card-body">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={(e) => onSubmit(e)}
                            >
                                {formikProps => {
                                    return (
                                        <Form>
                                            <div className="row input-group">
                                                <div className="col-sm-6 p-5">
                                                    <FastField component={InputField} name="tenMH" placeholder="Nhập tên môn học" />
                                                    <FastField component={InputField} name="maMH" placeholder="Nhập mã môn học" />
                                                    <div className="checkBox border-checkBox scrollbar" id="style-scrollbar">
                                                        <div className="force-overflow ">
                                                            <ul className="css-ul-lop ">
                                                                {
                                                                    listGV?.map((gv, index) => (
                                                                        <li key={index} className="css-li-lop css-li-root">
                                                                            <div className="css-li-items">
                                                                                <div className="css-li-items-jss css-li-items-jss-1 items-jss ">
                                                                                    <input className="form-check-input" type="checkbox" checked={gv.id} value={gv._id} id={gv.id} onChange={(e) => { selectInput(e.target.value) }} />
                                                                                    <label className="form-check-label ml-5" htmlFor={gv._id}>
                                                                                        <h6 style={{ margin: 0 }}>{gv.hoTen}</h6>
                                                                                    </label>
                                                                                </div>
                                                                                <div className="items-jss">
                                                                                    <h6>{gv.maND}</h6>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
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
            </div>

        </>
    )
}

export default ThemMH;