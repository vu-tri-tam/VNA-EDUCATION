import axiosConfig from "../axiosConfig"

const MonHocApi = {
    getAll: () => {
        return axiosConfig.get(`mon-hoc`) 
    },
    get: (id) => {
        return axiosConfig.get(`mon-hoc/${id}`)
    }
}

export default MonHocApi