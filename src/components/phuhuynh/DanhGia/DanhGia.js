import React, { useState, useEffect } from 'react'
import { AiOutlineDownload } from 'react-icons/ai';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';
// import { FiSearch } from 'react-icons/fi'
import axios from 'axios';
import ExportGV from '../../admin/teacher/Information/Export';
const DanhGia = () => {
  document.title = "Đánh giá | VNA EDUCATION";
  const [hocSinh, sethocSinh] = useState(null)
  // console.log(hocSinh);
  useEffect(() => {

    async function geths() {
      const respon = await axios.get('http://localhost:2000/danh-sach-hoc-sinh');
      sethocSinh(respon.data);
    }

    geths()
  }, [])


  return (
    <>

      <div className="page-heading">
        <TitleBreadcrumb title="Bảng điểm" subTitile="Bảng theo dõi và điểm học sinh" pathHome="phu-huynh" />
        <section className="section ">
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <div className="formShow">
                <h4>BẢNG THEO DÕI VÀ XẾP LOẠI HỌC SINH NĂM HỌC 2020 - 2021</h4>
                <h6 style={{ textAlign: 'left', fontSize: '1.025rem', color: '#3a6ae8' }}>GVCN: Nguyễn Thùy Dương</h6>
                <div className="infoClass">
                  <div className="left" style={{ width: '41.5%' }}>
                    <div className="className"><span>LỚP 12A1</span></div>
                  </div>
                  <div className="right">
                    <div className="className d-flex">

                      <span >

                        <ExportGV gvData={hocSinh} filename="danhSachTheoDoiHocSinh"><AiOutlineDownload /></ExportGV>

                        {/* <button className="btn" style={{ marginRight: '0.5rem', background: 'rgb(54 134 21 / 87%)', color: 'white', width: '100%', marginLeft: '15%' }}>
                          <AiOutlineDownload /> Tải xuống</button> */}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="contentTable post-body scrollStudent table-responsive-sm">

                  <table border={1} cellPadding={0} cellSpacing={0} className="table table-bordered mb-0 mw-750px" >
                    <tbody>
                      <tr>
                        <th align="center" >STT</th>
                        <th align="center">HỌ VÀ TÊN HỌC SINH</th>

                        <th align="center" >ĐIỂM HỌC KÌ I (tổng các môn)</th>
                        <th align="center" >ĐIỂM HỌC KÌ II (tổng các môn)</th>
                        <th align="center" >ĐIỂM TRUNG BÌNH MÔN (cả năm)</th>
                        <th align="center" >XẾP LOẠI</th>
                        <th align="center" >GHI CHÚ</th>
                      </tr>
                      {hocSinh && hocSinh.map((e, i) => (
                        <tr key={i}>
                          <td align="center">{i}</td>
                          <td align="center">{e.tenHS}</td>
                          <td align="center">{e.diemHK.hocKiI}</td>
                          <td align="center">{e.diemHK.hocKiII}</td>
                          <td align="center">{e.diemHK.TBM}</td>
                          <td align="center" >{e.XepLoai}</td>
                          <td align="center" ><div className="ghi-chu">{e.GhiChu}</div></td>
                        </tr>))
                      }
                    </tbody></table>
                </div>
              </div>
              {/* show đánh giá học sinh */}
            </div>
          </div>
        </section>
      </div>



    </>
  )
}

export default DanhGia
