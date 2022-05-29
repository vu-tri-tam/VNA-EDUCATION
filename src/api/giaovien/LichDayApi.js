import axiosConfig from "../axiosConfig"

const LichDayApi = {
    getByTuanVaId: (id, week) => {
        return axiosConfig.get(`lich-day?gv=${id}&tuan=${week}`)
    }
 }

export default LichDayApi