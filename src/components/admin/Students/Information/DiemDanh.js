import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import BackBtn from '../../../common/BackBtn';
import TitleBreadcrumb from '../../../common/TitleBreadcrumb';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../css/DanhGia.css';
import NguoiDungApi from '../../../../api/NguoiDungApi';
import ReactPaginate from 'react-paginate';

const DiemDanh =(props)=> {
    const history = useHistory();
    const { id } = useParams();
    // const [search, setSearch] = useState("");
    const [listDiemDanh, setListDiemDanh] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const userPerPage = 30;
    const pagesVisited = pageNumber * userPerPage;
    const pageCount = Math.ceil(listDiemDanh.length / userPerPage);
    useEffect(() => {
        const getDiemDanh = async() => {
        const res = await NguoiDungApi.getDiemDanh(id)
        // console.log(res.data);
        setListDiemDanh(res?.data);
    }
        getDiemDanh();
    },[id])
    
    const onPageChange = ({selected}) => {
        setPageNumber(selected);
    }
    const sttUser = pageNumber * userPerPage;
    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Danh sách điểm danh" />
                <section className="section">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <BackBtn onClick={() => history.goBack()}/>
                            </div>
                            <div className="row">
                                <div className="tableShow scrollStudent mt-3">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="td-dg ">STT</th>
                                                <th className="th-dg ">Giao viên</th>
                                                <th className="th-dg ">Trạng thái</th>
                                                <th className="th-dg ">Tiết học</th>
                                                <th className="th-dg ">Môn học</th>
                                                <th className="th-dg ">Ghi chú</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listDiemDanh
                                                ?.slice(pagesVisited, pagesVisited + userPerPage)
                                                .map((e, index) => (
                                                <tr key={index}>
                                                    <td>{sttUser+index + 1}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            ))}
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <ReactPaginate
                                previousLabel={"Trước"}
                                nextLabel={"Sau"}
                                pageCount={pageCount}
                                onPageChange={onPageChange}
                                previousClassName={"previousBttns"}
                                containerClassName={"paginationBttns"}
                                nextLinkClassName={"nextBttns"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                    </div>
                </section>
            </div>
        </>
    )
}

export default DiemDanh;