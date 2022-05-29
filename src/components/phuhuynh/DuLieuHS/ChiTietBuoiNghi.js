import React from 'react'
import BackBtn from '../../common/BackBtn'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'

export default function ChiTietBuoiNghi() {
    return (
        <section className="section">
            <TitleBreadcrumb title="Chi tiết buổi nghỉ" subTitile="" pathHome="phu-huynh" />
            <BackBtn></BackBtn>
            <div className="row" id="table-head">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header" style={{ borderBottom: '1px solid #dce7f1' }}>
                            <h4 className="card-title" style={{ margin: 0 }}>THÔNG TIN BUỔI NGHỈ</h4>
                        </div>
                        <div className="card-content">
                            {/* table head dark */}
                            <div className="bg-white card-header">

                                <div className="container-full-scroll">
                                    {/* <button onClick={() => handleClick()}>{status == false ? 'Chọn' : 'hủy'}</button> */}
                                    <div className="scroll table-responsive">
                                        <table className="table table-bordered mb-0 mw-750px">
                                            <thead>
                                                <tr><th>STT</th>
                                                    {/* {status == true ? <th className="radio" id="radio">chọn<input type="radio" name="radio" id="btn" /></th> : ''} */}
                                                    <th>Môn</th>
                                                    <th>Tiết</th>
                                                    <th>Ngày</th>
                                                    <th>Số buổi có mặt</th>
                                                    <th>Số buổi nghỉ</th>
                                                    {/* <th>Hành động</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr >
                                                    <td>1</td>
                                                    {/* {status == true ? <td className="radio"><input type="radio" name="radio" onChange={HandleInput} /></td> : ''} */}
                                                    {/* <td className="radio"><input type="radio" name="radio" /></td> */}
                                                    <td className="text-bold-500">Toán</td>
                                                    <td className="text-bold-500">12</td>
                                                    <td>27/12/1999</td>
                                                    <td className="text-bold-500">5</td>
                                                    <td>9</td>
                                                    {/* <td><Link to="">Xem chi tiết</Link></td> */}
                                                </tr>
                                                <tr >
                                                    <td>2</td>
                                                    {/* {status == true ? <td className="radio"><input type="radio" name="radio" onChange={HandleInput} /></td> : ''} */}
                                                    {/* <td className="radio"><input type="radio" name="radio" /></td> */}
                                                    <td className="text-bold-500">Toán</td>
                                                    <td className="text-bold-500">12</td>
                                                    <td>27/12/1999</td>
                                                    <td className="text-bold-500">5</td>
                                                    <td>9</td>
                                                    {/* <td><Link to="">Xem chi tiết</Link></td> */}
                                                </tr>
                                                <tr >
                                                    <td>3</td>
                                                    {/* {status == true ? <td className="radio"><input type="radio" name="radio" onChange={HandleInput} /></td> : ''} */}
                                                    {/* <td className="radio"><input type="radio" name="radio" /></td> */}
                                                    <td className="text-bold-500">Toán</td>
                                                    <td className="text-bold-500">12</td>
                                                    <td>27/12/1999</td>
                                                    <td className="text-bold-500">5</td>
                                                    <td>9</td>
                                                    {/* <td><Link to="">Xem chi tiết</Link></td> */}
                                                </tr>
                                                <tr>
                                                    <td colSpan={7}><div>Tổng số buổi có mặt: 10</div><div>Tổng số buổi nghỉ: 10</div></td>

                                                </tr>
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
    )
}
