import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import { FiSearch } from 'react-icons/fi'
import ItemGVCN from './DanhSachGVCNItem'
const DanhSachGVCN = () => {

  document.title = "Đánh giá | VNA EDUCATION"

  let [listDanhGia, setlistDanhGia] = useState(null)
  let [listDanhGia2, setListDanhGia2] = useState([]);

  useEffect(() => {
    (async function () {
      const result = await axios.get(`http://localhost:2000/danh-sach-gvcn`);
      setListDanhGia2(result.data)
      setlistDanhGia(result.data);
    })()
  }, [])

  let searchByName = (e) => {
    e.preventDefault();
    const value = e.target.value.toUpperCase();
    let resuft = [];
    let clone = [...listDanhGia2];
    if (value === '') {
      resuft = clone;
    }
    else {
      resuft = clone.filter((ele) => (ele.giaoVien.toUpperCase()).indexOf(value) !== -1)
    }

    setlistDanhGia(resuft);

  }

  return (
    <>
      <div className="page-heading">
        <TitleBreadcrumb title="Danh sách giáo viên chủ nhiệm" pathHome="phu-huynh" />
        <div style={{ marginBottom: '2%', display: 'flex' }}>
          <form onSubmit={searchByName} style={{ flex: '1' }}>
            <input type="text" className="form-control" onChange={(e) => searchByName(e)} placeholder='Nhập giáo viên cần tìm' required name='search' style={{ marginRight: '1%', float: 'left', width: '50%' }} />
            <button type="submit" className="btn btn-info"><FiSearch /></button>
          </form>
        </div>

        {!listDanhGia ? <LoadingFullPage /> : <section className="section ">
          <div className="titleTable row align-items-center mb-2" style={{ padding: '0 24px' }}>
            <div className="col-1">STT</div>
            <div className="col-4 p-2 text-left">Thông tin giáo viên</div>
            <div className="col-2 p-2 text-center">Lớp</div>
            <div className="col-2 p-2 text-center">Trạng thái</div>

            <div className="col-2 p-2 ps-4 text-center">Hành động</div>
          </div>
          {

            listDanhGia !== undefined ? listDanhGia.map((danhgia, idx) => (
              <ItemGVCN key={danhgia.id} {...danhgia} stt={idx + 1} />
            )) : ''
          }
        </section>}
      </div>
    </>
  )
}

export default DanhSachGVCN
