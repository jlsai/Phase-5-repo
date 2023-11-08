import React, { useState, useEffect } from 'react';
import UserProfile from '/src/Pages/User.jsx';
import MovieDetails from '/src/Pages/Moviedetails.jsx';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import '/src/Pages/Movies.css'; // Import the CSS file

function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // New state for selected movie
  const [search, setSearch] = useState(''); // State for search input

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/movies')
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

  // Filter movies based on search input
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="movies-container"> {/* Apply the container style */}
      <p className="movies-title">List of Movies</p> {/* Apply the title style */}
      <div className='search'>
      <input
        className='searchbar'
        type="text"
        placeholder="Search movies"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="divider"></div>
      </div>
      
      <div className="row">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleMovieClick(movie)}
            className="movie" // Apply the movie style
          >
            <img src={`https://image.tmdb.org/t/p/w92${movie.img_url}`} alt={movie.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
