import React, { useState } from 'react';
import { Accordion, Card, } from 'react-bootstrap';
import HSKhoi10 from './HSGioiTK/HSKhoi10';
import HSKhoi11 from './HSGioiTK/HSKhoi11';
import HSKhoi12 from './HSGioiTK/HSKhoi12';
import '../../css/ThongKe.css';

const XepHangHS = () => {
    const [key, setKey] = useState('khoi10');
    return (
        <>
            <div className="button-thongke mt-box-5">
                <h5>Xếp hạng học sinh giỏi theo từng khối</h5>
                <div>
                    <Accordion onSelect={(e) => setKey(e)} activeKey={key} id="hs">
                        <Card>
                            <Accordion.Toggle className="color-xepHang" as={Card.Header} eventKey="khoi10">
                                Khối 10
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="khoi10">
                                <Card.Body>
                                    <HSKhoi10 />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card >
                            <Accordion.Toggle className="color-xepHang" as={Card.Header} eventKey="khoi11">
                                Khối 11
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="khoi11">
                                <Card.Body>
                                    <HSKhoi11 />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle className="color-xepHang" as={Card.Header} eventKey="khoi12">
                                Khối 12
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="khoi12">
                                <Card.Body>
                                    <HSKhoi12 />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>
        </>
    )
}

export default XepHangHS;