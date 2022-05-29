import React, { useEffect, useReducer } from 'react'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import "./DanhGia.css"
import DanhGiaItem from './DanhGiaItem'
import NamHocApi from '../../../api/hocsinh/NamHocApi'
import DanhGiaReducer from './DanhGiaReducer'
import DanhGiaApi from '../../../api/hieutruong/DanhGiaApi'
import { useParams } from 'react-router-dom'
import LopHocApi from '../../../api/hieutruong/LopHocApi'
import MonHocApi from '../../../api/hieutruong/MonHocApi'
import BackBtn from '../../common/BackBtn'

import Select from 'react-select';

const DanhGiaTheoLop = () => {

    let { lop } = useParams()

    // state mặt định
    const initialState = {
        choseweek: null,
        arrweek: null,
        currweek: null,
        listDanhGia: null,
        listMonHoc: null,
        clone: null,
        isLoading: false,
        lopDetail: null,
        MonOption: null,
        onChuNhiem: true
    }

    const [state, dispatch] = useReducer(DanhGiaReducer, initialState)


    // lấy lớp hiện tại
    useEffect(() => {
        const getLop = async () => {
            if (lop !== undefined) {
                let lopdetail = await LopHocApi.get(lop)
                dispatch({ type: 'FETCH_LOP_DETAIL', payload: lopdetail.data })
                document.title = `Đánh giá lớp ${lopdetail?.data.maLH} | VNA EDUCATION`
            }
        }
        getLop()
    }, [lop])

    // Lấy danh sách tuần
    useEffect(() => {
        const getTuan = async () => {
            let tuan = await NamHocApi.getNamHocMoiNhat()
            dispatch({ type: 'FETCH_TUAN', payload: tuan.data })
        }
        getTuan()
    }, [])

    // Lấy danh sách môn
    useEffect(() => {
        const getMon = async () => {
            let monHoc = await MonHocApi.getAll()
            dispatch({ type: 'FETCH_MON', payload: monHoc.data })
        }
        getMon()
    }, [])

    // Lấy danh sách đánh giá
    useEffect(() => {
        const getListDanhGia = async () => {
            if (state.choseweek !== null) {
                let danhgia = await DanhGiaApi.getByWeekAndClass(state.choseweek, lop)
                dispatch({ type: 'FETCH_DANHGIA', payload: { danhgia: danhgia.data } })
                // console.log(danhgia.data);
            }
            return
        }
        getListDanhGia()
            .then(dispatch({ type: "STOP_LOADING" }))
    }, [state.choseweek, lop])

    return (
        <>
            <div className="page-heading">
                {state.lopDetail && <TitleBreadcrumb title={`Đánh giá theo lớp ${state.lopDetail?.maLH} `}
                    subTitile={`Xem đánh giá lớp ${state.lopDetail?.maLH} chủ nhiệm ${state.lopDetail.GVCN.hoTen}`} pathHome="hieu-truong" />}
                <BackBtn />
                <div className="row mb-4 ">
                    <div className="col-lg-3 col-md-3 mt-1">
                        <label >Lọc tuần học</label>
                        <select className="form-select mt-2" onChange={(e) => dispatch({ type: "CHANGE_WEEK", payload: e.target.value })}>
                            {state.arrweek && state.arrweek.map(w => (
                                <option key={w.soTuan} value={w._id}>{w.tenTuan}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-lg-3 col-md-3 mt-1">
                        <label>Lọc theo kiểu</label>
                        <select className="form-select mt-2" onChange={(e) => dispatch({ type: "CHANGE_STATUS", payload: e.target.value })}>
                            <option value="0" >Giáo viên chủ nhiệm</option>
                            <option value="1" >Giáo viên bộ môn</option>
                        </select>
                    </div>
                    <div className="col-lg-6 col-md-6 mt-1">
                        <label>Lọc theo môn</label>
                        {state.MonOption && <Select
                            options={state.MonOption}
                            isMulti
                            className="basic-multi-select mt-2"
                            placeholder="Chọn một hoặc nhiều môn"
                            onChange={(e) => dispatch({ type: "CHANGE_MULTI_MON", payload: e })}
                        />}
                    </div>
                </div>
                <section className="section ">
                    <div className="titleTable row align-items-center mb-4 shadow-sm">
                        <div className="col-1">STT</div>
                        <div className="col-5 p-2">Thông tin tiết học</div>
                        <div className="col-2 p-2">Thời gian</div>
                        <div className="col-2 p-2">Trạng thái</div>
                        <div className="col-2 p-2 ps-4">Chức năng</div>
                    </div>
                    {state.isLoading ?
                        state.listDanhGia && state.lopDetail && state.listDanhGia.length > 0 ? state.listDanhGia.map((item, index) => (
                            <DanhGiaItem key={item._id} {...item} index={index} lop={lop}
                                currweek={state.currweek} />
                        )) : <p className="text-center">Hiện không có đánh giá nào trong tuần này</p>
                        : <LoadingFullPage />}
                </section>
            </div>
        </>
    )
}

export default DanhGiaTheoLop
