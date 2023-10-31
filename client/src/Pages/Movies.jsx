// src/Movies.js
import React, { useState, useEffect } from 'react';

const url = 'http://127.0.0.1:5555'

const api_key = 'c9ec267ab1d062779039d92435621a6b'


function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(url + '/movies')
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Movies</h1>
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

export default Movies;
