import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [title, setTitle] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 900) {
            setIsMobile(true);
        }
        updateList();
    },[])

    const addMovie = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:5000/votes/movie-list', {id: Date.now(), title: title})
        setTitle("");
        updateList();
    }

    const updateInput = e => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const updateList = async () => {
        await axios.get('http://localhost:5000/votes/movie-list')
            .then(res => {
                setMovieList(res.data)
                return movieList
            })
    }

    const removeMovie = async (e, _id) => {
        e.preventDefault();
        await axios.delete(`http://localhost:5000/votes/${_id}`)
        await updateList();
    }

    return (
        <div className="movie-list-page" >
                {isMobile ? <h2 className='container' style={{textAlign: 'center'}}>Hey! This part is for desktop only!</h2> : ""}
            <div className="container" style={{ display: isMobile ? "none" : "" }}>
                <h1>Movie List Page</h1>
                <form onSubmit={e => addMovie(e, title)}>
                    <input type="text" value={title} onChange={e => updateInput(e)}/>
                    <button className='submit-btn' type="submit">Add</button>
                </form>
                {movieList.length > 0
                    ? movieList.map(item => (
                        <div className="movie-container" key={item._id}>
                            <h1>{item.title}</h1>
                            <button className='link-btn' onClick={e => removeMovie(e, (item._id))}>Remove</button>
                        </div>
                        )) 
                    : ""}
                <Link className='back-btn' to='/'>Back</Link>
            </div>
        </div>
    )
}

export default MovieList
