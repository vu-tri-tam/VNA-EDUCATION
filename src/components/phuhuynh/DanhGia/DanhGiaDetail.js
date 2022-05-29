import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import BackBtn from '../../common/BackBtn';

export default function DanhGiaDetail() {
    let [danhGiaDetail, setdanhGiaDetail] = useState()

    const { register, handleSubmit} = useForm();
    const onSubmit = (e) => {
        // console.log(e);
    }
    const { id } = useParams();

    useEffect(() => {

        const  getdgdetail = async (id) => {
            let result = await axios.get(`http://localhost:2000/danhgiaphuhuynh/${id}`);
            setdanhGiaDetail(result.data);
        }

        getdgdetail(id)


    }, [id]);


    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: "\n  .s-16 {\n  width: 16px;\n height: 16px;\n }\n\n .text-normal {\n                    font - size: 16px;\n            }\n        " }} />
            <section id="basic-horizontal-layouts">

                <div className="row match-height">

                    <div className="col-md-12 col-12">
                        <div className="card">

                            {/* <div> <button className='btn' onClick={() => history.goBack()}><i className="fa fa-chevron-left" aria-hidden="true"></i></button></div> */}
                            <div className="card-header">
                                <BackBtn />
                                <h4 className="card-title text-center">ĐÁNH GIÁ CHẤT LƯỢNG GIẢNG DẠY</h4>
                            </div>
                            <div className="card-content">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {danhGiaDetail !== undefined ? danhGiaDetail.tieuChi.map((item, index) => {
                                        return (
                                            <div className="pb-4 px-4">
                                                <p className="text-normal h6">
                                                    {index}. {item.noiDung}
                                                </p>
                                                {
                                                    item.mucTieu.map((ele, k) => (
                                                        <div className="form-check form-check-primary" key={k} >
                                                            <input type="radio" className="form-check-input s-16" {...register(`radio${index}`)} value={ele.noidungMT} />
                                                            <label className="form-check-label" htmlFor="Primary">
                                                                {ele.noidungMT}
                                                            </label>
                                                        </div>



                                                    ))
                                                }

                                            </div>
                                        )
                                    }) : null
                                    }
                                   
                                    <div className="pb-4 px-4 h6">
                                        <p>Ý kiến khác</p>
                                        <div className="form-group with-title">
                                            <textarea className="form-control" name='area' {...register("YKienKhac")} />

                                        </div>
                                    </div>
                                    <div className="col-sm-12 d-flex justify-content-end pb-4 px-4">
                                        <button type="submit" className="btn btn-primary me-1 mb-1">Gửi đánh giá</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
