import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const Home = () => {
    

    return (
        <div className='home-page'>
            <div className="button-container">
                <h1>Movie Voting</h1>
                <Link className='link-btn' to='/movie-list'>Add Movies</Link>
                <Link className='link-btn' to='/vote'>Vote</Link>
                <Link className='link-btn' to='/results'>View Results</Link>
            </div>
        </div>
        )
}

export default Home
