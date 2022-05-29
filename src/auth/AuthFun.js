import Cookies from "js-cookie";
import { sucAlert } from "../components/common/CustomAlert";

export const getIdUser = () => {
    let idEC = Cookies.get("_token")
    let id = decodeToken(idEC)
    return id
}

// lưu data và redirect 
export const StoreAndRedirect = (username, id, time ) => {
    let role = username.substring(0,2) // HS
    let pathRole = getPath(role) // /hoc-sinh

    sucAlert('Đăng nhập thành công')
        .then(() => {
            let newToken = encodeToken(id, role) // _id , HS
            if (time) {
                Cookies.set('_token', newToken, {expires : 0.5})
            } else {
                Cookies.set('_token', newToken)    
            }
        })
        .then(() => window.location.href = pathRole)
}

// Mã hóa token + role vd abcdef => abhcsefs
export const encodeToken = (token, role) => {
    let newArrRole1 = role.toLowerCase().split("")[0]
    let newArrRole2 = role.toLowerCase().split("")[1]
    let tokenR1 = token.slice(0, 2) + newArrRole1 + token.slice(2);
    let tokenR2 =  tokenR1 + newArrRole2;
    return tokenR2
}

// giả mã token mã hóa thành => token nguyên bản 
export const decodeToken = (token) => {
    let tokenDecode = token.replace(token.charAt(2),"").replace(token.charAt(token.length-1),"")
    return tokenDecode
}

// giả mã token mã hóa thành role
export const decodeTokenRole = (token) => {
    return token.slice(2, 3) + token.slice(-1) 
}

// nhận mã người dùng vd QT001 => Quản trị viên
export const returnRoleStr = (role) => {
    switch (role.substring(0,2)) {
        case 'QT':
            return "Quản trị viên"
        case 'HS':
            return "Học sinh"
        case 'PH':
            return "Phụ Huynh"
        case 'GV':
            return "Giáo viên"
        case 'HT':
            return "Hiệu trưởng"
        default:
            break;
    }
}

// nhận mã người dùng vd QT => đường dẫn "/quan-ly"
export const getPath = (role) => {
    let pathByRole = undefined
        switch (role.toUpperCase()) {
            case 'QT': pathByRole = "/quan-ly"
                break;
            case 'HS': pathByRole = "/hoc-sinh" 
                break;
            case 'PH': pathByRole = "/phu-huynh"
                break;
            case 'GV': pathByRole = "/giao-vien"
                break;
            case 'HT': pathByRole = "/hieu-truong"
                break;
            default:
                pathByRole = undefined
                break;
            }
    return pathByRole
}