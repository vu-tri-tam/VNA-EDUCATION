import { removeAccents } from "../../hocsinh/helper/HocSinhHelper"

const DanhGiaReducer = (state, action) => {
     
    let {type, payload} = action

    switch (type) {
        case "FETCH_TUAN":
            let tuanMatDinh = payload.tuanHoc[0]
            return {
                ...state,
                choseweek: tuanMatDinh._id,
                arrweek: action.payload.tuanHoc,
                currweek: tuanMatDinh
            }

        case "FETCH_DANHGIA":
            let res = payload.danhgia
            let x = []
            let t = false
            if (payload.location === "gvbm") {
                t = false
            } else t = true
            x = res.filter(DG => DG.choGVCN === t)
            return {
                ...state,
                listDanhGia: x,
                clone: x,
                isLoading: true
            }
        case "STOP_LOADING":
            return {
                ...state,
                isLoading: false
            }
        case "CHANGE_WEEK":
            return {
                ...state,
                choseweek: payload
            }
        case "SEARCH_DANHGIA":
            state.listDanhGia = state.clone
            let query = removeAccents(payload.toLowerCase().trim())
            let newarr = []
            if (query !== "") {
                newarr = state.listDanhGia.filter(item => {
                    if (item?.monHoc !== null) {
                        return  removeAccents(item.monHoc.toLowerCase()).includes(query) 
                    } else return item
                })
            } else {
                newarr = state.clone
            }

            return {
                ...state,
                listDanhGia: newarr
            }

        case "FETCH_DANHGIA_DETAIL":             
            return {
                ...state,
                danhGiaDetail: payload
            }
        
        default:
            return state;
    }

}

export default DanhGiaReducer
