import React, { useState, useEffect } from 'react';

const url = 'http://127.0.0.1:5555'

const api_key = 'c9ec267ab1d062779039d92435621a6b'


function Homepage() {
  const [movies, setMovies] = useState([]);



  return (
    <div>
      <h1 style={{ color: 'white' }}>Home - List of Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w92${movie.img_url}`} alt={movie.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}  

export default Homepage;
