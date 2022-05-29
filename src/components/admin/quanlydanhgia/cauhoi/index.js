import React, { useState } from "react";
import MucTieu from '../cauTl/cauTL'



export default function CauHoi(props) {
  // console.log(props.findFormErrors, 'findFormErrors');
  const [soMT, setSoMT] = useState(0);
  const [data, setData] = useState();
  // const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  const handleGiam = (soMT) => {
    // console.log('cccc')
    setSoMT(soMT - 1)

  }
  const renderTL = [];
  for (let i = 0; i < soMT; i++) {
    renderTL.push(
      <MucTieu
        key={i}
        tieuChiId={props.id}
        muctieu={props.muctieu}
        id={i + 1}
        data={soMT}
        handleGiam={handleGiam}
      ></MucTieu>
    );
  }

  // props.findFormErrors = {
  //   const { tenTC, noiDung } = data
  //   const newErrors = {}

  //   if (!tenTC || tenTC === '') newErrors.tenTC = 'Không được bỏ trống!'
  //   else if (noiDung.length > 100) newErrors.tenTC = 'Số lượng quá nhiều!'
  //   // else if (isNaN(tieuChi)) newErrors.tieuChi = 'vui lòng nhập số!'

  //   if (!noiDung || noiDung === '') newErrors.noiDung = 'Không được bỏ trống!'
  //   else if (noiDung.length > 100) newErrors.noiDung = "Tên quá dài"

  //   return newErrors
  // }

  // const handleForm = (field, value) => {
  //   setForm({
  //       ...form,
  //       [field]: value
  //   })
  //   setSoMT(value);
  //   if (!!errors[field]) setErrors({
  //       ...errors,
  //       [field]: null
  //   })

  // }
  const setField = (field, value) => {
    setData({ ...data, [field]: value });
    props.tieuchi({
      id: props.id,
      mucTieu: data?.mucTieu ? data.mucTieu : [],
      tenTC: data?.tenTC ? data.tenTC : "",
      noiDung: data?.noiDung ? data.noiDung : ""
    });
    if (!!errors[field]) setErrors({
      ...errors,
      [field]: null
    })
  };
  return (
    <div className='mb-4'>

      <div className='form-group d-flex'>
        <span className="input-group-text bg-primary text-white" >Tiêu chí: {props.id} </span>
        <input
          className="form-control"
          placeholder="nhập tiêu chí"
          onChange={(e) => {
            setField("tenTC", e.target.value);
          }}
        />

        <button type="button" className="btn-success btn"
          onClick={() => {
            setSoMT(soMT + 1)
          }}
        >+</button>
      </div>
      <div className="input-group">
        <span className="input-group-text bg-primary text-white mb-2" >Nội dung: {props.id} </span>
        <input
          placeholder="nhập nội dung"
          className="form-control mb-2"
          onChange={(e) => {
            setField("noiDung", e.target.value);
          }}
        />
      </div>
      {renderTL}
    </div>
  );
}
