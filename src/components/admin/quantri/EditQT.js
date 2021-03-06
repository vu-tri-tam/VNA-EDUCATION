import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BackBtn from '../../common/BackBtn';
import { Formik, Form, FastField, Field } from 'formik';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import '../css/ThemGV.css';
// import {sucAdd, errAdd} from '../../common/CustomAlert';
import InputField from '../customFields/InputField';
import { useHistory,useParams } from 'react-router-dom';
import nguoi_dung from '../../../api/NguoiDungApi';

const EditQT = (props) => {
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
        _id:'',
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
        noiCap: '',
        chucVu:'',
        tDCM: '',
        hopDong: '',
        diaChi: '',
        dangHoatDong:false
    };
    const [userEdit, setUserEdit] = useState(initialValues);
    const history = useHistory();
    // const [selectLH, setselectLH] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const loadData = async() => {
        const res = await nguoi_dung.getById(id);
        setUserEdit(res.data);
    }
        loadData();
    },[id]);
    const onChange = (e) => {
        setUserAdd({ ...userAdd, [e.target.name]: e.target.value })
    }
    //load d??? li???u ???? edit
    
    //edit 
    const EditData = async (data) => {
        // console.log(data)
        try {
            const res = await nguoi_dung.updateGV(data?._id, data);
            setUserEdit(res.data);
            history.goBack()
            //history.push(`/quan-ly/quan-tri/danh-sach`);
            // loadData();
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <>
            <TitleBreadcrumb title="S???a th??ng tin qu???n tr??? vi??n"  pathHome="quan-ly" />
            <div className="page-title">
                <div className="row">
                </div>
            </div>
            <section className="section">
                <div className="card">
                    <div className="card-body">
                        <BackBtn onClick={()=>history.goBack()}/>
                        { userEdit._id !== ''?
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
                                                {error && <p className="errorMsg">Ch???n file ???nh png, jpeg, jpg</p>}
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
                                                            <p>Th??m ???nh ?????i di???n</p>
                                                            <label htmlFor="fileUpload" className="customFileUpload ">Ch???n ???nh</label>
                                                            <input type="file" id="fileUpload" onChange={uploadImage} />
                                                        </>
                                                    )}
                                                </div>
                                                {imgPreview && (<button className="upload-img-button" onClick={() => setImgPreview(null)}>X??a ???nh</button>)}
                                            </div> */}
                                            <div className="row input-group">
                                                <div className="col-sm p-5">
                                                <FastField component={InputField} onChange={()=>onChange()} name="maND" placeholder="M?? gi??o vi??n"/>
                                                <FastField component={InputField} name="hoTen"  placeholder="H??? v?? t??n" />
                                                <FastField component={InputField} name="soDienThoai" placeholder="S??? ??i???n tho???i" />
                                                <FastField component={InputField} name="emailND" placeholder="?????a ch??? email" />
                                                {/* <FastField component={InputField} name="matKhau"  placeholder="M???t kh???u" /> */}
                                                {/* <FastField component={InputField} name="truongTrucThuoc" placeholder="Ch???n tr?????ng tr???c thu???c" /> */}
                                                <Field name="gioiTinh" as="select" className="form-group-table form-select mb-3 ">
                                                    <option>Gi???i t??nh</option>
                                                    <option value="Nam">Nam</option>
                                                    <option value="N???">N???</option>
                                                </Field>
                                                {/* <div className="auth-radio">
                                                    <label>Gi???i t??nh: </label>
                                                    <div className="form-check form-check-inline">
                                                    
                                                        <FastField className="auth-check" type="radio"  name="gioiTinh" checked={userEdit.gioiTinh==='Nam'?true:false} value="1" />
                                                        <label>Nam</label>
                                                        <FastField className="auth-check" type="radio"  name="gioiTinh" checked={userEdit.gioiTinh==='N???'?true:false} value="2"/>
                                                        <label>N???</label>
                                                    </div>
                                                </div> */}
                                                <FastField component={InputField} name="ngaySinh"  placeholder="Ng??y sinh" />
                                                <FastField component={InputField} name="noiSinh"  placeholder="N??i sinh" />
                                                <FastField component={InputField} name="quocTich" placeholder="Qu???c t???ch" />
                                                <FastField component={InputField} name="danToc" placeholder="D??n t???c" />                                               
                                            </div>
                                                <div className="col-sm p-5">
                                                <FastField component={InputField} name="cccd.maSo"   placeholder="CMND/CCCD/PASSPORT" />
                                                <FastField component={InputField} name="cccd.ngayCap" placeholder="Ng??y c???p" />
                                                <FastField component={InputField} name="cccd.noiCap" placeholder="N??i c???p" />
                                                <FastField component={InputField} name="diaChi"  placeholder="?????a ch???" />
                                                <FastField component={InputField} name="chucVu.chucVu" placeholder="Ch???n ch???c c???" />
                                                {/* <Field as="select" name="chuNhiem" className="form-group-table form-select mb-3">
                                                    <option>Ch??? nhi???m c???a l???p</option>
                                                    {selectLH.map((sl, idx) => (
                                                        <option key={idx+1} value={sl.maLH}>{sl.maLH}</option>
                                                    ))}
                                                </Field> */}
                                                {/* <FastField component={InputField} name="nhomChuVu"  placeholder="Ch???n nh??m ch???c c???" /> */}
                                                <FastField component={InputField} name="chucVu.trinhDo"  placeholder="Tr??nh ????? chuy??n m??n" />
                                                {/* <FastField component={InputField} name="monDay"  placeholder="M??n d???y" /> */}
                                                <FastField component={InputField} name="chucVu.hopDong" placeholder="H??nh th???c h???p ?????ng" />
                                                {/* field tr???ng th??i */ }
                                                <Field className="form-group-table form-select mb-3"  as="select" name="dangHoatDong">
                                                    <option>Tr???ng th??i</option>
                                                    <option value={true}>??ang l??m vi???c</option>
                                                    <option value={false}>Ngh??? vi???c</option>
                                                </Field>
                                            </div>
                                            </div>
                                            <div className="auth-button-footer">
                                                <button type="reset" className="btn btn-danger mr-5">X??a</button>
                                                <button type="submit" className="btn btn-primary ">L??u</button>
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
EditQT.propTypes = {
    onSubmit: PropTypes.func
};
EditQT.defaulProps = {
    onSubmit: null,
}

export default EditQT;