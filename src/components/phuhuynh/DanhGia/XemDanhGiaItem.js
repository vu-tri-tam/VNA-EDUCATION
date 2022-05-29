import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import "../../../assets/css/star.css"

const DanhGiaItem = ({ stt, id, diemDG, giaoVien, lopHoc, tietHoc, ngayDanhGia, monHoc, tongHs }) => {

  let match = useRouteMatch();
  // console.log(match);

  return (
    <>

      <div className="card card-hoverd shadow-sm mb-3">
        <div className="card-body">


          {/* // open body */}
          <div className="row cardCustum align-items-center" >

            <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 cxs">
              <strong>{stt}</strong>
            </div>
            <div className="col-lg-8 col-md-4 col-sm-4 col-xs-2">
              <Link to={`${match.url}/${id}`} >
                <h5 className="mb-0"> Danh sách đánh giá giáo viên {giaoVien} </h5>
              </Link>

              <div className="stars d-flex">
                  {diemDG > 8 ? <div>
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                  </div> : diemDG < 8 && diemDG >= 6 ? <div>
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star " />
                    <span className="fa fa-star" />
                  </div> : diemDG < 6 && diemDG >= 4 ?
                    <div>
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star " />
                      <span className="fa fa-star " />
                      <span className="fa fa-star" />
                    </div> : <div>
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked " />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star" />
                    </div>
                }
                {
                  <span className='ms-4 text-danger'>{diemDG / 2}</span>
                }
              </div>




              {/* <span className="badge bg-primary me-2">Môn: {monHoc}</span> */}
              <span className="badge bg-light-primary me-2">Tiết: {tietHoc}</span>
            </div>

            <div className="col-lg-2 col-md-2 col-sm-12 pt-4 pb-3">
              <Link to={`${match.url}/${id}`} >
                <div className="btn btn-info">Xem chi tiết</div>
              </Link>
            </div>
          </div>
          {/* // close body */}
        </div>
      </div>
    </>
  )
}

export default DanhGiaItem

