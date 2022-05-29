export const  removeAccents = (str)  => {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ", "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"    
    ];
    for (var i=0; i<AccentsMap.length; i++) {
        var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str;
}

export const renderZero = (data, exten = "") => {
    if (data.length > 0) {
        return data.join(`${exten}, `)
    } else return 0
}

export const renderChuaCapNhat = (data,sub = "") => {
    if (data !== "") {
        return `${data} ${sub}`
    } else return "chưa cập nhật"
}

export const checkTuTucTieu = (str) => {
    let valueInput = str.toLowerCase()

    let arr = ['nứng' , 'loz', 'lolz', 'lone', 'lồz' ,'lồn' ,
    'Lồn' ,'đĩ' , 'Đĩ' , 'đỉ' , 'cặc', 'cc' , 'ncc', 'fuck',
    'Fuck','bitch', 'Bitch', 'đụ' , 'Đụ' , 'đm' , 'Đm' , 'ĐM' ,
    'dm' ,'Dm' , 'DM' ,'đmm' , 'Đmm' ,'dmm' ,'Dmm' ,'cl' , 'clm' ,
    'clmm','clgt' ,'Clgt', 'đéo','Đéo', "lon", "vai", "vl" ]

    arr.forEach(word => {
        if (valueInput.includes(word)) {
            let str = ""
            for (let i = 0; i <  word.length; i++) {
                str += "*"
            }
            valueInput = valueInput.replace(word, str);
        } 
        
    })
    return valueInput
} 