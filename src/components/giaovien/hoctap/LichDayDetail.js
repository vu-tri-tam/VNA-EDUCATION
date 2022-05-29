import React, { useEffect, useState } from 'react'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import LoadingFullPage from '../../common/LoadingFullPage'
import TietHoc from './TietHoc'
import { useParams } from 'react-router'
import BackBtn from '../../common/BackBtn'
import LichHocApi from '../../../api/LichHocApi'

const LichDayDetail = () => {
    document.title = "Lịch học | VNA EDUCATION"

    const [LichHoc, setlichHoc] = useState(null)
    let { id } = useParams()


    useEffect(() => {
        const getLichHoc = async (id) => {
            let res = await LichHocApi.get(id)
            setlichHoc(res.data);
        }
        getLichHoc(id);
    }, [id])

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Lịch dạy" subTitile={`Lịch dạy tuần ${id}`} pathHome="giao-vien" />
                <BackBtn />
                {!LichHoc ? <LoadingFullPage /> : <section className="section">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <div className=" row">
                                <div className="col-md-4 col-sm-12 my-2"></div>

                                <div className="col-md-4 col-sm-6 col-6 my-2">
                                    <h4 className="card-title">Lịch học tuần {id} </h4>
                                </div>
                                <div className="col-md-4 col-sm-6 col-6 my-2">
                                    <button className="btn btn-primary float-end">Tải xuống</button>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            {/* <!-- Table with outer spacing --> */}
                            <div className="table-responsive">
                                <table className="table table-lg">
                                    <thead >
                                        <tr >
                                            <th className="text-center">BUỔI</th>
                                            <th className="text-center">Thứ 2</th>
                                            <th className="text-center">Thứ 3</th>
                                            <th className="text-center">Thứ 4</th>
                                            <th className="text-center">Thứ 5</th>
                                            <th className="text-center">Thứ 6</th>
                                            <th className="text-center">Thứ 7</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">
                                                <p>SÁNG</p>
                                            </td>

                                            {
                                                LichHoc.buoiHoc.map(buoihoc => (
                                                    <td key={buoihoc.id} >
                                                        <p className="text-center">{buoihoc.ngayHoc}</p>
                                                        {
                                                            buoihoc.tietHoc.map((item, idx) => {
                                                                return <TietHoc key={idx} {...item} />
                                                            })
                                                        }
                                                    </td>
                                                ))
                                            }

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* end table  */}

                        </div>
                    </div>
                </section>}
            </div>
        </>
    )
}

export default LichDayDetail
