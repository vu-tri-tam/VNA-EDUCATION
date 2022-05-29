import React from 'react'
import ReactPaginate from 'react-paginate';


export default function Pagination({ usePage, totalPage, setIndexFirt }) {
    const celiPage = Math.ceil(totalPage / usePage);//chỉ số chỉ định cho hiện : 4 
    // console.log(celiPage);
    const onPageChange = ({ selected }) => {
        setIndexFirt(selected);
    }

    return (
        <ReactPaginate
            previousLabel={"Trước"}
            nextLabel={"Sau"}
            pageCount={celiPage}
            onPageChange={onPageChange}
            previousClassName={"previousBttns"}
            containerClassName={"paginationBttns"}
            nextLinkClassName={"nextBttns"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
        />

    )
}
