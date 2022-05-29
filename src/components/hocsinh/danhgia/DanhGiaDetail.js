import React, { useEffect, useReducer } from 'react'
import {  useHistory, useParams } from 'react-router';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import BackBtn from '../../common/BackBtn';
import LoadingFullPage from '../../common/LoadingFullPage';
import {hsPostDGAlert} from '../../common/CustomAlert';
import { Prompt } from 'react-router';
import DanhGiaReducer from '../reducers/DanhGiaReducer';
import {checkTuTucTieu} from "../helper/HocSinhHelper"
import DanhGiaApi from '../../../api/hocsinh/DanhGiaApi';
import { getIdUser } from '../../../auth/AuthFun';
import { useRef } from 'react';

const DanhGiaDetail = () => {

    document.title = "Chi tiết đánh giá | VNA EDUCATION"
    let history = useHistory();
    const { id } = useParams();
    const gopYRef = useRef()

    const initialState = {
        danhGiaDetail: null,
        formData: null,
        isCheck: false
    }

    const [state, dispatch] = useReducer(DanhGiaReducer, initialState)
    // Lấy chi tiết đánh giá
    useEffect(() => {
        const getDanhGia = async (id) => { 
            let res = await DanhGiaApi.getDetail(id)
            // if(res?.data && !res.data.chiTiet?.hocSinhDG[0]?.trangThai) {
            // } else history.goBack()
            dispatch({type: "FETCH_DANHGIA_DETAIL", payload : res.data})
        }
        getDanhGia(id);
    }, [id, history])

    // Check xem có check hết input không
    useEffect(() => {
        dispatch({type: "CHECK_FORM_DETAIL"}) 
    }, [state.formData])    

    // Add vào state khi chọn
    const handlechange = (e) => {
        dispatch({type: "ADD_FORM", payload: e})
    }

    // Kiểm từ tục tiểu
    const checkTuc = (e) => {
        let res = checkTuTucTieu(e.target.value)
        e.target.value = res
    }

    // Submit form
    const postDanhGia = async (e) => {
        e.preventDefault();
        hsPostDGAlert()
            .then((result) => {
            if (result.isConfirmed) {
                let sum = 0
                let avgNum = 0;
                for( let el in state.formData) {
                    sum += parseFloat( state.formData[el] );
                    avgNum += 1
                }
                let uid = getIdUser()
                DanhGiaApi.post(id,{
                    "nguoiDG": uid,
                    "diemDG": Number((sum / avgNum).toFixed(1)),
                    "trangThai": true,
                    "formDG": state.formData,
                    "gopY": gopYRef.current.value,
                }).then(() => history.goBack())
            }
        })
    }

    return (
        <>
            {!state.danhGiaDetail ? <LoadingFullPage /> : <div className="page-heading ">
                <Prompt when={!state.isCheck} message="Bạn có muốn rời trang không" />
                <TitleBreadcrumb title={`Đánh giá môn ${state.danhGiaDetail.monHoc !== null ? state.danhGiaDetail.monHoc : "Chủ nhiệm" }`}
                 subTitile={`Đánh giá tuần học ${state.danhGiaDetail.tuanDG}`} pathHome="hoc-sinh" />
                <section className="section ">
                    <BackBtn />
                    {/* thông tin đánh giá */}
                    <div className="card shadow-sm rounded-0 my-3" style={{ borderLeft: "2px solid #435ebe" }}>
                        <div className="card-body">
                            <h4 className="card-title " style={{ textAlign: 'left' }}>
                                {state.danhGiaDetail.tenDG.toUpperCase()}
                            </h4>
                        </div>
                    </div>
                   
                    {/* form đánh giá */}
                    <form onSubmit={postDanhGia} name="ac">
                        {
                            state.danhGiaDetail.tieuChi.map((tieuchi, index) => (
                                <div className="card shadow-sm mb-3" key={index}>
                                    <div className="card-body row" >
                                        <div className="col-lg-8 col-md-8 col-sm-12">
                                            <h5 className="alert-heading">Tiêu chí {index + 1}: {tieuchi.tenTC} </h5>
                                            <p>Mô tả: {tieuchi.noiDung}</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-sx-12">
                                        </div>
                                        {
                                            tieuchi.mucTieu.map((jtem, index2) => (
                                                <div className="my-1 " key={index2}>
                                                    <div style={{ paddingRight: 0, borderLeft: "2px solid #c2ccef" }}>
                                                        <div className="alert alert-light-primary m-0" >
                                                            <p className="mb-2"><b>Mục tiêu {index2 + 1}: {jtem.noiDung }</b></p>
                                                            <div className="form-check">
                                                                <label ><input className="form-check-input" 
                                                                name={`tieuchi-${index+1}_muctieu-${index2+1}`}
                                                                type="radio" onChange={handlechange}  value="10" 
                                                                />Xuất sắc</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <label ><input className="form-check-input" 
                                                                name={`tieuchi-${index+1}_muctieu-${index2+1}`}
                                                                type="radio" onChange={handlechange} value="8"
                                                                 />Khá</label>
                                                            </div>
                                                            <div className="form-check">
                                                            <label><input className="form-check-input" 
                                                                name={`tieuchi-${index+1}_muctieu-${index2+1}`}
                                                                type="radio" onChange={handlechange} value="6"
                                                                 />Trung bình</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <label ><input className="form-check-input" 
                                                                name={`tieuchi-${index+1}_muctieu-${index2+1}`}
                                                                type="radio" onChange={handlechange} value="4"
                                                                 />Yếu</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <label ><input className="form-check-input" 
                                                                name={`tieuchi-${index+1}_muctieu-${index2+1}`}
                                                                type="radio" onChange={handlechange} value="2"
                                                                 />Kém</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> 
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        {/* box góp ý & button submit */}
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="textarealable" className="form-label">Góp ý</label>
                                    <textarea className="form-control" rows="4" onChange={checkTuc}
                                    name="gop_y" placeholder="Bạn có ý kiến hoặc góp ý gì không ?" ref={gopYRef}></textarea>
                                </div>
                                <button className="btn btn-primary float-end" type="submit" disabled={!state.isCheck}>Lưu lại</button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>}
        </>
    )
}


export default DanhGiaDetail
