import React from 'react'
import BackBtn from '../../common/BackBtn'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'

export default function DiemHS() {
    return (
        <div className="page-heading">

            <TitleBreadcrumb title="Bảng thống kê điểm học sinh" subTitile="" pathHome="phu-huynh" />
            <BackBtn></BackBtn>
            <section className="section ">
                <div className="card shadow-sm mb-3">
                    <div className="card-body">
                        <h5 style={{ textAlign: 'center' }}>BẢNG ĐIỂM THEO MÔN</h5>
                        <div className="contentTable post-body scrollStudent table-responsive">

                            <table border={1} cellPadding={0} cellSpacing={0} className="table table-bordered mb-0 mw-750px" >
                                <tbody>
                                    <tr>
                                        <th align="center" rowSpan={2} >STT</th>
                                        <th align="center" rowSpan={2} >MÔN</th>


                                        <th align="center" colSpan={3}>ĐIỂM HOẠT ĐỘNG</th>
                                        <th align="center" colSpan={2} >ĐIỂM THI HỌC KÌ</th>
                                        <th align="center" rowSpan={2} >ĐIỂM TRUNG BÌNH MÔN</th>

                                    </tr>
                                    <tr >
                                        <th align="center" style={{ fontWeight: 600 }}>Miệng</th>
                                        <th align="center" style={{ fontWeight: 600 }}>15 phút</th>
                                        <th align="center" style={{ fontWeight: 600 }}>1 tiết</th>
                                        <th align="center" style={{ fontWeight: 600 }}>Học kỳ I</th>
                                        <th align="center" style={{ fontWeight: 600 }}>Học kỳ II</th>

                                    </tr>

                                    <tr >
                                        <td align="center" >1</td>
                                        <td align="center" >Toán</td>

                                        {/* {/* <td align="center" >m</td> */}
                                        <td align="center" >8</td>
                                        <td align="center" >8</td>
                                        <td align="center" >9</td>
                                        <td align="center" >9</td>
                                        <td align="center" >10</td>
                                        <td align="center" >9</td>

                                    </tr>
                                    <tr >
                                        <td align="center" >1</td>
                                        <td align="center" >Lý</td>

                                        <td align="center" >8</td>
                                        <td align="center" >9</td>
                                        <td align="center" >9</td>
                                        <td align="center" >8</td>
                                        <td align="center" >10</td>
                                        <td align="center" >9</td>


                                    </tr>
                                    <tr >
                                        <td align="center" >1</td>
                                        <td align="center" >Hoá</td>

                                        {/* <td align="center" >m</td>
            <td align="center" >v</td> */}
                                        <td align="center" >8</td>
                                        <td align="center" >8</td>
                                        <td align="center" >8</td>
                                        <td align="center" >9</td>
                                        <td align="center" >10</td>
                                        <td align="center" >9</td>


                                    </tr>
                                </tbody></table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
