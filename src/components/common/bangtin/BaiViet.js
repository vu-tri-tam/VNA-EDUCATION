import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import LoadingFullPage from '../../common/LoadingFullPage'
import BackBtn from '../../common/BackBtn'
import BangTinApi from '../../../api/BangTinApi'

const BaiViet = () => {
    const [post, setpost] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const getBaiViet = async (id) => {
            let res = await BangTinApi.get(id)
            // console.log(res.data)
            setpost(res.data)
        }
        getBaiViet(id)
    }, [id])

    function createMarkup(str) {
        return { __html: str };
    }

    return (
        <>
            {!post ? <LoadingFullPage /> : <div className="page-heading">
                <TitleBreadcrumb title="Bài viết" subTitile={post.tieuDe} pathHome="hoc-sinh" />
                <BackBtn />
                <section className="section shadow-sm">
                    <div className="card">
                        <div className="card-header pb-0">
                            <h4 className="card-title mb-2">{post.tieuDe}</h4>
                            <small>Ngày đăng: {post.ngayDang} </small>
                            <small className="float-end">Người đăng: {post.nguoiDang.hoTen}</small>
                            <hr />
                        </div>
                        <div className="card-body css-table">
                            <div dangerouslySetInnerHTML={createMarkup(post.noiDung)} ></div>
                            <hr />
                            <small>Người đăng: {post.nguoiDang.hoTen}</small>
                        </div>
                    </div>
                </section>
            </div>}
        </>
    )
}

export default BaiViet
