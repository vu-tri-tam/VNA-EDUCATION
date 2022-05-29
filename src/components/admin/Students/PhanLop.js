import React, { useEffect, useState } from 'react';
import NguoiDungApi from '../../../api/NguoiDungApi';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
import ReactPaginate from 'react-paginate';

const PhanLop = () => {
    const [userList, setUserList] = useState([]);
    const [selectClass, setSelectClass] = useState([]);
    const [form, setForm]= useState({users:[],classId:''});
    const [search, setSearch] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const userPerPage = 22;
    const pagesVisited = pageNumber * userPerPage;
    const pageCount = Math.ceil(userList.length / userPerPage);

    useEffect(() => {
        getDanhSach();
        getClass();
    },[])
    const getDanhSach = async () => {
        const res = await NguoiDungApi.getAllHS()
        setUserList(res.data)
    }
    const getClass = async () => {
        const cla = await NguoiDungApi.getAllLH()
        setSelectClass(cla.data);
    }

    const onPageChange = ({selected}) => {
        setPageNumber(selected);
    }
    const saveListUser = (value) => {
        const cloneUserSelect = [...form.users];
        const index = cloneUserSelect?.findIndex(e => e === value);
        if (index > -1) {
            cloneUserSelect.splice(index, 1);
        }
        else {
            cloneUserSelect.push(value);
        }
        setForm({...form,users:cloneUserSelect});
    }
    const submitUser = (e) => {
        e.preventDefault();
        // console.log(form?.classId, form?.users)
        NguoiDungApi.addClass(form?.classId, form?.users);
    }
    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Phân học sinh theo lớp" />
                {
                    <section className="section">
                        <div className="card">
                            <form onSubmit={submitUser}>
                                <div className="card-body">
                                    <div className="showListStudent">
                                        <div className="mb-3 box-fil row">
                                            <div className="col-lg-6">
                                                <div className="input-group mb-3">
                                                    <input type="text" onChange={(e) => setSearch(e.target.value)}  className="form-control" placeholder="Nhập tên, mã học sinh" />
                                                    <button className="ml-5 btn btn-primary" type="button">Tìm kiếm</button>
                                                </div>
                                            </div>
                                            <div className="col-lg-6" style={{ textAlign: 'right', display: 'flex' }}>
                                                <select className="select-import-pl" onChange={(e)=>{setForm({...form,classId:e.target.value})}}>
                                                    <option>chọn lớp ...</option>
                                                    {selectClass.map((o, index) => (
                                                        <option key={index} value={o.id}>{ o.maLH}</option>
                                                    ))}
                                                </select>
                                                <button type="submit" className="btn btn-success button-import-pl">Lưu</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table tableShow scrollStudent">
                                        <ul className="css-ul-lop ">
                                            {userList
                                            ?.filter((item) => {
                                                if (search === "") {
                                                    return item
                                                } else if (item.hoTen.toLowerCase().includes(search.toLowerCase()) || item.maND.toLowerCase().includes(search.toLowerCase())) {
                                                    return item
                                                } else {
                                                    return false
                                                }
                                            })
                                            .slice(pagesVisited, pagesVisited + userPerPage)
                                                .map((e, index) => (
                                                <li key={index} className="css-li-lop css-li-root">
                                                    <div className="css-li-items">
                                                        <div className="css-li-items-jss css-li-items-jss-1 items-jss ">
                                                            <input className="form-check-input" type="checkbox" onChange={(e)=>{saveListUser(e.target.value)}} checked={e.id} value={e._id} id={e._id} />
                                                            <label className="form-check-label ml-5" htmlFor={e._id}>
                                                                <h6 style={{ margin: 0 }}>{e.hoTen }</h6>
                                                            </label>
                                                        </div>
                                                    
                                                        <div className="css-li-items-jss">
                                                            <h6>{e.maND }</h6>
                                                        </div>
                                                         {/* <div className="css-li-items-jss">
                                                            <h6>{e. }</h6>
                                                        </div> */}
                                                        <div className="css-li-items-jss">
                                                            <h6>{e.emailND }</h6>
                                                        </div>
                                                        <div className="items-jss">
                                                            <h6>{e.ngaySinh }</h6>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        </div>
                                    </div>
                                </form>
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
                }
           </div> 
        </>
    )
}

export default PhanLop;