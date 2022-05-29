import React from 'react'
import Contact from '../../components/trangchu/Contact';
import Navbar from '../../components/trangchu/navbar'
import Footer from '../../components/trangchu/footer'

const LienHePage = () => {
    document.title ="Liên hệ | VNA EDUCATION"

    return (
        <>
            <Navbar />
            <Contact />  
            <Footer />
        </>
    )
}

export default LienHePage
