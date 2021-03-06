import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [title, setTitle] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const API_KEY = "08bd865f79a8f129e927b69c5220d722"
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}&include_adult=false&language=en-US&page=1`;

    useEffect(() => {
        if (window.innerWidth < 900) {
            setIsMobile(true);
        }
        updateList();
        console.log(API_KEY)
    },[])

    const addMovie = async (title) => {
        await axios.post('https://tdi-voting.herokuapp.com/votes/movie-list', {id: Date.now(), title: title})
        setTitle("");
        setSuggestions([])
        updateList();
    }

    const updateInput = (e) => {
        e.preventDefault();
        setTitle(e.target.value)
    }

    useEffect(() => {
        if(title === "") {
            setSuggestions([])
        }
        if (title !== "") {
            axios.get(url)
            .then(res => {
                setSuggestions(res.data.results)
            })
        }
    }, [title])


    const updateList = async () => {
        await axios.get('https://tdi-voting.herokuapp.com/votes/movie-list')
            .then(res => {
                setMovieList(res.data)
                return movieList
            })
    }

    const removeMovie = async (e, _id) => {
        e.preventDefault();
        await axios.delete(`https://tdi-voting.herokuapp.com/votes/${_id}`)
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
                {suggestions 
                ? <div className={suggestions.length > 1 ? 'suggestions' : "" }>
                    {suggestions.slice(0,5).map(movie => {
                        return(
                        <div key={movie.id}>
                            <p onClick={e => addMovie(movie.title)}>{movie.title.slice(0,30)}{movie.title.length > 30 ? "..." : ""}</p>
                        </div>
                        )
                    })}
                </div>
                : ""
                }
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
