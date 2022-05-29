import React, { useEffect, useState } from 'react'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import BangTinApi from '../../../api/BangTinApi'
import LoadingFullPage from '../LoadingFullPage'
import BangTinItem from "./BangTinItem"
import { Link } from 'react-router-dom';
import "./baiviet.css"

const BangTin = ({match}) => {
    let matchParam = match.path.split("/")[1]
    let [postsHD,setpostsHD] = useState(null)
    let [postsHT,setpostsHT] = useState(null)
    let [postsHP,setpostsHP] = useState(null)

    document.title = "Bảng tin | VNA EDUCATION"

    useEffect(() => {
        const getBangTin = async () => {
            let res1 = await BangTinApi.getByCata("hoat-dong")
            let res2 = await BangTinApi.getByCata("hoc-tap")
            let res3 = await BangTinApi.getByCata("hoc-phi")
            setpostsHD(res1.data.reverse().slice(0,3))
            setpostsHT(res2.data.reverse().slice(0,3))
            setpostsHP(res3.data.reverse().slice(0,3))
        }
        getBangTin()
    }, [])

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Bảng tin" subTitile="Ý kiến đóng góp liên hệ cskh@gmail.com" pathHome="" />
                {!postsHP ? <LoadingFullPage /> : <section className="section ">

                    <div className="card shadow-sm mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-4 col-md-6" >
                                    <Link to={`/${matchParam}/bang-tin/hoc-tap`} >
                                        <div className="divider divider-left">
                                            <h5 className="mb-3 divider-text cata-title-hover">Thông tin Học tập</h5>
                                        </div>                                    
                                    </Link>
                                    <BangTinItem listItem={postsHT} />
                                </div>
                                <div className="col-lg-4 col-md-6" >
                                    <Link to={`/${matchParam}/bang-tin/hoat-dong`} >
                                        <div className="divider divider-left">
                                            <h5 className="mb-3 divider-text cata-title-hover">Thông tin Hoạt động</h5>
                                        </div>                                    
                                    </Link>
                                    <BangTinItem listItem={postsHD} />
                                </div>
                                <div className="col-lg-4 col-md-12">
                                    <Link to={`/${matchParam}/bang-tin/hoc-phi`} >
                                        <div className="divider divider-left">
                                            <h5 className="mb-3 divider-text cata-title-hover">Thông tin Học phí</h5>
                                        </div>                                    
                                    </Link>
                                    <BangTinItem listItem={postsHP} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>}
            </div>
        </>
    )
}

export default BangTin
