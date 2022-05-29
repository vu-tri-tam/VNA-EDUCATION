import { removeAccents } from "../../hocsinh/helper/HocSinhHelper"

const DanhGiaReducer = (state, action) => {

    let { type, payload } = action

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
            let res = payload.danhgia.filter(DGCN => {
                return DGCN.choGVCN === state.onChuNhiem
            })
            return {
                ...state,
                listDanhGia: res,
                clone: payload.danhgia,
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
            state.listDanhGia = state.clone
            let listTypeGV = []
            let bool = true
            if (parseInt(payload) === 0) bool = true
            if (parseInt(payload) === 1) bool = false
            listTypeGV = state.listDanhGia.filter(DGCN => {
                return DGCN.choGVCN === bool
            })
            return {
                ...state,
                listDanhGia: listTypeGV,
                onChuNhiem: bool
            }

        case "SEARCH_DANHGIA":
            state.listDanhGia = state.clone
            let query = removeAccents(payload.toLowerCase().trim())
            let newarr = []
            if (query !== "") {
                newarr = state.listDanhGia.filter(item => {
                    return removeAccents(item.monHoc.toLowerCase()).includes(query)
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
                danhGiaDetail: payload,
            }
        case "PATCH_DANHGIA_PHEDUYET":
            console.log(payload);
            return {
                ...state,
            }

        case "FETCH_LOP":
            return {
                ...state,
                isLoading: true,
                listLopHoc: payload,
                clone: payload
            }
        case "FETCH_MON":
            let op = []
            payload.forEach(mon => {
                op.push({ value: mon.tenMH, label: mon.tenMH })
            });
            op.push({ value: "Sinh hoạt", label: "Sinh hoạt" })
            return {
                ...state,
                ListMonHoc: payload,
                MonOption: op
            }
        case "CHANGE_MULTI_MON":
            state.listDanhGia = state.clone.filter(e => e.choGVCN === state.onChuNhiem)
            // state.listDanhGia = state.clone
            let strArr = []
            let newarr2 = []
            payload.forEach(mon => {
                strArr.push(mon.value)
            });
            if (strArr.length > 0) {
                strArr.forEach(e => {
                    state.listDanhGia.forEach(item => {
                        if (item.monHoc !== null && item.monHoc.tenMH.includes(e)) {
                            newarr2.push(item)
                        } else if (item.monHoc === null && e === "Sinh hoạt") {
                            newarr2.push(item)
                        }
                    })
                })
                newarr2.filter(e => e.choGVCN === state.onChuNhiem)
            } else {
                newarr2 = state.clone.filter(e => e.choGVCN === state.onChuNhiem)
            }
            // console.log(newarr2);
            return {
                ...state,
                listDanhGia: newarr2

            }
        case "FETCH_LOP_DETAIL":
            // console.log(payload);
            return {
                ...state,
                lopDetail: payload,
            }
        case "CHANGE_CLASS":
            state.listLopHoc = state.clone
            let arrLop = []
            if (payload === "all") {
                arrLop = state.clone
            } else {
                arrLop = state.listLopHoc.filter(c => {
                    let khoi = c.maLH.replace(/(^\d+)(.+$)/i, '$1')
                    return khoi === payload
                })
            }
            return {
                ...state,
                listLopHoc: arrLop
            }
        case "SEARCH_CLASS":
            state.listLopHoc = state.clone
            let query2 = removeAccents(payload.toLowerCase().trim())
            let arrClass = []
            if (query2 !== "") {
                arrClass = state.listLopHoc.filter(item => {
                    return removeAccents(item.maLH.toLowerCase()).includes(query2)
                })
            } else {
                arrClass = state.clone
            }

            return {
                ...state,
                listLopHoc: arrClass
            }

        default:
            return state;
    }

}

export default DanhGiaReducer
