import React from 'react'
import { Link } from 'react-router-dom'
import BackBtn from '../../common/BackBtn';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';


function FormDiemDanh() {
    document.title = "Điểm danh | VNA EDUCATION";
    const data = [
        {
            id: 1,
            mahs: 'ps11018',
            name: 'vũ trí tâm',
            hocluc: 'khá',
            lop: "12A3",
            hanhkiem: 'tốt',
            sobuoinghi: 9,
            danhgia: 'có năng lực tốt nhưng chưa giỏi'
        },
        {
            id: 2,
            mahs: 'ps11018',
            name: 'vũ trí tâm',
            hocluc: 'khá',
            lop: "12A4",
            hanhkiem: 'tốt',
            sobuoinghi: 8,
            danhgia: 'có năng lực tốt'
        },
        {
            id: 3,
            mahs: 'ps11018',
            name: 'vũ trí tâm',
            hocluc: 'khá',
            lop: "12A5",
            hanhkiem: 'tốt',
            sobuoinghi: 5,
            danhgia: 'có năng lực tốt nhưng học yếu'
        }
    ]

    const renderList = data.map((ele, index) => {

        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td className="text-bold-500">{ele.mahs}</td>
                <td className="text-bold-500">{ele.name}</td>
                <td>{ele.hocluc}</td>
                <td className="text-bold-500">{ele.hanhkiem}</td>
                <td>{ele.sobuoinghi}</td>
                <td>{ele.lop}</td>
                <td><Link to="/phu-huynh/quan-ly-hoc-sinh/danh-sach-hoc-sinh/Diem-danh-hoc-sinh/chi-tiet-buoi-nghi">Chi tiết điểm danh</Link></td>
            </tr>

        )
    })
    return (
        <>
            <section className="section">
                <TitleBreadcrumb title="Chi tiết điểm danh" subTitile="" pathHome="phu-huynh" />
                <BackBtn></BackBtn>
                <div className="row" id="table-head">
                    <div className="col-12">
                        <div className="card">
                            {/* <div> <button className='back-btn' onClick={() => history.goBack()}><i className="fa fa-chevron-left" aria-hidden="true"></i></button></div> */}
                            <div className="card-header" style={{ borderBottom: '1px solid #dce7f1' }}>
                                <h4 className="card-title" style={{ margin: 0 }}>THÔNG TIN ĐIỂM DANH LỚP 12A3</h4>
                            </div>
                            <div className="card-content">
                                {/* table head dark */}
                                <div className="bg-white card-header">
                                    <form className=" mb-3 ">
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="form-group-table d-flex" >
                                                    <input type="text" className="form-control border-radius-0 me-1"
                                                        placeholder="Nhập tên hoặc mã HS" aria-label="Recipient's username"
                                                        aria-describedby="button-addon2" />
                                                    <span className="input-group-text border-radius-0" id="basic-addon1"><i
                                                        className="bi bi-search" /></span>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <select className="form-group-table form-select" >
                                                    <option >Năm Học</option>
                                                    <option value={1}>2017</option>
                                                    <option value={2}>2018</option>
                                                    <option value={3}>2019</option>
                                                </select>
                                            </div>
                                            <div className="col-4">
                                                <select className="form-group-table form-select" >
                                                    <option >Kỳ Học</option>
                                                    <option value={1}>10</option>
                                                    <option value={2}>11</option>
                                                    <option value={3}>12</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="container-full-scroll  table-responsive">
                                        {/* <button onClick={() => handleClick()}>{status == false ? 'Chọn' : 'hủy'}</button> */}
                                        <div className="scroll  table-responsive">
                                            <table className="table table-bordered mb-0 mw-750px">
                                                <thead>
                                                    <tr><th>STT</th>
                                                        {/* {status == true ? <th className="radio" id="radio">chọn<input type="radio" name="radio" id="btn" /></th> : ''} */}
                                                        <th>Mã học sinh</th>
                                                        <th>Họ và tên</th>
                                                        <th>Học lực</th>
                                                        <th>Hạnh kiểm</th>
                                                        <th>Điểm danh</th>
                                                        <th>Lớp</th>
                                                        <th>Hành động</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderList}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

FormDiemDanh.propTypes = {

}

export default FormDiemDanh

