import React, { useState, useEffect } from 'react';
import { Form, Formik, FastField } from 'formik';
import NguoiDungApi from '../../../api/NguoiDungApi';
import InputField from '../customFields/InputField';
import { useHistory, useParams } from 'react-router-dom';
import BackBtn from '../../common/BackBtn';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import PropTypes from 'prop-types';

const EditMH = () => {
    let initialValues = {
        _id: '',
        tenMH: '',
        // giaoVien: '',
        maMH: '',
    }

    const [listGV, setListGV] = useState([]);
    const [selectGV, setSelectGV] = useState([]);
    const [loadMh, setLoadMH] = useState(initialValues);
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        loadDataMH()
        getListGV();
    }, [])

    const loadDataMH = async () => {
        const res = await NguoiDungApi.getByIdMH(id)
        setLoadMH(res?.data)

        const getGV = res?.data?.giaoVien?.map(e => e._id);
        setSelectGV(getGV);
        // console.log(res?.data);
    }
    const getListGV = async () => {
        const res = await NguoiDungApi.getAllGV()
        // console.log(res.data);
        setListGV(res.data);
    }
    const EditDataMH = async (data) => {
        console.log(data?._id, { ...data, giaoVien: selectGV }, 11111)
        try {
            const res = await NguoiDungApi.updateMH(data?._id, { ...data, giaoVien: selectGV });
            setLoadMH(res.data);
            history.push(`/quan-ly/mon-hoc/danh-sach`)
            loadDataMH()
        } catch (err) {
            console.log(err);
        }
    }

    function selectInput(gv) {
        const teachers = [...selectGV];
        console.log(teachers, 'teacher')
        const index = teachers?.findIndex(e => e === gv);
        if (index === -1) {
            teachers.push(gv)
        } else {
            teachers.splice(index, 1);
        }
        setSelectGV(teachers);
    }
    // console.log(selectGV, 898)

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Sửa thông tin môn học" />
                <section className="section">
                    <div className="card">
                        <div className="card-body">
                            <BackBtn onClick={() => history.goBack()} />
                            {loadMh._id !== '' ?
                                <Formik
                                    initialValues={loadMh}
                                    onSubmit={(data) => EditDataMH(data)}
                                >
                                    {formik => {
                                        return (
                                            <Form>
                                                <div className="row input-group">
                                                    <div className="col-sm-6 p-5">
                                                        <FastField component={InputField} name="tenMH" placeholder="Nhập tên môn học" />
                                                        <FastField component={InputField} name="maMH" placeholder="Nhập số tiết học" />
                                                        <div className="checkBox border-checkBox scrollbar" id="style-scrollbar">
                                                            <div className="force-overflow ">
                                                                <ul className="css-ul-lop ">
                                                                    {
                                                                        listGV?.map((gv, index) => (
                                                                            <li key={index} className="css-li-lop css-li-root">
                                                                                <div className="css-li-items">
                                                                                    <div className="css-li-items-jss css-li-items-jss-1 items-jss ">
                                                                                        <input className="form-check-input" type="checkbox" checked={selectGV?.findIndex(e => e === gv?._id) > -1 ? true : false} onChange={(e) => { selectInput(e.target.value) }} value={gv._id} id={gv._id} />
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
                                : <></>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
EditMH.propTypes = {
    onSubmit: PropTypes.func
};
EditMH.defaulProps = {
    onSubmit: null
}

export default EditMH;