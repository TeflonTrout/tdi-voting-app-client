import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Data = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                await axios.get(`http://localhost:5000/votes/genre`)
                    .then(res => {
                        res.data.map(item => {
                            return (setData(prevState => (
                                [...prevState, 
                                    {id: item._id, count: item.count}]
                            )))
                        })
                    })
                    } catch(error) {
                console.log(error.message)
            }
        }
        loadData();
    }, [])

    return (
        <div>
            <h2>Genre | Count</h2>
            {data.length < 1 ? "Loading / No Data" : ""}
            {data 
            ?   data.map(item => {
                return(
                    <div key={item.id}>
                        <p>{item.id} | {item.count}</p>
                    </div>
                )
            })
            :" Loading ..."}
        </div>
    )
}

export default Data
