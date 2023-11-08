import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import './MovieCarousel.css'; // Import the CSS file

function MovieCarousel() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/movies')
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const scrollLeft = () => {
    if (startIndex >= 4) {
      setStartIndex(startIndex - 4);
    } else {
      setStartIndex(0);
    }
  };
  
  const scrollRight = () => {
    if (startIndex <= movies.length - 8) {
      setStartIndex(startIndex + 4);
    } else {
      setStartIndex(movies.length - 4);
    }
  };
  

  const handleMovieClick = (movie) => {
    console.log('Movie clicked:', movie);
    setSelectedMovie(movie); // Set the selected movie
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className='full'>
        <p className="Popfilms" style={{ color: '#556678' }}>The social network for film lovers.</p>
      <div className="movie-container">
      <button className="scroll-button left" onClick={scrollLeft}>
        &lt; {/* Left arrow symbol */}
      </button>
        {movies.slice(startIndex, startIndex + 4).map((movie) => (
          <div key={movie.id}
          onClick={() => handleMovieClick(movie)}
          className="movie">
            <img src={`https://image.tmdb.org/t/p/w92${movie.img_url}`} alt={movie.title} />
          </div>
        ))}
        <button className="scroll-button right" onClick={scrollRight}>
        &gt; {/* Right arrow symbol */}
      </button>
      </div>
    </div>
  );
}

export default MovieCarousel;
