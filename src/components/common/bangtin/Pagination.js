import React from 'react'

const Pagination = ({postsPerPage, totalPosts, paginate, currentPage}) => {

    const pageNumber = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i)
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination pagination-primary">
                <li className={`page-item ${1 === currentPage  ?"disabled":""}`}>
                    <p style={{cursor:"pointer"}} className="page-link"
                    onClick={() => paginate(1)}
                    >Trước</p>
                </li>
                {
                    pageNumber.map((num,i) => (
                        <li key={num} className={`page-item ${i+1 === currentPage ? "active" : ""}`}>
                            <p style={{cursor:"pointer"}} onClick={() => paginate(num)} className="page-link">
                                {num}
                            </p>
                        </li>
                    ))
                }
                <li className={`page-item ${pageNumber.length === currentPage  ?"disabled":""}`}>
                    <p style={{cursor:"pointer"}} className="page-link"
                    onClick={() => paginate(pageNumber.length)}
                    >Cuối</p>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
