import React from 'react';
import NguoiDungApi from '../../../../api/NguoiDungApi';
import * as XLSX from 'xlsx';
import '../../css/DanhSachGV.css';
import { getJsDateFromExcel } from 'excel-date-to-js';  

const ImportGV = ({getDanhSach}) => {
    const col = (obj,index) => {
        return (obj[Object.keys(obj)[index]]);
    }
    const formatDateExcel = (excelDate)=>{
        const time = new Date(getJsDateFromExcel(excelDate));
        const result = `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`;
        return result;
    }
    
    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsName = wb.SheetNames[0];
                const ws = wb.Sheets[wsName];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };
            fileReader.onerror = (err) => {
                reject(err);
            };
        });
        promise.then((d) => {
            const result = d.map((e, k) => {
                const teacherInfor = {
                    // _id: col(e, 0),
                    maND: col(e, 1),
                    hoTen: col(e, 2),
                    soDienThoai: col(e, 3),
                    emailND: col(e, 4),
                    matKhau: col(e, 5),
                    gioiTinh: col(e, 6),
                    ngaySinh: formatDateExcel(col(e, 7)),
                    noiSinh: col(e, 8),
                    quocTich: col(e, 9),
                    danToc: col(e, 10),
                    cccd: col(e, 11),
                    ngayCap: formatDateExcel(col(e, 12)),
                    noiCap: col(e, 13),
                    diaChi: col(e, 14),
                    chucVu: col(e, 15),
                    tDCM: col(e, 16),
                    hopDong: col(e, 17),
                    dangHoatDong: col(e, 18) || true
                };
                return (teacherInfor)
            });
            // console.log(result)
            NguoiDungApi.importGV(result).then(() => {
            getDanhSach();
            })
        });
    }
    return (
        <>
            <div className="mr-5">
                <label htmlFor="importFile" className="custom-file-label ml-5 ">Nhập</label>
                    <input
                    onChange={(e) => {
                        const file = e.target.files[0];
                        readExcel(file);
                    }} name="file" id="importFile" type="file" className="custom-file-input" />
            </div>
        </>
    )
}
export default ImportGV ;