import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
// import NguoiDungApi from '../../../../api/NguoiDungApi';
import '../../css//DanhSachGV.css';

const ExportGV = ({data, filename}) => {
    const fileType = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8`;
    const fileExtension = '.xlsx';
    // console.log(gvData)
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
                <button onClick={(e) => ExportToGV(data, filename)} type="button" className="btn btn-success float-right" >Xuất</button>
           </div>     
        </>
    )
}
export default ExportGV;