import React, { useState, useEffect } from 'react'
import SyncLoader from "react-spinners/SyncLoader";
export default function LoaddingScreen() {
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("red");
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)

    }, [])
    return (
        <>
            <SyncLoader color={color} loading={loading} size={10} />
        </>
    )
}
