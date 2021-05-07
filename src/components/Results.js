import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PolarArea } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

const Results = () => {
    const [results, setResults] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [dataArr, setDataArr] = useState([]);
    const [labelArr, setLabelArr] = useState([]);

    useEffect(() => {
        if(window.innerWidth < 900) {
            setIsMobile(true);
        }
        try {
            pullData()
        } catch(error) {
            console.error(error)
        }        
    }, [])

    const pullData = async () => {
        await axios.get('http://localhost:5000/votes/results')
        .then(res => {
            console.log('RESULTS: ', res.data)
            setResults(res.data)
            res.data.map(item => {
                setDataArr(prevData => [...prevData, item.ranking])
                setLabelArr(prevState => [...prevState, item._id])
                return (dataArr, labelArr)
            })
        })
    }

    function handleDataClear() {
        axios.delete('http://localhost:5000/votes/delete/all')
        .then(res => {
        })
        .then(window.location.reload())
    }

    return (
        <div className='results-page'>
            {isMobile ? <div className='cheater'><h1>HEY!<br/> Stop trying to peek!</h1></div> : ""}
            {/* <div className="results-container" style={{display: isMobile ? 'none' : ""}}> */}
                <div className="chart-container">
                    <h1>Results:</h1>
                    <div className="chart">
                        {results.length > 1 
                        ? <PolarArea className='result-chart'
                        data={{
                            labels: labelArr ? labelArr : [],
                            datasets: [
                                {
                                    label: labelArr ? labelArr : [],
                                    data: dataArr ? dataArr : [],
                                    backgroundColor: [
                                        '#8e00b9',
                                        '#01afe4',
                                        '#dda200',
                                        '#c7007b',
                                        'purple'
                                    ],
                                    borderWidth: 2,
                                    borderColor: "white"
                                }
                            ],
                        }}
                        options= {{
                            scales: {
                                r: {
                                    ticks: {
                                        display: true,
                                        color: 'white',
                                        showLabelBackdrop: false,
                                        stepSize: 1,
                                        font: {
                                            size: 18
                                        }
                                    },
                                    grid: {
                                        lineWidth: 2,
                                        color: '#01afe4'
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white',
                                        font: {
                                            size: '25px'
                                        }
                                    }
                                }
                            }
                        }}
                        />
                        : <h1 style={{backgroundColor: 'rgb(131,0,0)', color: 'black'}}>"No Data/Error"</h1>
                        }
                                                
                    </div>
                    <button className='delete-btn' onClick={e => handleDataClear(e)}>Delete Data</button>
                    <Link to='/' className="back-btn">Back</Link>
                </div>
            {/* </div> */}
        </div>
    )
}

export default Results
