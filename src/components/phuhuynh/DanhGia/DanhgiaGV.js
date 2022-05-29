import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import TitleBreadcrumb from '../../common/TitleBreadcrumb';

const DanhGiaItem = () => {

    const [danhGiaPhuHuynh, setDanhGiaPhuHuynh] = useState([])
    let match = useRouteMatch('/phu-huynh/danh-gia/danh-gia-giao-vien-bo-mon/');

    useEffect(async () => {
        let result = await axios.get(`http://localhost:2000/danhgiaphuhuynh`);
        setDanhGiaPhuHuynh(result.data);
    }, []);


    return (
        <>
            <TitleBreadcrumb title="Danh sách giáo viên bộ môn" subTitile="" pathHome="phu-huynh" />
            {
                danhGiaPhuHuynh && danhGiaPhuHuynh.map((ele, index) => {

                    return (
                        <div className="card card-hoverd shadow-sm mb-3" key={index}>
                            <div className="card-body">

                                {/* // open body */}
                                <div className="row cardCustum align-items-center" >
                                    <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 cxs">
                                        <strong>{index++}</strong>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-2">

                                        <h5> Đánh giá tiết {ele.monHoc} của {ele.giaoVien} </h5>

                                        <span className="badge bg-primary me-2">Môn{ele.monHoc}</span>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 ">
                                        <p className="m-1">Ngày đánh giá: {ele.ngayDanhGia}</p>
                                    </div>

                                    <div className="col-lg-2 col-md-2 col-sm-3 ">
                                        {
                                            ele.trangThai === 0 ? <span className="badge bg-danger ">Chưa đánh giá</span> :
                                                <span className="badge bg-success ">Đã đánh giá</span>
                                        }
                                    </div>

                                    <div className="col-lg-2 col-md-2 col-sm-12 pt-4 pb-3">
                                        {
                                            ele.trangThai !== 0 ? <button type="button" className="btn btn-primary w-100" disabled>Đã Đánh giá </button> :
                                                <Link to={`${match.url}/${index}`}>
                                                    <button type="button" className="btn btn-primary w-100">Đánh giá</button>
                                                </Link>
                                        }
                                    </div>
                                </div>
                                {/* // close body */}

                            </div>
                        </div>
                    )

                })
            }

        </>
    )
}

export default DanhGiaItem
