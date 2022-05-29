import React, { useState } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'

export default function MutiplateSelect(props) {
    const { data } = props
    const [value, setvalue] = useState([])

    const handleOnchange = val => {
        const weekList = val.split(',');
        setvalue(weekList)

    }

    const options = data?.map((e, i) => {
        return { label: e.tenTuan, value: e._id }
    })
    // console.log(options, 'option')


    return (
        <div className="app">


            <MultiSelect
                onChange={handleOnchange}
                options={options}
            />
        </div>
    );



}
