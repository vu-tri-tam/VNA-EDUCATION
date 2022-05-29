import React from 'react'
import swal from 'sweetalert'


export default function customAlert(title, ApiRequest, getApiRequest) {
    // console.log(title, ApiRequest, getApiRequest, handleState, 7788899)//undefined
    return swal({
        title: title,
        text: "Cân nhắc kỹ trước khi bạn thực hiện điều này!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(async (res) => {
        if (res) {
            swal("Thành công", {
                icon: "success",
                buttons: false
            });
            ApiRequest.then(() => {
                getApiRequest();
                // handleState(false);
            })

            // window.location.reload()
        } else {
            swal("Đã hủy!");
        }
    });
}

