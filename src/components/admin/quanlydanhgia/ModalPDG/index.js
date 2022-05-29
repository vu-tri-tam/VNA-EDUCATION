import { useState, useEffect } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import PhieuDanhGiaApi from '../../../../api/PhieuDanhGiaApi';
import TietHocApi from '../../../../api/TietHocApi';
import TuanHocApi from '../../../../api/TuanHocApi';
import LopHocApi from '../../../../api/LopHocApi';
// import NguoiDungApi from '../../../../api/NguoiDungApi';

// import { ErrorMessage, FastField, Field, Formik, useFormik } from 'formik';
// import * as Yup from "yup";
// import InputField from '../../customFields/InputField';
// import SelectField from '../../customFields/SelectField';
// import SelectField from '../../customFields/SelectField';
// import Select from 'react-select';


export default function ModalPDG({ show, showModal, action, title, initialValue, confirmAlert }) {
    /*
    show :trạng thái ẩn hiển modal;
    showModal:ham thay doi trang thai an hien modal
    Action: Hàm submit Api (Tạo/Update)
    Title:Tiêu đề modal
    Initival:Giá trị ban đầu
    */

    const [input, setInput] = useState({});
    // console.log(input, 'input')
    const [week, setWeek] = useState([]);
    const [classStudent, setClassStudent] = useState([]);
    const [formRating, setFormRating] = useState([]);
    const [subject, setSubject] = useState([]);
    const [lesson, setLesson] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [lopHoc, setlopHoc] = useState([]);
    const [errors, setErrors] = useState({})


    useEffect(() => {
        LopHocApi.getLopHoc()?.then((res) => setlopHoc(res?.data))

    }, [])
    
    useEffect(() => {
        TuanHocApi.getTuanHoc().then((response) => {
            setWeek(response?.data || []);
        })
        PhieuDanhGiaApi.getLopHoc().then((response) => {
            setClassStudent(response?.data || [])
        })
        PhieuDanhGiaApi.getMauDanhGia().then((reponse) => {
            setFormRating(reponse?.data || [])
        })
        TietHocApi.getTietHoc().then((reponse) => {
            setLesson(reponse?.data);
        })
        if (initialValue?.choGVCN === false) {

            FilterClass(initialValue?.lopHoc);
            getTeacherSubject(initialValue?.monHoc);
        }
        else {
            getGVCN();
        }
        setInput(initialValue);
    }, [initialValue])

    //Khi giá trị ban đầu thay đổi thì sẽ load DS Tuần,Lớp,Mẫu dánh giá,Tiếthocj
    //Nếu giá ban đầu có Field choGVCN===false thì lọc lớp để lấy danh sách môn học và Lấy danh sách giao viên bằng id Môn học
    const getGVCN = async () => {
        await PhieuDanhGiaApi.getGVCN().then((response) => {
            const ListGVCN = [];
            for (let i = 0; i < response?.data.length; i++) {
                ListGVCN.push(response?.data[i].GVCN)
            }
            setTeacher(ListGVCN || []);

        });
    }
    const handleChange = async (field, value) => {
        if (field === 'choGVCN' && value === true) {
            await PhieuDanhGiaApi.getGVCN().then((response) => {
                const ListGVCN = [];
                for (let i = 0; i < response?.data.length; i++) {
                    ListGVCN.push(response?.data[i].GVCN)
                }
                setTeacher(ListGVCN || []);
                setInput({
                    ...input,
                    [field]: value
                })
            });


        }
        else {
            setInput({
                ...input,
                [field]: value
            })
        }
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const findFormErrors = () => {
        const { tenDG, choGVCN, tuanDG, lopHoc, monHoc, giaoVien, mauDG } = input

        const newErrors = {}

        // console.log(choGVCN, 111)

        if (!tenDG || tenDG === '') newErrors.tenDG = 'Không được bỏ trống!'


        if (choGVCN === undefined || choGVCN === null || choGVCN === '') newErrors.choGVCN = 'Không được bỏ trống'

        if (!tuanDG || tuanDG === '') newErrors.tuanDG = 'Không được bỏ trống!'


        if (!choGVCN) {
            if (!monHoc || monHoc === '') {
                newErrors.monHoc = "Không được bỏ trống"
            }

        } else {
            if (!!errors["monHoc"]) setErrors({
                ...errors,
                monHoc: null
            })
        }


        if (!choGVCN) {

            if (!lopHoc || lopHoc === '') {
                newErrors.lopHoc = "Không được bỏ trống"
            }
        } else {
            if (!!errors["lopHoc"]) setErrors({
                ...errors,
                lopHoc: null
            })
        }

        if (!mauDG || mauDG === '') newErrors.mauDG = 'Không được bỏ trống!'

        if (!giaoVien || giaoVien === '') newErrors.giaoVien = 'Không được bỏ trống!'

        return newErrors
    }

    const handleSubmit = () => {
        const newErrors = findFormErrors()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            action(input)
        }
    }


    //Hàm lấy các dữ liệu người dùng chọn 

    const FilterClass = (data) => {
        // console.log(data, 'ccc')
        const filterClass = lesson?.filter(e => e?.lopHoc?._id === data && e?.monHoc !== null);
        if (filterClass !== undefined) {
            const filterSubject = filterClass?.map(e => e?.monHoc)
            const removeDuplicate = [];
            for (let i = 0; i < filterSubject?.length; i++) {
                if (removeDuplicate?.findIndex(e => e?._id === filterSubject[i]?._id) === -1) {
                    removeDuplicate.push(filterSubject[i]);
                }
            }
            setSubject(removeDuplicate);
        }
        setInput({
            ...input,
            lopHoc: data,
            monHoc: '',
            giaoVien: ''
        });
        if (!!errors['lopHoc']) setErrors({
            ...errors,
            lopHoc: null
        })
        setTeacher([]);
    }

    const handleLopHocClick = (idGV) => {
        const index = lopHoc.findIndex(e => e?.GVCN?._id === idGV);
        if (index > -1) {
            setInput({ ...input, lopHoc: lopHoc[index]?._id, giaoVien: idGV })
        }

    }

    // console.log(input, 2323)
    //Hàm lấy danh sách môn học bằng id Lớp học

    const getTeacherSubject = (id) => {
        setTeacher([]);
        TietHocApi.getMonHocById(id).then((response) => {
            setTeacher(response?.data || []);
        })
        setInput({ ...input, monHoc: id, giaoVien: '' });
        setTeacher([]);
        if (!!errors['monHoc']) setErrors({
            ...errors,
            monHoc: null
        })
    }
    //Hàm lấy danh sách giáo viên bằng id môn học
    const yearOptions = [
        { value: "true", label: "Giáo viên chủ nhiệm" },
        { value: "false", label: "Giáo viên bộ môn" },

    ];

    return (
        <>
            <Modal show={show} onHide={() => { showModal(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Formik initialValues={initialValues} validationSchema={validationSchema}
                        // onSubmit={() => action(input)}
                    >
                        {formikProps => { */}

                    <Form noValidate>
                        <Row>
                            <Col lg={12}>


                                <Form.Group>
                                    <Form.Label>Tên đánh giá</Form.Label>
                                    {/* <FastField component={InputField} type="text"
                                        placeholder="Tên đánh giá"
                                        name='tenDG'
                                        onChange={(e) => handleChange('tenDG', e.target.value)}
                                        onBlur={(e) => {
                                            console.log(e);
                                        }}
                                        value={input.tenDG} /> */}
                                    <Form.Control
                                        type="text"
                                        placeholder="Tên đánh giá"
                                        name='tenDG'
                                        isInvalid={!!errors.tenDG}
                                        onChange={(e) => handleChange('tenDG', e.target.value)}
                                        value={input?.tenDG}
                                    ></Form.Control>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.tenDG}
                                    </Form.Control.Feedback>
                                    {/* <ErrorMessage name='tenDG' /> */}
                                </Form.Group>

                                {/* {formik.errors.tenDG && formik.touched.tenDG && (
                                    <p>{formik.errors.tenDG}</p>
                                )} */}
                            </Col>


                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Label>
                                        Áp dụng cho giáo viên:
                                    </Form.Label>
                                    {/* <FastField
                                        component={SelectField}
                                        name='choGVCN'
                                        onChange={(e) => { handleChange('choGVCN', 2222) }}
                                        value={input.choGVCN} options={yearOptions}  >


                                    </FastField> */}
                                    <Form.Control
                                        as="select"
                                        isInvalid={!!errors.choGVCN}
                                        name='choGVCN'
                                        onChange={(e) => { handleChange('choGVCN', JSON.parse(e.target.value)) }}
                                        value={input?.choGVCN}
                                    >
                                        <option value="">--Chọn giáo viên--</option>
                                        <option value="true">Giáo viên chủ nhiệm</option>
                                        <option value="false">Giáo viên bộ môn</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.choGVCN}
                                    </Form.Control.Feedback>
                                    {/* <ErrorMessage name='choGVCN' /> */}
                                </Form.Group>
                            </Col>

                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Label>
                                        Tuần học:
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        isInvalid={!!errors.tuanDG}
                                        onChange={(e) => { handleChange('tuanDG', e.target.value) }}
                                        value={input?.tuanDG}
                                    >
                                        <option value="">--Chọn tuần--</option>
                                        {
                                            week?.map((e, i) => {
                                                return <option value={e._id} key={i}>{e.tenTuan}</option>
                                            })
                                        }
                                    </Form.Control>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.tuanDG}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Label>
                                        Áp dụng cho lớp:
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        isInvalid={!!errors.lopHoc}
                                        onChange={(e) => { FilterClass(e.target.value) }}
                                        value={input?.lopHoc}
                                        disabled={input?.choGVCN}
                                    >
                                        <option value="">--Chọn lớp--</option>
                                        {
                                            classStudent?.map((e, i) => {
                                                //console.log(e, 'class') 
                                                return <option value={e._id} key={i}>{e.maLH}</option>
                                            })
                                        }
                                    </Form.Control>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.lopHoc}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Label>
                                        Môn học:
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        isInvalid={!!errors.monHoc}
                                        onChange={(e) => { getTeacherSubject(e.target.value) }}
                                        value={input?.monHoc}
                                        disabled={input?.choGVCN}
                                    >
                                        <option value="">--Chọn môn học--</option>
                                        {
                                            subject?.map((e, i) => {
                                                return <option value={e._id} key={i}>{e.tenMH}</option>
                                            })
                                        }
                                    </Form.Control>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.monHoc}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Label>
                                        Giáo viên:
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        isInvalid={!!errors.giaoVien}

                                        onChange={(e) => { handleChange('giaoVien', e.target.value); handleLopHocClick(e.target.value) }}
                                        value={input?.giaoVien}
                                    >
                                        <option value="">--Chọn giáo viên--</option>
                                        {
                                            teacher?.map((e, i) => {
                                                //console.log(e, 'cc') */ }
                                                return <option value={e._id} key={i}>{e.hoTen}</option>
                                            })
                                        }
                                    </Form.Control>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.giaoVien}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Label>
                                        Mẫu đánh giá:
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        isInvalid={!!errors.mauDG}

                                        onChange={(e) => { handleChange('mauDG', e.target.value) }}
                                        value={input?.mauDG}
                                    >
                                        <option value="">--Chọn mẫu đánh giá--</option>
                                        {
                                            formRating?.map((e, i) => {

                                                return <option value={e._id} key={i}>{e.tenMau}</option>
                                            })
                                        }
                                    </Form.Control>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.mauDG}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                        </Row>
                    </Form>
                    {/* }}
                    </Formik> */}
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="danger" onClick={() => { confirmAlert() }}>
                        Đóng
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Lưu lại
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}
