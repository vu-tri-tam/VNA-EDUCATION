import React from 'react'
import MainImg from "../../assets/images/va.jpg"
import a1 from "../../assets/images/a1.jpeg"
import a2 from "../../assets/images/a2.jpeg"
import { BiBook } from "react-icons/bi";
import { RiGovernmentFill, RiBarChartLine } from "react-icons/ri";
import {Link} from 'react-router-dom'

const AboutUs = () => {
    return (
        <div className="banner-sm position-relative " style={{marginTop:"90px"}}>
           <div className="container">
                <div className="row d-flex justify-content-center">
                       <div className="col-md-8 col-12">
                            <h2 className="text-center">VỀ CHÚNG TÔI</h2>
                            <p className="divi"></p>
                            <p style={{fontSize: "1.4rem", textAlign: "center"}}> <b>VNA GROUP</b> là công ty công nghệ với đội ngũ trẻ nhiệt huyết và tài năng, mong muốn mang đến các giải pháp chuyển đổi số chất lượng và hiệu quả cao.</p>
                       </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-8">
                        <img src={MainImg}
                         style={{width: '100%', objectFit: "cover" ,height: "400px"}} alt="aboutimg" />
                    </div>
                    <div className="col-md-4" style={{ textAlign: "justify"}}>
                        <h3 className="text-start">Quá trình hình thành</h3>
                        <p className="divi-left"></p>
                        <p style={{fontSize : "1.3rem"}}>Chính thức thành lập vào năm 2020 với mục tiêu đầu tiên là trở thành một trong những ngòi nổ chính thúc đẩy nhanh tiến trình chính phủ điện tử của nhà nước. Đội ngũ VNA hướng đến việc tạo ra những đột phá thực sự trong công cuộc chuyển đổi số của Việt Nam, từ đó đưa công nghệ Việt vươn tầm quốc tế. </p>
                        <Link to="/lien-he" className="btn btn-primary">LIÊN HỆ CHÚNG TÔI</Link>
                    </div>
                </div>
            </div>

            <div className=" my-5 backgroundImg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 my-3 d-flex flex-column align-items-center justify-content-center">
                            <BiBook size={50} color="white" />
                            <h3 style={{color: "white"}}>Các đơn vị giáo dục</h3>
                            <h1 style={{color: "white"}}>20 + </h1>
                        </div>
                        <div className="col-md-4 my-3 d-flex flex-column align-items-center justify-content-center" >
                            <RiGovernmentFill size={50} color="white"  />
                            <h3 style={{color: "white"}}>Các cơ quan nhà nước</h3>
                            <h1 style={{color: "white"}}>20 + </h1>
                        </div>
                        <div className="col-md-4 my-3 d-flex flex-column align-items-center justify-content-center">
                            <RiBarChartLine size={50} color="white"  />
                            <h3 style={{color: "white"}}>Các DN trong và ngoài nước</h3>
                            <h1 style={{color: "white"}}>50 + </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-3 mb-5" >
               
                <div className="row my-2">
                    <div className="col-md-8">
                        <h3 className="text-start">Kiến tạo giá trị doanh nghiệp</h3>
                        <p className="divi-left"></p>
                        <p style={{fontSize : "1.3rem"}}>Chúng tôi tạo dựng một môi trường làm việc nhân văn, sáng tạo, thịnh vượng và công bằng. Các thành viên được đối xử bình đẳng, được tạo cơ hội phát triển, được tôn trọng và hợp tác cùng nhau. Hướng đến xây dựng tổ chức học tập, nơi mọi người sẻ chia sự hiểu biết chuyên môn của bản thân để giúp nhau cùng tiến bộ đồng thời luôn tiếp thu các kiến thức mới từ đối tác, khách hàng</p>
                    </div>
                    <div className="col-md-4">
                        <img src={a2} alt="anh2" style={{width: '100%', height: 200 ,objectFit: 'cover'}} />
                    </div>
                </div>

                <div className="row my-3 ">
                    <div className="col-md-4">
                        <img src={a1} alt="anh1" style={{width: '100%', height: 300 ,objectFit: 'cover'}} />
                    </div>
                    <div className="col-md-8">
                        <h3 className="text-start">Tầm nhìn</h3>
                        <p className="divi-left"></p>
                        <p style={{fontSize : "1.3rem"}}>
                            Trở thành tổ hợp công nghệ hàng đầu tại Việt Nam và có sản phẩm, dịch vụ cạnh tranh hiệu quả trên thị trường quốc tế trong 5 năm tới.
                        </p>
                        <h3 className="text-start">Phụng sự xã hội</h3>
                        <p className="divi-left"></p>
                        <p style={{fontSize : "1.3rem"}}>
                        Chúng tôi định hướng phát triển các sản phẩm phần mềm, dịch vụ tiên tiến phục vụ công tác đào tạo, bồi dưỡng, nâng cao năng lực cho đội ngũ lao động tại các doanh nghiệp, tổ chức; nâng cao năng suất, chất lượng, gia tăng hiệu quả hoạt động. Không chấp nhận tình trạng đứng im tại chỗ mà liên tục chinh phục những thách thức mới để đạt được những mục tiêu to lớn hơn phục vụ cộng đồng xã hội
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
