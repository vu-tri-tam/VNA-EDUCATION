import ExcelJS from "exceljs"
import { saveAs } from 'file-saver';

export const exportExcel = async (filename, sheets)  => {
    const wb = new ExcelJS.Workbook();
    sheets.forEach( sheet => {        
        let ws = sheet(wb)
        styleSheet(ws)
    })
    const buf = await wb.xlsx.writeBuffer()
    saveAs(new Blob([buf]),`${filename}.xlsx`)
}

export const configHeader = (wb, nameOfSheet, nameHeader, tableHeader ) => {
    const ws = wb.addWorksheet(nameOfSheet);
    ws.addRow([nameHeader])
    ws.addRow(tableHeader.headerArr)
    for (let i = 1; i < tableHeader.headerArr.length +1; i++) { 
        ws.getColumn(i).width = tableHeader.width
    }    
    let colLen = ws.getRow(2)._cells.length - 1
    let lastCol = ws.getRow(2)._cells[colLen]._address.substring(0,1)
    ws.mergeCells(`A1:${lastCol}1`) 
    return ws   
}

const styleSheet = (ws) => {
    ws.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        row.height = rowNumber === 2 ? 50 : 20 
        let sizeFrs =  rowNumber === 1 ? 14 : 12
        let frs = rowNumber === 2 ? true : false
        let color = rowNumber === 2 ? "DCE6F1" : "FFFFFF"
        row.eachCell({ includeEmpty: true }, function(cell) {
            cell.style = {
                font:{ bold: frs , size : sizeFrs}, 
                alignment: {horizontal: 'center', vertical: "middle"},
                border: {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'}
                },
                fill : {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor: {argb: color} 
                }
            }
        })
    });
}
