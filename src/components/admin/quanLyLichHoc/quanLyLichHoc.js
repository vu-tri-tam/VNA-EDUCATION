import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
// import LoadingFullPage from '../../common/LoadingFullPage';
import { Link, useParams } from 'react-router-dom'
import { FiEdit, FiDelete } from 'react-icons/fi'
// import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import BuoiHocApi from '../../../api/BuoiHocApi';
import TuanHocApi from '../../../api/TuanHocApi';
import BackBtn from '../../common/BackBtn';
import ModalLichHoc from './ModalLichHoc';
import LoadingFullPage from '../../common/LoadingFullPage';
import LopHocApi from '../../../api/LopHocApi';
import Pagination from '../quanlydanhgia/Pagination/Pagination';


export default function QuanLyThu() {
    const { idLH } = useParams()
    // const { register, handleSubmit } = useForm();

    const [show, setShow] = useState(false);
    const [thu, setThu] = useState([]);
    const [tuan, setTuan] = useState([]);
    const [lop, setLop] = useState([]);
    const [renderByWeek, setWeek] = useState([]);
    const [showdetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState();
    console.log(showEdit, 6666);
    const handleShowEdit = (status) => setShowDetail(status);
    const handleShow = (status) => setShow(status);

    const onSubmit = (data) => {
        swal({
            title: "Bạn có chắc muốn tạo đánh giá này không ?",
            text: "Cân nhắc kỹ trước khi bạn thực hiện điều này!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (res) => {
            if (res) {
                swal("Thêm thành công", {
                    icon: "success",
                    buttons: false
                });


                await BuoiHocApi.add(data)
                await getThu()
                handleShow(false)

                // window.location.reload()
            } else {
                swal("Đã hủy!");
            }
        });
    }

    const getThu = async () => {
        let resuft = await BuoiHocApi.getBuoiHoc();
        // console.log(resuft?.data, 5555);
        setThu(resuft?.data)
    }

    const getTuan = async () => {
        let resuft = await TuanHocApi.getTuanHoc();
        setTuan(resuft.data)
    }

    // sort buổi học theo tuần
    const sortByWeek = (id) => {
        let arr = [];
        if (!id && id === '') {
            arr = thu
        } else {
            arr = thu?.filter(e => e?.tuanHoc?.soTuan == id)

        }
        setWeek(arr)
    }

    useEffect(() => {
        LopHocApi.getLopHoc()?.then((res) => setLop(res?.data))
        getThu();
        getTuan();
    }, [])

    // useEffect(() => {
    //     // sortByWeek(2)
    //     setWeek(thu);
    // }, [thu])

    //edit modal
    async function Edit(id) {
        let result = await BuoiHocApi.Edit(id);
        let data = result?.data;
        await setShowEdit({
            _id: data?._id,
            thu: data?.thu,
            tuanHoc: data?.tuanHoc?._id,
            ngayHoc: data?.ngayHoc
        });
        await setShowDetail(true)
    }

    const Delete = (id) => {
        // console.log('iddelete', id);
        swal({
            title: "Bạn có chắc muốn xóa dữ liệu này?",
            text: "Hãy Cân nhắc kỹ trước khi bạn làm việc này!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (res) => {
            if (res) {
                swal("Xóa thành công", {
                    icon: "success",
                    buttons: false
                });
                await BuoiHocApi.remove(id);
                await getThu()
                await handleShow(false)

            } else {
                swal("Đã hủy!");
            }
        });

    }



    const update = (data) => {
        console.log(data?._id, data);
        swal({
            title: "Bạn có chắc muốn thay đổi dữ liệu?",
            text: "Hãy Cân nhắc kỹ trước khi bạn làm việc này!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (res) => {
            if (res) {
                swal("cập nhật thành công", {
                    icon: "success",
                    buttons: false
                });

                await BuoiHocApi.update(data?._id, data)
                await getThu();
                handleShowEdit(false)
                // window.location.reload()
                // handleClose()
            } else {
                swal("Đã hủy!");
            }
        });

    }

    useEffect(() => {
        var CurrentYear = new Date().getFullYear()//lấy tuần theo năm hiện tại
        const getTuanNew = tuan?.filter(e => (e.ngayBatDau.slice(6)) * 1 === CurrentYear)
        const max = Math.max(...getTuanNew?.map(o => o.soTuan), 0);//lấy ra tuần mới nhất
        const getData = thu?.filter(e => e?.tuanHoc?.soTuan == max)
        setWeek(getData || "")
    }, [thu, tuan])


    //phân trang react pagination
    const [indexFirt, setIndexFirt] = useState(0)
    const usePage = 5;
    const indexOfFirt = indexFirt * usePage;
    const current = renderByWeek?.slice(indexOfFirt, indexOfFirt + usePage)
    console.log(showEdit, 555);

    return (
        <div>
            <div className="page-heading">
                <TitleBreadcrumb title={`Quản lý buổi học lớp ${lop && lop?.filter((e, i) => e?._id === idLH)[0]?.maLH || ""} `} />
                <BackBtn />
                <section className="section">
                    <div className="card shadow-sm mb-3">
                        <div className="card-body">
                            <select name="" id="" className="form-select mb-3" onChange={(e) => sortByWeek(e.target.value)}>
                                <option value="">Chọn tuần</option>
                                <option value="">Tất cả tuần</option>
                                {

                                    tuan?.map((ele, i) => {
                                        //console.log(e, 'tuan')

                                        return (

                                            <option value={ele?.soTuan}>{ele?.tenTuan}</option>
                                        )
                                    })
                                }
                            </select>

                            <Button variant="primary" onClick={handleShow}>
                                Thêm lịch học +
                            </Button>


                            <table id="mytable" className="table mt-3">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Buổi học</th>
                                        <th>Tuần học</th>
                                        <th>Ngày học</th>
                                        <th colSpan="3">Hành động</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        current.length > 0 ?
                                            current?.map((e, i) => {
                                                {/* console.log(e, 'week') */ }
                                                return (
                                                    <tr key={i} style={{ borderBottom: "6px solid #eceffa" }}>
                                                        <td>{i + 1}</td>
                                                        <td>{e.thu}</td>
                                                        <td>{`Tuần ${e.tuanHoc.soTuan}`}</td>
                                                        <td>{e.ngayHoc}</td>
                                                        <td><Link style={{ margin: '10%' }} onClick={() => Edit(e._id)} ><FiEdit /></Link><Link><FiDelete onClick={() => Delete(e._id)} /></Link></td>
                                                        <td><Link to={`/quan-ly/quan-li-lich-hoc/quan-ly-lop/${idLH}/${e._id}`}>Quản lí tiêt học</Link></td>

                                                    </tr>
                                                )
                                            }) : <tr rowSpan="5">
                                                <td colSpan="5">
                                                    <LoadingFullPage /> </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>


                        </div>
                        <ModalLichHoc show={show} tittle="Tạo buổi học" handleClose={handleShow} action={onSubmit} initialValue={{}} />
                        <ModalLichHoc show={showdetail} tittle="Chỉnh sửa buổi học" handleClose={handleShowEdit} action={update} initialValue={showEdit} />
                    </div>
                </section>
                <Pagination usePage={usePage} totalPage={renderByWeek.length} setIndexFirt={setIndexFirt} />
            </div>

        </div>
    )
}
