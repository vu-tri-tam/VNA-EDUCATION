import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BackBtn from '../../common/BackBtn'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import { Dropdown } from 'react-bootstrap'
const DanhGiaDetail = () => {

  let { id, idgv } = useParams();

  let [danhgia, setdanhgia] = useState(null);
  let [hocki, setHocki] = useState(null);

  useEffect(() => {
    async function fetchData(id) {
      const result = await axios.get(`http://localhost:2000/danh-sach-mon-hoc/${id}`);
      setdanhgia(result.data);
    }
    fetchData(id)
  }, [id])

  const renderHocKi = (value) => {
    let arr = [];
    switch (value) {
      case 1:
        danhgia?.giaoVien.filter((e) => {
          if (e.id === parseInt(idgv)) {
            arr = e.danhGiahocKy[0].hocKyI[0].hocSinh;
          }
          return arr
        })
        break;
      case 2:
        danhgia?.giaoVien.filter((e) => {
          if (e.id === parseInt(idgv)) {
            arr = e.danhGiahocKy[1].hocKyII[0].hocSinh;
          }
          return arr
        })
        break;
      default:
        danhgia?.giaoVien.filter((e) => {
          if (e.id === parseInt(idgv)) {
            arr = e.danhGiahocKy[0].hocKyI[0].hocSinh.concat(e.danhGiahocKy[1].hocKyII[0].hocSinh);
          }
          return arr
        })
        break;
    }
    return setHocki(arr)
  }

  useEffect(() => {
    renderHocKi()  // eslint-disable-next-line
  }, [danhgia, idgv])


  return (
    <>
      <div className="page-heading">
        <TitleBreadcrumb title="Đánh giá" subTitile="Đánh giá tiết học" pathHome="phu-huynh" />
        <BackBtn pathName="/phu-huynh/danh-gia/xem-thu-hang-danh-gia" />
        <div style={{ float: 'right' }}> <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Chọn kì
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => renderHocKi(1)}>Học Kì I</Dropdown.Item>
            <Dropdown.Item onClick={() => renderHocKi(2)}>Học Kì II</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        {!danhgia ? <LoadingFullPage /> : danhgia && danhgia.giaoVien.map((e, i) => {
          if (e.id === parseInt(idgv)) {
            return <section className="section" key={i}>
              <div className="card shadow-sm rounded-0 my-3" style={{ borderLeft: "2px solid #435ebe" }}>
                <div className="card-body">
                  <h4 className="card-title " style={{ textAlign: 'left' }}>
                    Đánh giá giáo viên: {e.giaoVien} Tiết {e.tietHoc}</h4>
                </div>
              </div>

              <div className="card shadow-sm p-3">
                <div className="alert alert-light-primary">
                  <h5>Danh sách đánh giá của học sinh ({hocki.length})</h5>
                  <span className={e.diemDG >= 7 ? 'text-success h6' : 'text-danger h6'}>Điểm trung bình: {e.diemDG}</span>
                </div>
                {
                  hocki && hocki.map((e, i) => (
                    <div key={i} >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-8 col-sm-8">
                            <div className="avatar bg-secondary me-3">
                              <span className="avatar-content">TT</span>
                            </div>
                            <span>
                              <strong>Học sinh <span className="text-info">({e.hocKi})</span></strong>
                            </span>
                            {/* <div className="bg-success text-white" style={{ marginLeft: '8%', width: '14%' }}></div> */}
                          </div>
                          <div className="col-md-4 col-sm-4 my-2 d-flex align-items-center justify-content-end float-left-xs">
                            <div className="badge bg-success">Điểm đánh giá: {e.diemDG}</div>
                          </div>
                        </div>
                        <div className="ps-3 mt-3 ms-3" style={{ borderLeft: "2px solid #f1f1f1" }}>
                          <p className="font-weight-normal">
                            {e.gopY}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </section>
          }
          return null
        })
        }
      </div>
    </>
  )
}

export default DanhGiaDetail
