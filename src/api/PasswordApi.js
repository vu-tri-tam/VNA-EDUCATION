import axiosConfig from "./axiosConfig";

export const PasswordApi = {
    changePass: (token, data) => {
        return axiosConfig.patch(`nguoi-dung/${token}`, data)
    }
}