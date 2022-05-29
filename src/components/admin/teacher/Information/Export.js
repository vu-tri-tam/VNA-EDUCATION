import React from 'react';
import XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import '../../css//DanhSachGV.css';

const ExportComponent = ({ gvData, filename }) => {

    const fileType = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8`;
    const fileExtension = '.xlsx';
    const ExportToGV = (dataExport, filenameExport) => {
        const ws = XLSX.utils.json_to_sheet(dataExport);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, filenameExport + fileExtension);
    }

    return (
        <>
            <div>
                <button onClick={() => ExportToGV(gvData, filename)} className="btn btn-success" type="button">Xuất</button>
            </div>
        </>
    )
}
export default ExportComponent;