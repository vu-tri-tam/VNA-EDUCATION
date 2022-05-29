import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import DanhGiaItem from './XemDanhGiaItem'
import { useParams } from 'react-router'
import { FiSearch } from 'react-icons/fi'
import BackBtn from '../../common/BackBtn'

const XemDanhGia = () => {

  document.title = "Đánh giá | VNA EDUCATION"

  let [listDanhGia, setlistDanhGia] = useState(null)


  let [listDanhGia2, setListDanhGia2] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getList(id) {
      const result = await axios.get(`http://localhost:2000/danh-sach-mon-hoc/${id}`);
      const sort = result.data.giaoVien.sort((a, b) => b.diemDG - a.diemDG)
      setlistDanhGia(sort);
      setListDanhGia2(sort);
    }

    getList(id)
  }, [id])

  // console.log(typeof (listDanhGia));


  let searchByName = (e) => {
    e.preventDefault();
    const value = e.target.search.value.toUpperCase();
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
        <TitleBreadcrumb title="Bảng xếp hạng đánh giá" subTitile="Xếp hạng theo tên" pathHome="phu-huynh" />
        <BackBtn></BackBtn>
        <div style={{ marginBottom: '2%', display: 'flex' }}>
          <form onSubmit={searchByName} style={{ flex: '1' }}>
            <input type="text" className="form-control" placeholder='Nhập giáo viên cần tìm' required name='search' style={{ marginRight: '1%', float: 'left', width: '50%' }} />
            <button type="submit" className="btn btn-info"><FiSearch /></button>
          </form>

        </div>

        {!listDanhGia ? <LoadingFullPage /> : <section className="section ">
          <div className="titleTable row align-items-center mb-2" style={{ padding: '0 24px' }}>
            <div className="col-1">STT</div>
            <div className="col-8 p-2">Thông tin giáo viên</div>
            <div className="col-2 p-2 ps-4">Hành động</div>
          </div>

          {

            listDanhGia !== undefined ? listDanhGia.map((danhgia, idx) => (
              <DanhGiaItem key={danhgia.id} {...danhgia} stt={idx + 1} />
            )) : ''
          }
        </section>
        }
      </div>
    </>
  )
}

export default XemDanhGia
