import React from 'react';

const GiaoVienDGK = ({ diemDanhGia, title }) => {
    return (
        <>
            <div className="button-thongke mt-box-5 border-top-box  ">
                <h5>{title}</h5>
                <div className="">
                    <ul className="css-ul-lop" >
                        {
                            diemDanhGia?.length > 0 ?
                                diemDanhGia?.map((e, i) => {
                                    const filter = e?.filter(e => e?.diemTong >= 5)
                                    const sort = filter?.sort((a, b) => b.diemTong - a.diemTong)
                                    return sort?.map((ele, idx) => {
                                        return <li key={idx} className="css-li-lop css-li-root">
                                            <div className="css-li-items">
                                                <div className="css-li-items-jss-gv  items-jss">
                                                    <h6>{ele.giaoVien}</h6>
                                                </div>
                                                <div className="items-js">
                                                    <h6 className={ele.diemTong >= 5 ? "text-success" : "text-danger"}>{Math.round(ele.diemTong)} Điểm</h6>
                                                </div>
                                            </div>
                                        </li>


                                    })

                                }) : <li key={diemDanhGia?._id}> <div className="css-li-items">

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

export default GiaoVienDGK;