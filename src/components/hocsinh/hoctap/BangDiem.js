import React, { useEffect, useRef, useState } from 'react'
import BangDiemApi from '../../../api/hocsinh/BangDiemApi'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import { getIdUser } from '../../../auth/AuthFun'
import BangDiemTong from './BangDiemTong'
import BangDiemXepLoai from './BangDiemXepLoai'
import { useHistory } from 'react-router-dom'

const BangDiem = () => {
    document.title = "Bảng điểm | VNA EDUCATION"
    const [bangdiem, setbangdiem] = useState(null)
    let history = useHistory();
    const mountedRef = useRef(true)

    useEffect(() => {
        const getBangDiem = async () => {
            let res = await BangDiemApi.get(getIdUser())
            try {
                if (res !== undefined && res.data) {
                    // console.log(res.data);
                    setbangdiem(res.data)
                } else {
                    history.push("/hoc-sinh/404");
                }
            } catch (error) {
                console.log(error);
            }
        }
        getBangDiem()
        return () => { mountedRef.current = false }
    }, [history])


    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Bảng điểm" subTitile="Bảng diểm học sinh" pathHome="hoc-sinh" />
                {!bangdiem ? <LoadingFullPage /> :
                    <section className="section">
                        <div className="card shadow-sm">
                            {/* <h4 className="card-title mt-4 mb-0">BẢNG ĐIỂM</h4> */}
                            <div className="card-body">
                                <BangDiemTong bangdiem={bangdiem} />
                            </div>
                        </div>
                        <div className="card shadow-sm mt-3">
                            <div className="card-body">
                                <div className="table-responsive">
                                    < BangDiemXepLoai bangdiem={bangdiem} />
                                </div>
                            </div>
                        </div>
                    </section>}
            </div>
        </>
    )
}

export default BangDiem
