import React from "react";

export default function CauTraLoi(props) {
  return (
    <div>
      <label>Mục tiêu: {props.id}</label>
      <div style={{ marginLeft: '2%' }} className="d-flex">
        <input
          className="form-control mb-2"
          placeholder="Nội dung mục tiêu"
          onChange={(e) => {
            props.muctieu(props.tieuChiId, {
              noiDung: e.target.value,
              id: props.id
            });
          }}
        />
        <button type="button" className="btn-danger btn mb-2" onClick={() => { props.handleGiam(props.data) }}>-</button>
      </div>
    </div>
  );
}
