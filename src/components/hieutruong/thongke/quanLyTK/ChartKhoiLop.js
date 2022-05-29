import React, { useState } from "react";
import { Tabs, Tab } from 'react-bootstrap';
import ChartKhoi10 from "./Chart/ChartKhoi10";
import ChartKhoi11 from "./Chart/ChartKhoi11";
import ChartKhoi12 from "./Chart/ChartKhoi12";
import '../../css/ThongKe.css';

const ChartKhoiLop = () => {
    const [key, setKey] = useState('khoi10');
    return (
        <>
            <div className="button-thongke mt-box-5">
                <h5>Bảng thống kê lượng đánh giá theo tuần</h5>
                <div className="tabs-thongke">
                    <Tabs transition={false} onSelect={(e)=>setKey(e)} activeKey={key} id="thongKe">
                        <Tab eventKey="khoi10" title="Khối 10">
                            <ChartKhoi10 />
                        </Tab>
                        <Tab eventKey="khoi11" title="Khối 11">
                            <ChartKhoi11/>
                        </Tab>
                        <Tab eventKey="khoi12" title="Khối 12">
                            <ChartKhoi12/>
                        </Tab>
                    </Tabs> 
                    
                </div>
            </div>
        </>
    )
}
export default ChartKhoiLop;