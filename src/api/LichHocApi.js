import axios from "axios"

const axiosConfig = axios.create({
    baseURL: "http://localhost:2077",
})

const LichHocApi = {
    getAll: () => {
        return axiosConfig.get(`tuan-hoc`)
    },
    get: (id) => {
        return axiosConfig.get(`tuan-hoc/${id}`)
    }
 }

export default LichHocApi