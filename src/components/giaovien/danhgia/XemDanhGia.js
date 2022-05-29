import React, { useEffect, useState } from 'react'
import DanhGiaApi from '../../../api/DanhGiaApi'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import "./DanhGia.css"
import DanhGiaItem from './DanhGiaItem'

const XemDanhGia = () => {

    document.title ="Đánh giá | VNA EDUCATION"
        
    const [listDanhGia, setlistDanhGia] = useState(null)

    useEffect(() =>  {
        const getListDanhGia = async () => {
            let res = await DanhGiaApi.getGV()
            try {
                setlistDanhGia(res.data);
            } catch (error) {
                console.log(error);
            }
        } 
        getListDanhGia()
    }, [])


    return (
        <>
             <div className="page-heading">
                <TitleBreadcrumb title="Đánh giá" subTitile="Đánh giá tiết học" pathHome="giao-vien" />
                { !listDanhGia ? <LoadingFullPage /> : <section className="section ">
                    <div className="titleTable row align-items-center mb-2" style={{padding: '0 24px'}}>
                        <div className="col-1">STT</div>
                        <div className="col-4 p-2">Thông tin tiết học</div>
                        <div className="col-3 p-2">Ngày đánh giá</div>
                        <div className="col-2 p-2">Trạng thái</div>
                        <div className="col-2 p-2 ps-4">Hành động</div>
                    </div>
                    {
                        listDanhGia.map((danhgia,idx) => (
                            <DanhGiaItem key={danhgia.id} {...danhgia} stt={idx+1} />
                        ))
                    }
                </section> }
            </div>  
        </>
    )
}

export default XemDanhGia
