import React from 'react'
import XLXS from "xlsx"

export default function ImportFile({ setCols }) {
    const EXTENTIONS = ['xlsx', 'xls', 'csv'];
    const getExention = (file) => {
        const parts = file.name.split('.')
        const extention = parts[parts.length - 1]
        return EXTENTIONS.includes(extention)
    }
    const convertToJson = (headers, fileData) => {
        const rows = []
        fileData.forEach(row => {
            let rowData = {}
            row.forEach((ele, index) => {
                rowData[headers[index]] = ele
            })
            rows.push(rowData)
        })
        return rows

    }
    const importExcel = (e) => {
        const file = e.target.files[0];
        const render = new FileReader()
        render.onload = (event) => {
            const bstr = event.target.result
            const workBook = XLXS.read(bstr, { type: "binary" })

            //get first sheet
            const workSheetName = workBook.SheetNames[0];
            const workSheet = workBook.Sheets[workSheetName]
            //
            const fileData = XLXS.utils.sheet_to_json(workSheet, { header: 1 })
            const headers = fileData[0];
            // const head = headers.map(head => ({
            //     tittle: head, field: head
            // }))
            // setData(head)
            fileData.splice(0, 1)
            const fileFinalSuccess = convertToJson(headers, fileData)
            // console.log(fileFinalSuccess, 'fileFinalSuccess');
            setCols(fileFinalSuccess)

        }

        file ? getExention(file) ? render.readAsBinaryString(file) : alert('lỗi truyền file, vui lòng chọn đúng tên file Excel') : setCols([])
    }
    return (
        <div >
            <input type="file" className="btn" onChange={importExcel} />
        </div>
    )
}
