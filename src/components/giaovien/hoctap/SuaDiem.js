import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BackBtn from '../../common/BackBtn'
import LoadingFullPage from '../../common/LoadingFullPage'
import TitleBreadcrumb from '../../common/TitleBreadcrumb'
import ModelDiem from './ModelDiem'

const SuaDiem = () => {

    document.title = "Sửa bảng điểm | VNA EDUCATION"

    const [bangDiem, setbangDiem] = useState(null)
    const [title, settitle] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        const getBangDiem = async () => {
            let res = await axios.get(`http://localhost:2077/bo-mon`)
            let data = res.data[0].dungLop[0]
            let user = data.hocSinh.filter(hs => hs.id === parseInt(id))
            console.log(user[0])
            setbangDiem(user[0])
        }
        getBangDiem();
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        console.log( bangDiem.hk1.mieng);
    }

    const handleChange = e => {
       
    }

    const addCol = (type, value) => {
        if (value !== "") {
            switch (type) {
                case "mieng1":
                    bangDiem.hk1.mieng.push(parseInt(value))
                    setbangDiem({...bangDiem})
                    break;
                case "mieng2":
                    bangDiem.hk2.mieng.push(parseInt(value))
                    setbangDiem({...bangDiem})
                    break;
                case "15phut1":
                    bangDiem.hk1['15phut'].push(parseInt(value))
                    setbangDiem({...bangDiem})
                    break;
                case "15phut2":
                    bangDiem.hk2['15phut'].push(parseInt(value))
                    setbangDiem({...bangDiem})
                    break;
                case "1tiet1":
                    bangDiem.hk1['1tiet'].push(parseInt(value))
                    setbangDiem({...bangDiem})
                    break;
                case "1tiet2":
                    bangDiem.hk2['1tiet'].push(parseInt(value))
                    setbangDiem({...bangDiem})
                    break;
                default:
                    break;
            }            
        }
    }

    const cloneCol = (type) => {
        switch (type) {
            case "mieng":
                settitle("Điểm miệng")
                break;
        
            default:
                break;
        }
    }

    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Bảng điểm" subTitile="Bảng điểm" pathHome="giao-vien" />     
                <BackBtn/>
                { !bangDiem ? <LoadingFullPage /> : <section className="section">
                    <ModelDiem modelname={title && title} addCol={addCol}  />
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h4>Sửa điểm môn toán của {bangDiem.Ten} lớp 9A1 </h4>
                        </div>
                        <div className="card-body">
                            {/* // form // */}
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <label className="form-label">Điểm miệng học kỳ 1</label>
                                    <div className="col-md-10">
                                        {bangDiem.hk1.mieng.map((diem,i) => (
                                            <input key={i} type="number" className="form-control mb-2" 
                                            defaultValue={diem} onChange={handleChange} keyid={i} />
                                        ))}
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-primary float-end" type="button"
                                        onClick={() => cloneCol("mieng") }
                                         data-bs-toggle="modal" data-bs-target="#exampleModal">Thêm cột điểm</button>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="form-label">Điểm 15 phút học kỳ 1</label>
                                    <div className="col-md-10">
                                        {bangDiem.hk1["15phut"].map((diem,i) => (
                                            <input key={i} type="number" className="form-control mb-2" 
                                            defaultValue={diem} onChange={handleChange} keyid={i} />
                                        ))}
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-primary float-end" type="button"
                                        onClick={() => cloneCol("mieng") }
                                         data-bs-toggle="modal" data-bs-target="#exampleModal">Thêm cột điểm</button>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="form-label">Điểm 1 tiết học kỳ 1</label>
                                    <div className="col-md-10">
                                        {bangDiem.hk1["1tiet"].map((diem,i) => (
                                            <input key={i} type="number" className="form-control mb-2" 
                                            defaultValue={diem} onChange={handleChange} keyid={i} />
                                        ))}
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-primary float-end" type="button"
                                        onClick={() => cloneCol("mieng") }
                                         data-bs-toggle="modal" data-bs-target="#exampleModal">Thêm cột điểm</button>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="form-label">Điểm miệng học kỳ 2</label>
                                    <div className="col-md-10">
                                        {bangDiem.hk2.mieng.map((diem,i) => (
                                            <input key={i} type="number" className="form-control mb-2" 
                                            defaultValue={diem} onChange={handleChange} keyid={i} />
                                        ))}
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-primary float-end" type="button"
                                        onClick={() => cloneCol("mieng") }
                                         data-bs-toggle="modal" data-bs-target="#exampleModal">Thêm cột điểm</button>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="form-label">Điểm 15 phút học kỳ 2</label>
                                    <div className="col-md-10">
                                        {bangDiem.hk2["15phut"].map((diem,i) => (
                                            <input key={i} type="number" className="form-control mb-2" 
                                            defaultValue={diem} onChange={handleChange} keyid={i} />
                                        ))}
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-primary float-end" type="button"
                                        onClick={() => cloneCol("mieng") }
                                         data-bs-toggle="modal" data-bs-target="#exampleModal">Thêm cột điểm</button>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="form-label">Điểm 1 tiết học kỳ 2</label>
                                    <div className="col-md-10">
                                        {bangDiem.hk2["1tiet"].map((diem,i) => (
                                            <input key={i} type="number" className="form-control mb-2" 
                                            defaultValue={diem} onChange={handleChange} keyid={i} />
                                        ))}
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-primary float-end" type="button"
                                        onClick={() => cloneCol("mieng") }
                                         data-bs-toggle="modal" data-bs-target="#exampleModal">Thêm cột điểm</button>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success float-end">Lưu thay đổi</button>
                            </form>
                            {/* // form // */}
                        </div>
                    </div>
                </section>}
            </div>  
        </>
    )
}

export default SuaDiem
