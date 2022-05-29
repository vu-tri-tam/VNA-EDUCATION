import React, { useEffect, useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
// import { Button, Modal, InputGroup, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
// import { useForm } from "react-hook-form";
import LopHocApi from '../../../api/LopHocApi';
// import BackBtn from '../../common/BackBtn';
import LoadingFullPage from '../../common/LoadingFullPage';
// import { useParams } from 'react-router';



export default function QuanLyLop() {
    // let { idLH } = useParams();
    // console.log('idBH, idLH', idLH)
    // const [showLop, setShowLop] = useState(false);
    // const [showDetailLop, setShowDetailLop] = useState(false);
    const [showLop, setShowLop] = useState([]);
    const [renderByKhoi, setKhoi] = useState([]);

    const getLopHoc = async () => {
        let result = await LopHocApi.getLopHoc();
        const sortClass = result?.data.sort((a, b) => a.maLH.slice(0, 2) - b.maLH.slice(0, 2))//sắp xếp tăng dần
        await setShowLop(sortClass);
    }
    // const getLopHoc = async () => {
    //     let result = await LopHocApi.getLopHoc();
    //     await setShowLop(result.data);
    // }

    // sort theo khối 
    const sortByKhoi = (data) => {
        const result = showLop?.filter(e => e.maLH.slice(0, 2) == data);
        setKhoi(result)

    }
    useEffect(() => {
        getLopHoc()
    }, [])
    useEffect(() => {
        setKhoi(showLop);
    }, [showLop])
    // const { register, handleSubmit, formState: { errors } } = useForm();
    // const onSubmit = (data) => {
    //     console.log(data);
    // }

    return (
        <div className="page-heading">
            <TitleBreadcrumb title="Quản lý lịch học " />
            {/* <BackBtn /> */}
            <section className="section ">
                <div className="card shadow-sm mb-3">
                    <div className="card-body">
                        <div className="table-responsive">
                            {/* <Button variant="primary" onClick={() => setShowLop(!showLop)}>
                                Thêm lớp +
                        </Button> */}
                            <select name="" id="" className="form-select  mb-3" onChange={(e) => sortByKhoi(e.target.value)}>
                                <option value="">Chọn khối</option>
                                <option value="10">Khối 10</option>
                                <option value="11">Khối 11</option>
                                <option value="12">Khối 12</option>
                            </select>

                            <table id="mytable" className="table mt-3">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên lớp</th>
                                        <th>Chủ nhiệm</th>
                                        <th>Hành động</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        renderByKhoi.length > 0 ? renderByKhoi?.map((e, i) => {
                                            return (
                                                <tr key={i} style={{ borderBottom: "6px solid #eceffa" }}>
                                                    <td>{i + 1}</td>
                                                    <td>{e.maLH}</td>
                                                    <td>{e.GVCN.hoTen}</td>

                                                    <td ><Link to={`/quan-ly/quan-li-lich-hoc/${e._id}`}>Quản lí buổi học<IoMdAddCircleOutline className="ms-2" /></Link></td>
                                                </tr>

                                            )
                                        }) : <tr rowSpan="5">
                                            <td colSpan="5">
                                                {renderByKhoi ? <LoadingFullPage /> : "Đang cập nhật"}                                            </td>
                                        </tr>
                                    }





                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
