import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import DanhSachMonHoc from './DanhSachMonHoc'


const MonHoc = () => {

    document.title = "Đánh giá | VNA EDUCATION"

    let [listDanhGia, setlistDanhGia] = useState(null)
    useEffect( () => {
        (async function () {
            const result = await axios.get(`http://localhost:2000/danh-sach-mon-hoc`);
            setlistDanhGia(result.data);
        })()
    }, [])

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Bảng danh sách môn học" pathHome="phu-huynh" />


                {!listDanhGia ? <LoadingFullPage /> : <section className="section ">
                    <div className="titleTable row align-items-center mb-2" style={{ padding: '0 24px' }}>
                        <div className="col-1">STT</div>
                        <div className="col-4 p-2">Môn</div>
                        <div className="col-3 p-2 text-center">Số Lượng giáo viên</div>
                        <div className="col-2 p-2 text-center">Hành động</div>
                    </div>
                    {

                        listDanhGia !== undefined ? listDanhGia.map((danhgia, idx) => (
                            <DanhSachMonHoc key={danhgia.id} {...danhgia} stt={idx + 1} />
                        )) : ''
                    }
                </section>}
            </div>
        </>
    )
}

export default MonHoc

