import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

const ItemGVCN = ({ stt, id, TrangThai, giaoVien, chuNhiemLop }) => {

  let match = useRouteMatch();
  // useEffect(() => {

  //   async function runpls(id) {
  //     let result = await axios.get(`http://localhost:2000/danh-sach-gvcn/${id}`);
  //     setdanhGiaDetail(result.data);
  //   }

  //   runpls(id)

  // }, [id]);

  return (
    <>
      <div className="card card-hoverd shadow-sm mb-3">
        <div className="card-body">

          {/* // open body */}
          <div className="row cardCustum align-items-center" >

            <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 cxs">
              <strong>{stt}</strong>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-2 text-left">
              <Link to={`${match.url}/${id}`} >
                <h5 style={{ color: 'blue' }}>{giaoVien} </h5>
              </Link>

            </div>
            <div className="col-lg-2 col-md-3 col-sm-3 text-center">
              <p className="m-1">{chuNhiemLop}</p>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 ">
              {
                TrangThai === 0 ? <p className="m-1 bg-warning p-1 text-center text-white">Chưa đánh giá</p> : <p className="m-1 bg-success p-1 text-center text-white">Đã đánh giá</p>
              }

            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 pt-3 pb-3">
              
              {
                TrangThai === 1 ? <Link to={`${match.url}/${id}`} ><button type="button" className="btn btn-primary w-100" >Sửa đánh giá </button></Link> :
                  TrangThai === 0 ?
                    <Link to={`${match.url}/${id}`} >
                      <button type="button" className="btn btn-info w-100">Đánh giá </button>
                    </Link> : ''
              }


            </div>
          </div>
          {/* // close body */}
        </div>
      </div>
    </>
  )
}

export default ItemGVCN


