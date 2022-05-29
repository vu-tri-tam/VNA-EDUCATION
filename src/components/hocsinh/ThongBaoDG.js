import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import DanhGiaApi from '../../api/hocsinh/DanhGiaApi'
import NamHocApi from '../../api/hocsinh/NamHocApi'
import { getIdUser } from '../../auth/AuthFun'


export const AxiosDG = async () => {
  let uid = getIdUser()
  let weekNew = await NamHocApi.getTuanMoiNhat()
  if ( weekNew.data !== undefined && weekNew.data !== null) {
    let danhgia = await DanhGiaApi.getDGChuaLam(uid, weekNew.data._id)
    return danhgia?.data
  }
}

const ThongBaoDG = () => {
  let param = useLocation()
  let danhGiaParam = param.pathname.split("/")[2]

  useEffect(() =>  {
    const getListDanhGia = async () => {
        try {
          return await AxiosDG()
        } catch (error) {
          console.log(error);
        }
    }
    getListDanhGia()
        .then((res) => {
            if (res?.length > 0) {
              if (danhGiaParam !== "danh-gia" && danhGiaParam !== "bang-tin") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Thông báo',
                    showConfirmButton:false,
                    text: 'Bạn chưa làm hết đánh giá, hãy mau chóng hoàn thành toàn bộ đánh giá nhé!',
                })    
              }
            }
            
          })
    
  },[param.pathname, danhGiaParam])
  return <div></div>    
}

export default ThongBaoDG
