import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import { Formik, Form, FastField, Field } from 'formik';
import NguoiDungApi from '../../../api/NguoiDungApi';
import { useHistory, useParams } from 'react-router-dom';
import InputField from '../customFields/InputField';
import BackBtn from '../../common/BackBtn';

const EditNamHoc = () => {
    const initialValues = {
        _id: '',
        maLH: '',
        GVCN: '',
        namHoc: '',
        hocSinh: [],
    }
    const [namHocEdit, setNamHocEdit] = useState(initialValues);
    const [userList, setUserList] = useState([]);
    const [namHoc, setNamHoc] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {

        loadData();
        getDanhSach();
        getAllNamHoc()
    }, [id])
    const loadData = async () => {
        const res = await NguoiDungApi.getOneLH(id)
        console.log(res.data);
        setNamHocEdit(res?.data)
    }
    const getDanhSach = async () => {
        const res = await NguoiDungApi.getAllGV();
        setUserList(res.data)
    }
    const getAllNamHoc = async () => {
        const res = await NguoiDungApi.getNamHoc();
        console.log(res?.data);
        setNamHoc(res?.data)
    }
    const editLopHoc = async (data) => {
        try {
            const res = await NguoiDungApi.editLopHoc(data._id, data)
            setNamHocEdit(res?.data)
            history.push(`/quan-ly/lop-hoc/danh-sach`)
            loadData();
        } catch (err) {
            console.log(err);
        }
    }

    // const handleEdit = (field, value) => {
    //     setNamHocEdit({
    //         ...namHocEdit,
    //         [field]: value
    //     })
    // }

    return (
        <>
            <TitleBreadcrumb title="Sửa thông tin lớp học" pathHome="quan-ly" />
            <BackBtn onClick={() => history.goBack()} />
            <section className="section">
                <div className="card">
                    <div className="card-body">

                        {namHocEdit._id !== '' ?
                            <Formik
                                initialValues={namHocEdit}
                                onSubmit={(data) => editLopHoc(data)}
                            >
                                {formikProps => {
                                    return (
                                        <Form>
                                            <div className="row input-group">
                                                <div className="col-sm-6 p-5">
                                                    <FastField component={InputField} name="maLH" placeholder="Mã lớp học" />
                                                    <Field value={namHocEdit?.namHoc?._id} as="select" name="namHoc" className="form-group-table form-select mb-3" >
                                                        <option>Chon năm học</option>
                                                        {
                                                            namHoc?.map((nh, index) => {
                                                                return (
                                                                    <option key={index} value={nh._id}>{nh.tenNam}</option>
                                                                )
                                                            })
                                                        }
                                                    </Field>
                                                    <Field value={namHocEdit?.GVCN?._id} as="select" name="GVCN" className="form-group-table form-select mb-3">
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
                            : <></>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

EditNamHoc.propTypes = {
    onSubmit: PropTypes.func,
}
EditNamHoc.defaultProps = {
    onSubmit: null,
}
export default EditNamHoc;