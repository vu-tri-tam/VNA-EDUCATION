import React, { useEffect,  useReducer } from 'react'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import "./DanhGia.css"
import { Link} from 'react-router-dom'
import { BsSearch } from "react-icons/bs";
import DanhGiaReducer from './DanhGiaReducer'
import LopHocApi from '../../../api/hieutruong/LopHocApi'

const DanhGiaChung = () => {

    document.title ="Đánh giá | VNA EDUCATION"
   // state mặt định
    const initialState = {      
        listLopHoc: null,
        clone: null,
    }

    const [state, dispatch] = useReducer(DanhGiaReducer, initialState)

    // Lấy danh sách lớp
    useEffect(() =>  {
        const getLop = async () => {
            let lop = await LopHocApi.getAll()
            dispatch({type: 'FETCH_LOP', payload: lop.data})
        }
        getLop()
        .then(dispatch({type: "STOP_LOADING"}))
    }, [])

    return (
        <>
             <div className="page-heading">
                <TitleBreadcrumb title={`Xem đánh giá`} subTitile="Xem đánh giá theo lớp" pathHome="hieu-truong" />  
                    <div className="row mb-4 ">
                        <div className="col-lg-4 col-md-3 mt-1">
                            <label htmlFor="choseClass">Lọc theo khối</label>
                            <select className="form-select mt-2" id="choseClass" onChange={(e) => dispatch({type: "CHANGE_CLASS", payload: e.target.value})}>
                                <option value="all" >-- Chọn Khối --</option>
                                <option value="all" >Hiện tất cả</option>
                                <option value="12" >Khối 12</option>
                                <option value="11" >Khối 11</option>
                                <option value="10" >Khối 10</option>
                                <option value="9" >Khối 9</option>
                                <option value="8" >Khối 8</option>
                                <option value="7" >Khối 7</option>
                                <option value="6" >Khối 6</option>
                            </select>
                        </div>
                        <div className="col-lg-8 col-md-8 mt-1 search-Input">
                            <label >Tìm kiếm</label>
                            <input type="text" className="form-control mt-2 " name="searchBox" placeholder="Nhập tên lớp để tìm kiếm tất cả lớp"
                             onChange={(e) => dispatch({type: "SEARCH_CLASS", payload: e.target.value})}   />
                            <BsSearch className=" search-Icon"  />
                        </div>
                    </div> 
                <section className="section">
                {!state.listLopHoc ? <LoadingFullPage /> : <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead style={{ backgroundColor: "#f1f1f1" }}>
                                        <tr>
                                            <th>STT</th>
                                            <th>Lớp học</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.listLopHoc.map((c,i) => (
                                            <tr key={i}>
                                                <td>{i+1}</td>
                                                <td>Lớp {c.maLH}</td>
                                                <td>
                                                    <Link to={`xem-danh-gia/lop/${c._id}`}>Xem theo lớp</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div> 
                    </div> }      
                </section> 
            </div>  
        </>
    )
}

export default DanhGiaChung
