import React, { useRef } from 'react'

const ModelDiem = ({modelname, addCol}) => {
    const valRef = useRef()
    return (
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Thêm điểm </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label className="form-label">{modelname && modelname}</label>
                        <input type="number" className="form-control" ref={valRef} defaultValue="0" />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="submit" className="btn btn-primary" onClick={() => addCol("mieng", valRef.current.value) }
                      data-bs-dismiss="modal">Lưu thay đổi</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ModelDiem
