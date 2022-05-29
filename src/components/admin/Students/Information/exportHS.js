import React, { useEffect, useState } from 'react';
import NguoiDungApi from '../../../../api/NguoiDungApi';
import ReactExport from 'react-data-export';
import { Card, Form } from 'react-bootstrap';
import '../../css/ExportHS.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ExportHS = () => {
    const [studentClass, setStudentClass] = useState([]);
    const [exportData, setExportData] = useState([]);
    // const [loading, setLoading] = useState(false);
    const DataSet = [
        {
            columns: [
                { title: "STT" },
                { title: "Mã học sinh" },
                { title: "Họ Tên" },
                { title: "Lớp" },
                { title: "SĐT" },
                { title: "Email" },
                { title: "Mật khẩu" },
                { title: "Giới Tinh" },
                { title: "Ngày sinh" },
                { title: "Nơi Sinh" },
                { title: "Quốc tịch" },
                { title: "Dân tộc" },
                { title: "CCCD/CMND" },
                { title: "Ngày cấp" },
                { title: "Nơi cấp" },
                { title: "Đại chỉ" },
                { title: "Ngày nhập học" },
                { title: "Trạng thái" },
            ],
            data: exportData?.map((e, index) => {
                    return (
                        [
                            { value: index + 1 },
                            { value: e.maND },
                            { value: e.hoTen },
                            { value: e.lopHoc },
                            { value: e.soDienThoai },
                            { value: e.emailND },
                            { value: e.matKhau },
                            { value: e.gioiTinh },
                            { value: e.ngaySinh },
                            { value: e.noiSinh },
                            { value: e.quocTich },
                            { value: e.danToc },
                            { value: e.cccd },
                            { value: e.ngayCap },
                            { value: e.noiCap },
                            { value: e.diaChi },
                            { value: e.ngayNhapHoc },
                            { value: e.dangHoatDong }]
                    )
                })
        }
    ]

    useEffect(() => {
        getClass()
    },[])
    const getClass = async () => {
        const res = await NguoiDungApi.getAllLH();
        console.log(res.data);
        setStudentClass(res.data)
    }
    const classChangeHandler = async (data) => {
        setExportData([]);
        const res = await NguoiDungApi.getDSClass(data)
        // console.log(res.maND);
        setExportData(res?.data||[]);
 
    }

    return (
        <>
            <div>
                <Card>
                    <Card.Body className="export-card">
                        <Form>
                            <Form.Control className="export-select" as="select" onChange={(e) => classChangeHandler(e.target.value)} defaultValue="Chọn lơp...">
                                <option>Chọn lớp...</option>                       
                                {studentClass.map((cla, index) =>
                                    <option key={index} value={cla._id} >{cla.maLH}</option>
                            )}
                            </Form.Control>
                        </Form>
                        <ExcelFile element={<button className="btn btn-success export-button" type="button">Xuất</button>} >
                            <ExcelSheet dataSet={DataSet} name="Danh sách"/>
                        </ExcelFile>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default ExportHS;