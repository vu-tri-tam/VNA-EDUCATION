import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BackBtn from '../../common/BackBtn'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'

const BangDiemLop = () => {

    document.title = "Bảng điểm | VNA EDUCATION"

    const [bangDiem, setbangDiem] = useState(null)

    useEffect(() => {
        const getBangDiem = async () => {
            let res = await axios.get(`http://localhost:2077/bo-mon`)
            let data = res.data[0].dungLop[0]
            setbangDiem(data)
            // console.log(data)
        }
        getBangDiem();
    }, [])

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Bảng điểm" subTitile="Bảng điểm" pathHome="giao-vien" />     
                <BackBtn/>
                { !bangDiem ? <LoadingFullPage /> : <section className="section">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <div className=" row">
                                <div className="col-md-4 col-sm-12 my-2"></div>
                                <div className="col-md-4 col-sm-6 col-6 my-2">
                                    <h4>Bảng điểm môn toán lớp 9A1</h4>
                                </div>
                                <div className="col-md-4 col-sm-6 col-6 my-2">
                                    <button className="btn btn-primary float-end">Tải xuống</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                        {/* <!-- Table with outer spacing --> */}
                            <div className="table-responsive">
                                <table className="table">
                                    <thead style={{backgroundColor: "#f1f1f1"}}>
                                        <tr>
                                            <th rowSpan="2">STT</th>
                                            <th rowSpan="2">Tên học sinh</th>
                                            <th colSpan="3" className="text-center">Học kỳ 1</th>
                                            <th colSpan="3" className="text-center">Học kỳ 2</th>
                                            <th rowSpan="2">Hành động</th>
                                        </tr>
                                        <tr>
                                            <td style={{border: "none"}}>Điểm miệng</td>
                                            <td style={{border: "none"}}>Điểm 15 phút</td>
                                            <td style={{border: "none"}}>Điểm 1 tiết</td>
                                            <td style={{border: "none"}}>Điểm miệng</td>
                                            <td style={{border: "none"}}>Điểm 15 phút</td>
                                            <td style={{border: "none"}}>Điểm 1 tiết</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {bangDiem.hocSinh.map((hs, i) => (
                                          <tr key={hs.id}>
                                              <td>{i +1 }</td>
                                              <td>{hs.Ten}</td>
                                              <td>{hs.hk1.mieng}</td>
                                              <td>{hs.hk1["15phut"]}</td>
                                              <td>{hs.hk1["1tiet"]}</td>
                                              <td>{hs.hk2.mieng}</td>
                                              <td>{hs.hk2["15phut"]}</td>
                                              <td>{hs.hk2["1tiet"]}</td>
                                              <td>
                                                  <Link to={`/giao-vien/hoc-tap/bang-diem/${bangDiem.id}/sua-diem/${hs.id}`} >Chỉnh sửa điểm</Link>
                                              </td>
                                          </tr>
                                      ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* end table  */}
                        </div>
                    </div>
                </section>}
            </div>  
        </>
    )
}

export default BangDiemLop
