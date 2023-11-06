import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '/src/UserContext';
import Rating from '@mui/material/Rating';
import WatchedButton from '../Movie_actions/WatchedButton';


const MovieDetails = () => {
  const { user } = useUser();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isMovieWatched, setIsMovieWatched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://127.0.0.1:5555`;

        // Fetch movie details
        const movieResponse = await fetch(`${url}/movies/${movieId}`);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch user data
        if (user) {
          const userDataResponse = await fetch(`${url}/users/${user.id}`);
          const userData = await userDataResponse.json();
          setCurrentUser(userData);
          // Update isMovieWatched based on the user's watched movies
          setIsMovieWatched(
            userData.watched_movies.some((movie) => movie.id.toString() === movieId)
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [movieId, user]);
  

  const handleToggleWatched = () => {
    if (isMovieWatched) {
      handleRemoveFromWatched();
    } else {
      handleAddToWatched();
    }
  };

  const handleAddToWatched = () => {
    if (currentUser) {
      const posturl = `http://127.0.0.1:5555/users/${currentUser.id}/watched/${movieId}`;
      fetch(posturl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status === 200) {
            // Update isMovieWatched
            setIsMovieWatched(true);
          } else {
            console.error('Error adding the movie to the watched list');
          }
        })
        .catch((error) => {
          console.error('Error adding the movie to the watched list:', error);
        });
    }
  };

  const handleRemoveFromWatched = () => {
    if (currentUser) {
      const deleteurl = `http://127.0.0.1:5555/users/${currentUser.id}/watched/${movieId}`;
      fetch(deleteurl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status === 200) {
            // Update isMovieWatched
            setIsMovieWatched(false);
          } else {
            console.error('Error removing the movie from the watched list');
          }
        })
        .catch((error) => {
          console.error('Error removing the movie from the watched list:', error);
        });
    }
  };

  if (!movie || !currentUser) {
    return <div>Loading...</div>;
  }
  const value = Math.round(movie.rating * 2) / 2;
  

    return (
      <div >
        <h1>{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/w500${movie.img_url}`} alt={movie.title} />
        <h1 style={{ color: 'white' }}>{movie.rating}</h1>
        <Rating name="half-rating-read" defaultValue={value} max={10} precision={0.5} readOnly />
        <p style={{ color: 'grey' }}>{movie.summary}</p>
        <WatchedButton
          isMovieWatched={isMovieWatched}
          onToggleWatched={handleToggleWatched}
        />
      </div>
    );
  };


export default MovieDetails;
