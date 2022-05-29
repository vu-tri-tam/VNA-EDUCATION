import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import swal from 'sweetalert';
import BackBtn from '../../common/BackBtn';
import LoadingFullPage from '../../common/LoadingFullPage';
import TitleBreadcrumb from '../../common/TitleBreadcrumb';


export default function DanhGiaGVCN() {
    const history = useHistory()
    let [danhGiaDetail, setdanhGiaDetail] = useState()
    const { register, handleSubmit } = useForm();
    const onSubmit = (e) => {
        swal({
            title: "Bạn có chắc muốn gửi đánh giá?",
            text: "Cân nhắc kỹ trước khi bạn gửi đánh giá này đi!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((res) => {
            if (res) {
                swal("Đã gửi thành công", {
                    icon: "success",
                });
                axios.patch(`http://localhost:2000/danh-sach-gvcn/${id}`, {
                    "TrangThai": 1,
                    "danhGia": e,
                }).then(() => {
                    history.goBack()
                })

            } else {
                swal("Đã hủy!");
            }
        });

    }


    const { id } = useParams();
    useEffect(() => {

        async function runpls(id) {
            let result = await axios.get(`http://localhost:2000/danh-sach-gvcn/${id}`);
            setdanhGiaDetail(result.data);
        }

        runpls(id)

    }, [id]);

    return (

        <div className="page-heading">
            <TitleBreadcrumb title="Đánh giá" subTitile="Góp ý cho giáo viên chủ nhiệm" pathHome="phu-huynh" />
            <BackBtn></BackBtn>
            {!danhGiaDetail ? <LoadingFullPage /> : <section className="section ">
                <div className="card shadow-sm mb-3">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="pb-4 px-4 h6">
                                <p>Góp ý cho GVCN</p>
                                <div className="form-group with-title">
                                    <textarea {...register('danhgia')} name="danhgia" className="form-control" id="exampleFormControlTextarea1" rows={3} required />
                                </div>
                            </div>
                            <div className="col-sm-12 d-flex justify-content-end pb-4 px-4">
                                <button type="submit" className="btn btn-primary me-1 mb-1">Gửi đánh giá</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>}
        </div>
    )
}
