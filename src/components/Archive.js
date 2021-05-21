import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ArchiveCard from './ArchiveCard';

const Archive = () => {
    const [archiveData, setArchiveData] = useState([]);
    const [user, setUser] = useState();


    const URL = 'http://localhost:5000';
    const names = ["", "Nicholas", "Mike", "Chris", "Christian", "JT", "Dom", "Other1", "Other2", "Other3"]
    
    useEffect(() => {
        async function loadArchive() {
            if (user !== undefined && user !== ""){
                console.log('Loading Data for:', user)
                await axios.get(`${URL}/votes/archive/${user}`)
                .then(res => {
                    setArchiveData(res.data)
                })
            }
        }
        loadArchive();
        setUser(user)
    }, [user])

    const updateName = (e) => {
        e.preventDefault();
        const newUser = e.target.value
        setUser(newUser);
    }

    return (
        <div className='archive-page'>
            <div className="container">
                <div className="navigation">
                    <select onChange={e => updateName(e)}>
                        {names.map(name => {
                            return(
                                <option value={name} placeholder='User' key={name}>{name}</option>
                            )
                        })}
                    </select>
                    <Link to='/data'>Data</Link >
                    <Link to='/'>Back</Link >
                </div>
                <h1>Data Summary for {user}</h1>
                <div className="data-summary">

                </div>
                    {archiveData 
                    ? archiveData.map(item => (
                            <ArchiveCard className='data-card' key={item._id} data={item}/>
                    )) 
                    : "Loading..."}
                    {archiveData.length > 0 ? "" : "No Data"}
            </div>
        </div>
    )
}

export default Archive
