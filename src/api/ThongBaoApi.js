import axiosConfig from "./axiosConfig"

const ThongBaoApi = {
     getThongBao: () => {
          return axiosConfig.get(`/thong-bao`)
     },
     getQuanTri: () => {
          return axiosConfig.get(`/nguoi-dung`)
     },
     add: (data) => {
          return axiosConfig.post(`/thong-bao`, data)
     },
     remove: (id) => {
          return axiosConfig.delete(`/thong-bao/${id}`)
     },
     Edit: (id) => {
          return axiosConfig.get(`/thong-bao/${id}`)
     },
     update: (id, data) => {
          return axiosConfig.patch(`/thong-bao/${id}`, data)
     }

}

export default ThongBaoApi