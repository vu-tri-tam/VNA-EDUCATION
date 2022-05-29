import React from 'react'

const TitleBreadcrumb = ({title, subTitile, pathHome = ""}) => {
  
    return (
        <div className="page-title">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                    <h3>{title}</h3>
                    <p className="text-subtitle text-muted">{subTitile}</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 d-flex col-xs-flexstart align-items-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href={`/${pathHome}`}>Trang chủ</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{title}</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default TitleBreadcrumb
