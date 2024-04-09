import React, { useEffect, useState } from 'react'
import './App.css'
import Cards from './Cards'
import SearchIcon from './search.svg'

const API_URL ='https://www.omdbapi.com?apikey=6c298167'

const movie1 = {
    "Title": "Shrek 4-D",
    "Year": "2003",
    "imdbID": "tt0360985",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDVlOWZkNTEtNTcxZS00NDVhLWFlZWItYWFhNmZmZWNhYzU1XkEyXkFqcGdeQXVyNzMwOTY2NTI@._V1_SX300.jpg"
  }

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
        console.log(data.Search);
    }

    useEffect(() => {
        searchMovies('Marvel');
    }, []);

  return (
    <div className='name'>
        <h1>Film Flare</h1>

        <div className='search'>
            <input 
            placeholder='Search movies' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <img 
            src={SearchIcon} 
            alt='search' 
            onClick={() => searchMovies(searchTerm)}
            />
        </div>

        {
            movies?.length > 0 
            ? 
            (
            <div className='container'>
            {movies.map((movie) => (
                <Cards movie={movie} />
            ))}
            </div> 
            
         ): 
        (
            <div className='empty'>
                <h2>No movies found.</h2>
            </div>
        )
    }

    </div>
  )
}

export default App