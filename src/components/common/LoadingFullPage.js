import React from 'react'
import imgloading from '../../assets/vendors/svg-loaders/oval.svg'

const LoadingFullPage = () => {
    return (
        <div className="d-flex justify-content-center align-items-center"
            style={{ height: '200px' }}>
            <img src={imgloading} style={{ width: "3rem" }}
                alt="loading ... "></img>
        </div>
    )
}

export default LoadingFullPage
