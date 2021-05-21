import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const Vote = () => {
    const history = useHistory();
    // const URL = "https://tdi-voting.herokuapp.com"
    const URL = "http://localhost:5000"
    const [user, setUser] = useState("Nicholas");
    const [data, setData] = useState([]);
    const names = ["Nicholas", "Mike", "Chris", "Christian", "JT", "Dom", "Other1", "Other2", "Other3"]

    useEffect(() => {
        async function loadData() {
            await axios.get(`${URL}/votes/movie-list`)
            .then(res => {
                setData(res.data)
            })
        }
        loadData();
    }, [])

    function handleUserChange(e) {
        e.preventDefault();
        setUser(e.target.value)
    }

    async function submitBallot(e) {
        e.preventDefault();
        const userBallot = {user: user, totalMovies: (data.length), movies: [...data]};
        console.log("SUBMISSION: ", JSON.stringify(userBallot))
        await axios.post(`${URL}/votes/archive`, userBallot)
        await axios.post(`${URL}/votes/ballot`, userBallot)
            .then(res => {console.log(res)})
            .then(() => {
                history.push('/')
            }) 
    }

    const handleRatingChange = (e, id) => {
        e.preventDefault();
        setData(data.map(movie => {
            if(movie.id === id) {
                return {...movie, ranking: e.target.valueAsNumber}
            }
            return movie
        }))
    }

    return (
        <div className='ballot-page'>
            <div className="container">
                <h1>Ballot</h1>
                <form action="submit" onSubmit={e => submitBallot(e)}>
                    <div className="user-container">
                        <h2>User: </h2>
                        <select type="text" placeholder="Enter Name" value={user} onChange={e => handleUserChange(e)}>
                            {names.map(name => {
                                return(
                                    <option key={name} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>
                        {data.length > 0 
                        ? data.map(movie => (
                            <div key={movie._id} className='movie'>
                                <h1>{movie.title}</h1>
                                <h3>Points: <input type="number" min='1' max={data.length} required={true} onChange={e => handleRatingChange(e, movie.id)}/></h3>
                            </div>
                        ))
                        : <div><h1>No Movies</h1></div>
                        }
                    <button className='submit-btn' type="submit">Submit Ballot</button>
                    <Link to="/" className='back-btn' type="submit">Back</Link>
                </form>
            </div>
        </div>
    )
}

export default Vote
