import React from 'react';
import * as XLSX from 'xlsx';
import '../../css/DanhGiaHS.css';
import NguoiDungApi from '../../../../api/NguoiDungApi';
import { getJsDateFromExcel } from 'excel-date-to-js';  

const ImportHS = ({getDanhSach}) => {
    const col = (obj, index) => {
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
                const studentInfor = {
                    maND: col(e, 1),
                    hoTen: col(e, 2),
                    lopHoc: col(e, 3),
                    soDienThoai: col(e, 4),
                    emailND: col(e, 5),
                    matKhau: col(e, 6),
                    gioiTinh: col(e, 7),
                    ngaySinh: formatDateExcel(col(e, 8)),
                    noiSinh: col(e, 9),
                    quocTich: col(e, 10),   
                    danToc: col(e, 11),
                    cccd: col(e, 12),
                    ngayCap: formatDateExcel(col(e, 13)),
                    noiCap: col(e, 14),
                    diaChi: col(e, 15),
                    ngayNhapHoc: formatDateExcel(col(e, 16)),
                    dangHoatDong: col(e, 17) || true
                };
                return (studentInfor);
            }); 
            // console.log(result)
            NguoiDungApi.importHS(result).then(() => {
                // const maUser = response?.data?.maND
                // console.log(maUser);
                getDanhSach();
            })
            // console.log(result?.data);
        });
    }

    return (
        <>
            <div className="mr-5">
                <label htmlFor="importFileHS" className="custom-file-label ml-5 ">Nhập</label>
                <input
                    onChange={(e) => {
                        const file = e.target.files[0];
                        readExcel(file)
                    }}
                    name="file" id="importFileHS" type="file" className="custom-file-input"
                />
            </div>
        </>
    )
}

export default ImportHS;