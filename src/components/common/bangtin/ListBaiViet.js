import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import BangTinApi from '../../../api/BangTinApi'
import BangTinItem from "./BangTinItem"
import BackBtn from '../BackBtn'
import TitleBreadcrumb from '../TitleBreadcrumb'
import LoadingFullPage from '../LoadingFullPage'
import Pagination from './Pagination'

const ListBaiViet = () => {
    const [posts, setposts] = useState(null)
    const { catalog } = useParams()
    const history = useHistory() 

    const [currentPage, setcurrentPage] = useState(1)
    const [postsPerPage] = useState(2)

    useEffect(() => {
        const getDanhSachBaiViet = async (cata) => {
            let res = await BangTinApi.getByCata(cata)
            if (res.data[0] === undefined) history.goBack()
            setposts(res.data.reverse());
        }
        getDanhSachBaiViet(catalog)
    }, [catalog, history])

    
    const indexOfLastPost = currentPage * postsPerPage // 1 * 10 = 10
    const indexOfFirstPost = indexOfLastPost - postsPerPage; // 10 - 10 = 0 
    const currentPosts = posts?.slice(indexOfFirstPost,indexOfLastPost)


    const paginate = (pageNumber) => setcurrentPage(pageNumber)

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Bảng tin" subTitile="Ý kiến đóng góp liên hệ cskh@gmail.com" pathHome="" />
                <BackBtn />
                {!posts ? <LoadingFullPage /> : <section className="section ">
                    <div className="card shadow-sm mb-3">
                        <div className="card-body">
                            <div className="divider divider-center">
                                <h5 className="mb-3 divider-text">Thông tin {posts[0].danhMuc}</h5>
                            </div>          
                            <BangTinItem listItem={currentPosts} />
                            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} />
                        </div>
                    </div>

                </section>}
            </div>
        </>
    )
}

export default ListBaiViet
