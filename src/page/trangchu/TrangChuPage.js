import React from 'react'
import Navbar from '../../components/trangchu/navbar'
import Banner from '../../components/trangchu/banner'
import Footer from '../../components/trangchu/footer'

const TrangChuPage = () => {
    document.title ="Trang chủ | VNA EDUCATION"
    return (
        <>
            <Navbar />
            <Banner />  
            <Footer />
        </>        
    )
}

export default TrangChuPage
