import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';

const ChartKhoi11 = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        chart()
    },[])
    const chart = () => {
        setChartData({
            labels: ['11A1', '11A2', '11A3', '11A4', '11A5', '11A6', '11A7', '11A8', '11A9'],
            datasets: [
                {
                    label: '# of Votes',
                    data: [11, 12, 8, 15, 22, 18, 14, 17, 15],
                    backgroundColor: [
                        '#11cdef'
                    ],
                    borderWidth: 2,
                    barPercentage: 0.4,
                }
            ]
        })
    }
    return (
        <>
            <div>
                <Bar data={chartData} options={{
                    responsive: true
                }} />
            </div>
        </>
    )
}

export default ChartKhoi11;