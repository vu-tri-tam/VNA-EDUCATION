import axiosConfig from "./axiosConfig"

const LoginApi = {
    login: (data) => {
        return axiosConfig.post('dang-nhap', data)
    }
}

export default LoginApi 