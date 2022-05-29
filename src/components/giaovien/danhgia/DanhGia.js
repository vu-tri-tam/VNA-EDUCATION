import React, { useEffect,  useReducer } from 'react'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import "./DanhGia.css"
import DanhGiaItem from './DanhGiaItem'
import { useLocation } from 'react-router-dom'
import { BsSearch } from "react-icons/bs";
import NamHocApi from '../../../api/hocsinh/NamHocApi'
import DanhGiaReducer from '../reducers/DanhGiaReducer'
import GVDanhGiaApi from '../../../api/giaovien/GVDanhGiaApi'
import { getIdUser } from '../../../auth/AuthFun'


const DanhGia = () => {

    document.title ="Đánh giá | VNA EDUCATION"

    const location = useLocation().pathname.split('/').pop() // => gvbm

   // state mặt định
    const initialState = {
        choseweek: null,
        arrweek: null,
        currweek: null,
        listDanhGia: null,
        clone: null,
        isLoading : false
    }

    const [state, dispatch] = useReducer(DanhGiaReducer, initialState)

    // Lấy danh sách tuần
    useEffect(() =>  {
        const getTuan = async () => {
            let tuan = await NamHocApi.getNamHocMoiNhat()
            dispatch({type: 'FETCH_TUAN', payload: tuan.data})
        }
        getTuan()
    }, [])

    // Lấy danh sách đánh giá
    useEffect(() =>  {
        const getListDanhGia = async () => {
            let idUser = await getIdUser()
            if (state.choseweek !== null) {
                let danhgia = await GVDanhGiaApi.getAll(idUser, state.choseweek)
                // console.log(danhgia?.data);
                if (danhgia !== undefined) {
                    dispatch({type: 'FETCH_DANHGIA', payload: {danhgia: danhgia.data, location}})      
                }
            }
            return
        }
        getListDanhGia()
            .then(dispatch({type: "STOP_LOADING"}))
    }, [state.choseweek,location])

    // đổi tên
    const Ctitle = () => {
        let str 
        if (location === "gvbm") {
            str = "bộ môn"
        } else str = "chủ nhiệm"
        return str
    } 

    return (
        <>
             <div className="page-heading">
                <TitleBreadcrumb title={`Đánh giá ${Ctitle()}`} subTitile="Đánh giá tiết học" pathHome="giao-vien" />  
                    {state.arrweek && <div className="row mb-4 ">
                        <div className="col-lg-4 col-md-4 mt-1">
                            <label htmlFor="choseHK">Lọc tuần học</label>
                            <select className="form-select mt-2" id="choseHK" onChange={(e) => dispatch({type: "CHANGE_WEEK", payload: e.target.value})}>
                                {state.arrweek.map(w => (
                                    <option key={w.soTuan} value={w._id}>{w.tenTuan}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-lg-8 col-md-8 mt-1 search-Input">
                            <label >Tìm kiếm</label>
                            <input type="text" className="form-control mt-2 " name="searchBox" placeholder="Nhập môn để tìm kiếm"
                             onChange={(e) => dispatch({type: "SEARCH_DANHGIA", payload: e.target.value})}   />
                            <BsSearch className=" search-Icon"  />
                        </div>
                    </div> }
                 <section className="section ">
                    <div className="titleTable row align-items-center mb-4 shadow-sm">
                        <div className="col-1">STT</div>
                        <div className="col-5 p-2">Thông tin tiết học</div>
                        <div className="col-2 p-2">Thời gian</div>
                        <div className="col-2 p-2">Trạng thái</div>
                        <div className="col-2 p-2 ps-4">Chức năng</div>
                    </div>                                                                                                                              
                    { state.isLoading ? 
                        state.listDanhGia && state.listDanhGia.length > 0 ? state.listDanhGia.map((item, index) => (   
                            <DanhGiaItem key={item._id} {...item} index={index} currweek={state.currweek} />             
                        )): <p className="text-center">Hiện không có đánh giá nào trong tuần này</p>
                    : <LoadingFullPage />}
                </section> 
            </div>  
        </>
    )
}

export default DanhGia
