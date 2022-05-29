import React from 'react';
import '../../css/ThongKe.css'

const XepHangGV = ({ diemDanhGia, title }) => {
    return (
        <>
            <div className="button-thongke mt-box-5 border-top-box  ">
                <h5>{title}</h5>
                <div className="">
                    <ul className="css-ul-lop" >
                        {
                            diemDanhGia?.length ?
                                diemDanhGia?.map((e, i) => {
                                    const filter = e?.filter(e => e?.diemTong <= 5)
                                    const sort = filter?.sort((a, b) => b.diemTong - a.diemTong)
                                    return sort?.map((ele, idx) => {
                                        return <li className="css-li-lop css-li-root" key={idx}>
                                            <div className="css-li-items">
                                                <div className="css-li-items-jss-gv  items-jss">
                                                    <h6>{ele.giaoVien}</h6>
                                                </div>
                                                <div className="items-jss">
                                                    <h6 className={ele.diemTong >= 5 ? "text-success" : "text-danger"}>{Math.round(ele.diemTong)} Điểm</h6>
                                                </div>
                                            </div>
                                        </li>


                                    })

                                }) : <li key={diemDanhGia?.giaoVien}> <div className="css-li-items">

                                    <div className="items-jss">
                                        Đang cập nhật
                                    </div>
                                </div></li>
                        }

                    </ul>
                </div>
            </div>
        </>
    )

}

export default XepHangGV;