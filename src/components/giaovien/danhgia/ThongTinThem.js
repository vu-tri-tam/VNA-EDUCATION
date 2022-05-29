import React from 'react'
import { Bar } from 'react-chartjs-2';
import { BsChevronDown } from "react-icons/bs";

const ThongTinThem = ({state}) => {
    
    // Trả về arr tieuchi-muctieu theo index vd: index=1 > [i1, j1, k1]  
    const getData = (index) => {
        // chart
        let formHS = state.danhGiaDetail.chiTiet.map(hs => {
            return hs.formDG[0]
        })
        let arrValues = formHS.map(x => {
            return Object.values(x)[index - 1 ]
        });        
        return arrValues
    }

    /* Trả về config dataset
        : return [
            {
                label: tieu_chi1-muc_tieu2,
                data: [10, 8, 9, 10], // vd 4 học sinh có tc1-mt2 
                backgroundColor: color
            }, {...}
        ] 
    */
    const datasetF = () => {
        let arr = []
        let color = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)'
        , '#a29bfe', '#ffeaa7', '#74b9ff', '#82ccdd', '#b8e994', 
        '#ffcccc', '#d2dae2', '#f53b57', '#ff793f']
        if (state.danhGiaDetail) {
            let formHS = state.danhGiaDetail.chiTiet[0]?.formDG[0]
            if (formHS !== undefined) {
                for (let i = 0; i < Object.keys(formHS).length; i++) {
                    arr.push({
                        label: `${Object.keys(formHS)[i]}`,
                        data: getData(i+1),
                        backgroundColor: color[i+1],
                    })
                }
            }
        }
        return arr
    }

    // return arr [hs1 ,hs2, ...] 
    const labelsHS = () => {
        if (state.danhGiaDetail ) {
            return state.danhGiaDetail.chiTiet.map((e,i) => `học sinh ${i+1}`)
        }
    }

    // chart config
    const data = {
        labels: labelsHS(),
        datasets: datasetF(),
    };
      
    const options = {
    scales: {
        yAxes: [
        {
            ticks: {
            beginAtZero: true,
            },
        },
        ],
    },
    };

    return (
        <div className="accordion" id="cardAccordionx">
        <div className="card">
            <div className="card-header ps-0 " id="headingOne" data-bs-toggle="collapse"
                data-bs-target="#collapseOne" aria-expanded="false"
                aria-controls="collapseOne" role="button">
                <span className="collapsed collapse-title me-3">Xem các tiêu chí & mục tiêu </span>
                <BsChevronDown />
            </div>
            <div id="collapseOne" className="collapse pt-1" aria-labelledby="headingOne"
                data-parent="#cardAccordionx">
                <div className="row p-2">
                {state.danhGiaDetail.tieuChi.map((tieuchi, index) => (
                        <div className="mb-3 " key={index}>
                            <div className=" row" >
                                <div className="col-lg-8 col-md-8 col-sm-12">
                                    <h5 className="alert-heading">Tiêu chí {index + 1}: {tieuchi.tenTC} </h5>
                                    <p>Mô tả: {tieuchi.noiDung}</p>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12 col-sx-12">
                                </div>
                                {tieuchi.mucTieu.map((jtem, index2) => (
                                        <div className="my-1 " key={index2}>
                                            <div style={{ paddingRight: 0, borderLeft: "2px solid #c2ccef" }}>
                                                <div className="alert alert-light-primary m-0" >
                                                    <p className="mb-0"><b>Mục tiêu {index2 + 1}: {jtem.noiDung }</b></p>
                                                </div>
                                            </div>
                                        </div> 
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-header ps-0 " id="headingOne" data-bs-toggle="collapse"
                data-bs-target="#collapseTwo" aria-expanded="false"
                aria-controls="collapseTwo" role="button">
                <span className="collapsed collapse-title me-3">Xem dạng biểu đồ</span>
                <BsChevronDown />
            </div>
            <div id="collapseTwo" className="collapse pt-1" aria-labelledby="headingOne"
                data-parent="#cardAccordionx">
                <div className="row p-2">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    </div>
    )
}

export default ThongTinThem
