import axiosConfig from "../axiosConfig";

export const PasswordApi = {
    changePass: (data) => {
        return axiosConfig.post(`doi-mat-khau/`, data)
    }
}