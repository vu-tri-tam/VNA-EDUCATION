import React, { useEffect, useReducer } from 'react'
import {  useHistory, useParams } from 'react-router';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import BackBtn from '../../common/BackBtn';
import LoadingFullPage from '../../common/LoadingFullPage';
import DanhGiaReducer from '../reducers/DanhGiaReducer';
import GVDanhGiaApi from '../../../api/giaovien/GVDanhGiaApi';
import DanhGiaDetailList from './DanhGiaDetailList';

import ThongTinThem from './ThongTinThem';


const DanhGiaDetail = () => {

    document.title = "Chi tiết đánh giá | VNA EDUCATION"
    let history = useHistory();
    const { id } = useParams();

    const initialState = {
        danhGiaDetail: null,
        formData: null,
        isCheck: false,
    }

    const [state, dispatch] = useReducer(DanhGiaReducer, initialState)
    // Lấy chi tiết đánh giá
    useEffect(() => {
        const getDanhGia = async (id) => { 
            let res = await GVDanhGiaApi.get(id)
            if(res?.data ) {
                dispatch({type: "FETCH_DANHGIA_DETAIL", payload : res.data})
                // console.log(res.data);
            }
        }
        getDanhGia(id);
    }, [id, history])

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
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="card-title " style={{ textAlign: 'left' }}>
                                            {state.danhGiaDetail.tenDG.toUpperCase()}
                                        </h4>      
                                        <p className="mt-3">Lớp: {state.danhGiaDetail?.lopHoc?.maLH}</p>            
                                    </div>
                                    <div className="col-md-4 col-0">
                                        <div className="mark-total">{state.danhGiaDetail.diemDG.toFixed(1)}</div>
                                        <p >Điểm trung bình</p>    
                                    </div>
                                </div>                 
                            </div>
                            {state.danhGiaDetail.daDuyet ? <><div className="row p-2">
                                <ThongTinThem state={state} />
                            </div>
                            <div>
                                {/* // Danh sách học sinh */}
                                <DanhGiaDetailList state={state} />
                            </div> </> : 
                            <p>Đánh giá này cần được duyệt dể xem chi tiết</p>
                            }
                        </div>
                </section>
            </div>}
        </>
    )
}


export default DanhGiaDetail
