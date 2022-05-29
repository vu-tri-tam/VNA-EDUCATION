import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const BangTinItem = ({listItem}) => {
    
    const [posts] = useState(listItem)

    return (
        <>
            {
                posts && posts.map((post) => (
                    <div className="card pb-3 mb-3" key={post.id} style={{borderBottom: '1px solid #f1f1f1' ,borderRadius: 0}}>
                        <Link to={`bai-viet/${post.id}`}> 
                            <strong>{post.title}</strong>
                        </Link>
                        <p className="m-0">Người đăng : {post.author}</p>
                        <small>Ngày đăng: {post.created}</small>
                    </div>
                ))
            }
        </>
    )
}

export default BangTinItem;
