import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [addedToWatched, setAddedToWatched] = useState(false);

  useEffect(() => {
    const url = `http://127.0.0.1:5555`;

    fetch(`${url}/movies/${movieId}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, [movieId]);

  const handleAddToWatched = () => {
    // Here, you can add the logic to update the state or make an API request to mark the movie as watched.
    // For demonstration, we'll just toggle the state.
    setAddedToWatched(!addedToWatched);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.img_url}`} alt={movie.title} />
      <p>{movie.summary}</p>
      <button onClick={handleAddToWatched}>
        {addedToWatched ? 'Remove from Watched' : 'Add to Watched'}
      </button>
      {/* Add more details as needed */}
    </div>
  );
};

export default MovieDetails;
