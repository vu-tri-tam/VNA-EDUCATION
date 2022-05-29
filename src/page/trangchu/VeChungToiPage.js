import React from 'react'
import Navbar from '../../components/trangchu/navbar'
import Footer from '../../components/trangchu/footer'
import AboutUs from '../../components/trangchu/AboutUs';

const VeChungToiPage = () => {
    document.title ="Về chúng tôi | VNA EDUCATION"
    return (
        <>
            <Navbar />
            <AboutUs />  
            <Footer />
        </>        
    )
}

export default VeChungToiPage
