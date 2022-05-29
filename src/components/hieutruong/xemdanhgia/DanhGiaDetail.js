import React, { useEffect, useReducer, useState } from 'react'
import {  useHistory, useParams } from 'react-router';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import BackBtn from '../../common/BackBtn';
import LoadingFullPage from '../../common/LoadingFullPage';
import DanhGiaReducer from './DanhGiaReducer';
import GVDanhGiaApi from '../../../api/hieutruong/DanhGiaApi';
import DanhGiaDetailList from './DanhGiaDetailList';

import ThongTinThem from './ThongTinThem';
import { htPatchDuyetAlert } from '../../common/CustomAlert';
import swal from 'sweetalert2';
import DanhGiaApi from '../../../api/hieutruong/DanhGiaApi';
import { BsCheckCircle, BsX } from "react-icons/bs";


const DanhGiaDetail = () => {

    document.title = "Chi tiết đánh giá | VNA EDUCATION"
    let history = useHistory();
    const { id } = useParams();
    const [triggerReload, settriggerReload] = useState(true)

    const initialState = {
        danhGiaDetail: null,
        formData: null,
    }

    const [state, dispatch] = useReducer(DanhGiaReducer, initialState)
    // Lấy chi tiết đánh giá
    useEffect(() => {
        const getDanhGia = async (id) => { 
            let res = await GVDanhGiaApi.getDetail(id)
            if(res?.data) {
                dispatch({type: "FETCH_DANHGIA_DETAIL", payload : res.data})
                // console.log(res.data);
            }
        }
        getDanhGia(id);
    }, [id, history, triggerReload])

    // Duyệt đánh giá
    const DuyetDG = () => {
        htPatchDuyetAlert()
        .then((result) => {
            if (result.isConfirmed) {
                let toggleStatus = state.danhGiaDetail.daDuyet
                DanhGiaApi.patchDetailDaDuyet(id, !toggleStatus)
                .then(()=> {
                    settriggerReload(!triggerReload)
                    swal.fire({
                        icon: 'success',
                        title: 'Lưu Thành công',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            }       
        })
    }

    return (
        <>
            {!state.danhGiaDetail ? <LoadingFullPage /> : <div className="page-heading">
                <TitleBreadcrumb title={`Đánh giá môn ${state.danhGiaDetail.monHoc || "Sinh hoạt"}`} 
                subTitile={`Đánh giá tuần học ${state.danhGiaDetail.tuanDG}`} pathHome="giao-vien" />
                <section className="section ">
                    <BackBtn />
                    
                    {/* học sinh đánh giá */}
                    <div className="card shadow-sm p-3">
                            <div className="alert alert-light-primary">
                                <div className="form-check form-switch float-end my-2">
                                    <p>Tình trạng  { !state.danhGiaDetail.daDuyet ? "Chưa duyệt" : "Đã duyệt" }</p>
                                    { !state.danhGiaDetail.daDuyet ? 
                                    <div className="btn btn-primary mt-2 d-flex align-items-center" onClick={DuyetDG}>
                                        <BsCheckCircle  /> <span className="ms-2">Duyệt đánh giá</span>
                                    </div>:
                                    <div className="btn btn-danger mt-2 d-flex align-items-center" onClick={DuyetDG}>
                                        <BsX /> <span className="ms-2">Hủy duyệt đánh giá</span>
                                    </div>}
                                </div>
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="card-title " style={{ textAlign: 'left' }}>
                                            {state.danhGiaDetail.tenDG.toUpperCase()}
                                        </h4>      
                                        <p className="mt-3">Lớp: {state.danhGiaDetail.lopHoc.maLH}</p>            
                                    </div>
                                    <div className="col-md-4 col-0">
                                        <div className="mark-total">{state.danhGiaDetail.diemDG.toFixed(1)}</div>
                                        <p >Điểm trung bình</p>    
                                    </div>
                                </div>                 
                            </div>
                            <div className="row p-2">
                                <ThongTinThem state={state} />
                            </div>
                            <div>
                                {/* // Danh sách học sinh */}
                                <DanhGiaDetailList state={state} />
                            </div>
                        </div>
                </section>
            </div>}
        </>
    )
}


export default DanhGiaDetail
