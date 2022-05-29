import React, { useEffect, useState } from 'react';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import ThongKeHS from './quanLyTK/ThongKeHS';
import ThongKeGV from './quanLyTK/ThongKeGV';
import ThongKeDG from './quanLyTK/ThongKeDG';
import XepHangGV from './quanLyTK/XepHangGV';
// import ChartKhoiLop from './quanLyTK/ChartKhoiLop';
import GiaoVienDGK from './quanLyTK/GiaoVienDGK';
import TuanHocApi from '../../../api/TuanHocApi';
import NguoiDungApi from '../../../api/NguoiDungApi';

const ThongKe = () => {
    const [tuanHoc, setTuanHoc] = useState([])
    const [tuanFilter, setTuanFilter] = useState([])
    const [nameTuan, setNameTuan] = useState([])
    const [giaoVien, setGV] = useState([])
    const [ThongKe, setThongKe] = useState([])
    console.log(tuanHoc, 'ThongKe');

    useEffect(() => {
        TuanHocApi.getTuanHoc()?.then((res) => setTuanFilter(res?.data))
        getThongKeAll()
    }, [])

//lấy tuần mới nhất
    useEffect(() => {
        const max = Math.max(...tuanHoc.map(o => o.soTuan), 0);
        handleAll(max)
        setNameTuan(tuanHoc)
    }, [tuanHoc])


    const getThongKeAll = async () => {
        const thongKeAll = await NguoiDungApi.thongKeAll()//lấy theo năm hiện tại
        const getAllByTuan = thongKeAll?.data?.tuanHoc.map(e => e)
        setTuanHoc(getAllByTuan)
    }


    // 
    useEffect(() => {
        //sau khi lưu thống kê vô state rồi thì ta tạo một useEffect có [data] thay đổi để setState reder lại dữ liệu trong thống kê
        const handleAllGV = () => {
            const getGVDiemCao = ThongKe?.map(e => e?.thongKe?.giaoVien_diemDG)
            setGV(getGVDiemCao)///để tránh việc re-render chậm một nhịp chúng ta cần tạo một hàm xử lí sau khi re-render
        }
        handleAllGV()
    }, [ThongKe])



    const handleAll = async (soTuan) => {
        const getData = tuanHoc?.filter(e => e?.soTuan == soTuan)
        setThongKe(getData)//lấy thống kế theo tuần rồi lưu vô state, tiếp theo xem ở hàm handleAllGV
        setNameTuan(getData)
    }


    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Thống kê" subTitile="Ý kiến đóng góp liên hệ cskh@gmail.com" pathHome="hoc-sinh" />
                <section className="section ">
                    <div className="card shadow-sm mb-3">

                        <div className="card-body">
                            <div className="row">

                                <div className="col-lg-12 col-md-6" >
                                    <h5 className="col-lg-6 col-md-6 mb-3">Bảng thống kê tuần {nameTuan?.filter(e => e)[0]?.soTuan}</h5>
                                    <div className="col-lg-6 col-md-6 mb-3">
                                        <select className="form-select" onChange={(e) => handleAll(e.target.value)}>
                                            <option>Chọn tuần</option>
                                            {
                                                tuanHoc?.map((e, i) => {
                                                    return <option key={i} value={e.soTuan}>{e.tenTuan}</option>
                                                })
                                            }

                                        </select>
                                    </div>

                                    <div className="row">

                                        <div className="col-lg-4 col-md-6">
                                            <ThongKeGV giaoVien={ThongKe} />
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <ThongKeHS hocSinh={ThongKe} />
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <ThongKeDG danhGia={ThongKe} />
                                        </div>


                                    </div>
                                    <div className="row">

                                        <GiaoVienDGK diemDanhGia={giaoVien} title='Giáo viên được đánh giá tốt nhất' />

                                        {/* <XepHangGV diemDanhGia={giaoVien} title='Giáo viên được đánh giá tệ nhất' /> */}
                                        {/* <ChartKhoiLop /> */}
                                        {/* <GiaoVienDGK diemDanhGia={giaoVien} title='Giáo viên được đánh giá tốt nhất' /> */}

                                        {/* <XepHangHS /> */}

                                    </div>
                                    <div className="row">
                                        <XepHangGV diemDanhGia={giaoVien} title='Giáo viên được đánh giá tệ nhất' />
                                        {/* <ChartKhoiLop /> */}
                                        {/* <GiaoVienDGK diemDanhGia={giaoVien} title='Giáo viên được đánh giá tốt nhất' /> */}

                                        {/* <XepHangHS /> */}

                                    </div>
                                </div>

                            </div>
                            {/* <div className="row">
                                <div className="col-lg-8 col-md-8">
                                    
                                </div>
                            </div> */}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
};

export default ThongKe;