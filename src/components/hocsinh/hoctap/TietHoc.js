import React from 'react'

const TietHoc = ({ngay, type}) => {
    return (
        <table className="tableInTable">
        <tbody >
            {
                ngay.tietHoc.map(tiet => (
                    <tr key={tiet._id}><td>{tiet[type]}</td></tr>
                ))
            }
        </tbody>
        </table>
    )
}

export default TietHoc
