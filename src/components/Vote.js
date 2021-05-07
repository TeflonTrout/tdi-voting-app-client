import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const Vote = () => {
    const history = useHistory();

    const [user, setUser] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        async function loadData() {
            await axios.get('https://tdi-voting.herokuapp.com/votes/movie-list')
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
        const userBallot = {user: user, movies: [...data]}
        console.log("SUBMISSION: ", userBallot)
        await axios.post('https://tdi-voting.herokuapp.com/votes/ballot', userBallot)
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
                        <input type="text" placeholder="Enter Name" value={user} onChange={e => handleUserChange(e)}/>
                    </div>
                        {data.length > 0 
                        ? data.map(movie => (
                            <div key={movie._id} className='movie'>
                                <h1>{movie.title}</h1>
                                <h3>Points: <input type="number" min='1' max={data.length} onChange={e => handleRatingChange(e, movie.id)}/></h3>
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
