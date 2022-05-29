import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';

const ChartKhoi10 = () => {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        chart()
    },[])
    const chart = () => {
        setChartData({
            labels: ['10A1', '10A2', '10A3', '10A4', '10A5', '10A6', '10A7', '10A8', '10A9'],
            datasets: [
                {
                    label: '# of Votes',
                    data: [10, 12, 8, 15, 22, 18, 14, 17, 15],
                    backgroundColor: [
                        '#2dce89'
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
                    responsive: true,
                    title:{test: ''}
                }} />
            </div>
        </>
    )
}

export default ChartKhoi10;