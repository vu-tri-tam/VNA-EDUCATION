import {removeAccents} from "../helper/HocSinhHelper"

const DanhGiaReducer = (state, action) => {
     
    let {type, payload} = action

    switch (type) {
        case "FETCH_TUAN":
            let tuanMatDinh = payload.tuanHoc[0]
            // console.log(payload);
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
        case "CHANGE_STATUS":
            state.listDanhGia = state.clone;
            let data = []
            switch (payload) {
                case "0":
                    data = state.clone
                    break;
                case "1":
                    state.listDanhGia.forEach(dg => {
                        if (dg.hocSinhDG && dg.hocSinhDG.trangThai) data.push(dg)
                    })
                    break;
                case "2":
                    state.listDanhGia.forEach(dg => {
                        if (dg.hocSinhDG && !dg.hocSinhDG.trangThai) data.push(dg)
                    })
                    break;
            
                default:
                    break;
            }
            return {
                ...state,
                listDanhGia: data
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
        case "CHECK_FORM_DETAIL":       
            let nonCheck = document.querySelectorAll('input[type="radio"]').length
            let checked = document.querySelectorAll('input[type="radio"]:checked').length
            let check = state.isCheck
            if (state.formData === null) {
                check = false     
            } else if (checked === nonCheck / 5) {
                check = true 
            } else {
                check = false
            }

            return {
                ...state,
                isCheck: check
            }
        
        case "ADD_FORM" :
            let a = {...state.formData , [payload.target.name]: parseInt(payload.target.value)}
            return  {
                ...state,
                formData : a
            }
        
        default:
            return state;
    }

}

export default DanhGiaReducer
