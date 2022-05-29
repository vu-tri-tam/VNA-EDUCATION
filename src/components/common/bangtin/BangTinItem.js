import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom';

const BangTinItem = ({ listItem }) => {
    let match = useRouteMatch()
    let matchParam = match.path.split("/")[1]
    return (
        <>
            {
                listItem && listItem.map((post) => (
                    post.daDuyet && <div className="card pb-3 mb-3 baivietitem-divi-line" key={post._id}>
                        <Link to={`/${matchParam}/bai-viet/${post._id}`}>
                            <strong>{post.tieuDe.toUpperCase()}</strong>
                        </Link>
                        <p className="my-1">Người đăng : {post.nguoiDang}</p>
                        <p className="my-1 text-muted">Tóm tắt:
                            {post.tomTat.length > 60 ? `${post.tomTat.substring(0, 50).toLowerCase()}...` : post.tomTat.toLowerCase()}
                        </p>
                        <small className=" my-1text-muted">Ngày đăng: {post.ngayDang} </small>
                    </div>




                ))
            }
        </>
    )
}

export default BangTinItem
