import React, { useState, useEffect } from 'react';
import UserProfile from '/src/Pages/User.jsx';
import MovieDetails from '/src/Pages/Moviedetails.jsx';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const url = 'http://127.0.0.1:5555';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // New state for selected movie

  const navigate = useNavigate();

  useEffect(() => {
    fetch(url + '/movies')
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleMovieClick = (movie) => {
    console.log('Movie clicked:', movie);
    setSelectedMovie(movie); // Set the selected movie
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div style={{ color: 'white' }}>
      <p>List of Movies</p>
      <ul className="flex space-x-4">
        {movies.map((movie) => (
          <li key={movie.id} onClick={() => handleMovieClick(movie)}>
            <img src={`https://image.tmdb.org/t/p/w92${movie.img_url}`} alt={movie.title} />
          </li>
        ))}
      </ul>

    
    </div>
  );
}

export default Movies;
