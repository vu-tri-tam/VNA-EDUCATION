import Swal from "sweetalert2";
import Cookies from 'js-cookie'

const LogoutAlert = () => {
    return Swal.fire({
        icon: 'warning',
        title: 'Bạn muốn đăng xuất chứ',
        showDenyButton: true,
        confirmButtonColor: "#435ebe",
        confirmButtonText: `Thoát`,
        denyButtonText: `Không`,
      }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.removeItem("token"); 
            localStorage.removeItem("token");
            Cookies.remove('_token')
            window.location.href = "/"
        }
      })
}

export const errAlert = (text) => {
  return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
      confirmButtonText: 'Nhập lại!',
      confirmButtonColor: '#435ebe',
  })
}

export const sucAlert = (text) => {
  return Swal.fire({
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1500
    })
}

export const hsPostDGAlert = () => {
  return Swal.fire({
      title: 'Bạn có chắc chứ?',
      text: "Bạn chỉ có thể làm đánh giá một lần!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2ecc71',
      cancelButtonColor: '#d33',
      cancelButtonText: "Để xem lại",
      confirmButtonText: 'Có lưu lại!'
  })
}
export const htPatchDuyetAlert = () => {
  return Swal.fire({
      title: 'Bạn có chắc chứ?',
      text: "Khi bạn duyệt giáo viên sẻ nhìn thấy được các bình luận từ học sinh!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2ecc71',
      cancelButtonColor: '#d33',
      cancelButtonText: "Để xem lại",
      confirmButtonText: 'Có lưu lại!'
  })
}

export default LogoutAlert