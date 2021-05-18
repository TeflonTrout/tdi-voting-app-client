import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style.css';

const Home = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const updateList = async () => {
            await axios.get('https://tdi-voting.herokuapp.com/votes/movie-list')
                .then(res => {
                    setMovies(res.data)
                    return movies
                })
        }
        updateList()
    }, [])


    return (
        <div className='home-page'>
            <div className="button-container">
                <h1>Movie Voting</h1>
                <div className="list">
                    {movies.length > 1 ? "" : <h2>"No Movies"</h2>}
                    <ul>
                    {movies
                    ?  movies.map(item => {
                        return(
                            <li key={item.id}>
                                <h3 style={{color: 'white'}}>
                                    {item.title}
                                </h3>
                            </li>
                        )
                    })
                    : ""
                    }
                    </ul>
                </div>
                <Link className='link-btn' to='/movie-list'>Add Movies</Link>
                <Link className='link-btn' to='/vote'>Vote</Link>
                <Link className='link-btn' to='/results'>View Results</Link>
            </div>
        </div>
        )
}

export default Home
