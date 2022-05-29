
import React, { useState } from 'react';
import BangTinItem from './BangTinItem';
import TitleBreadcrumb from '../common/TitleBreadcrumb';

const BangTin = () => {
    const [posts] = useState(null);
    document.title = "Bảng tin | VNA EDUCATION";

    const sortByIdCata = (id) => {
        return posts.filter(item => item.id_catalog === id)
    }
    return (
        <>
            <div className="page-heading">
                <TitleBreadcrumb title="Thống kê" subTitile="Ý kiến đóng góp liên hệ cskh@gmail.com" pathHome="hoc-sinh" />
                <section className="section ">
                    <div className="card shadow-sm mb-3">
                        <div className="card-body">
                            {/* posts contaiber */}
                            <div className="row">
                                {/* posts list Thông tin học tập */}
                                <div className="col-lg-4 col-md-6" >
                                    <h4 className="mb-3">Thông tin học tập</h4>
                                   {/* post */}
                                    {posts && <BangTinItem listItem={sortByIdCata(1)} />}
                                </div>
                                
                                {/* posts list Thông tin hoạt động */}
                                <div className="col-lg-4 col-md-6" style={{borderLeft: '1px solid #f1f1f1'}}>
                                    <h4 className="mb-3">Thông tin hoạt động</h4>
                                    {/* post */}
                                    {posts && <BangTinItem listItem={sortByIdCata(2)} />}

                                </div>
                                {/* posts list Thông tin học phí */}
                                <div className="col-lg-4 col-md-12" style={{borderLeft: '1px solid #f1f1f1'}}>
                                    <h4 className="mb-3">Thông tin học phí</h4>
                                    {/* post */}
                                    {posts && <BangTinItem listItem={sortByIdCata(3)} />}

                                </div>
                            </div>                            
                        </div>
                    </div>
                </section>
            </div>  
        </>
    )
};

export default BangTin;