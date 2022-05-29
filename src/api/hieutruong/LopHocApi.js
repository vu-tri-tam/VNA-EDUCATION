import axiosConfig from "../axiosConfig"

const LopHocApi = {
    getAll: () => {
        return axiosConfig.get(`lop-hoc`) 
    },
    get: (id) => {
        return axiosConfig.get(`lop-hoc/${id}`)
    }
}

export default LopHocApi