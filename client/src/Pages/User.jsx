import React, { useEffect, useState } from 'react';
import { useUser } from '/src/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import './User.css'; // Import the CSS file
import { url } from '/src/Variables.jsx';

const url = 'http://127.0.0.1:5555';

function UserProfile() {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate(); // Add useNavigate

  useEffect(() => {
    if (user) {
      fetch(url+`/users/${user.id}`)
        .then((response) => response.json())
        .then((userData) => {
          setCurrentUser(userData);
          console.log(userData);
        });
    }
  }, [user]);

  if (!currentUser) {
    return <div>Loading user data...</div>;
  }

  const handleMovieClick = (movie) => {
    console.log('Movie clicked:', movie);
    setSelectedMovie(movie); // Set the selected movie
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div>
      <div>
        <strong className="text-lg font-bold">Username:</strong> {currentUser.username}
      </div>
      <div>
        {currentUser.watched_movies && currentUser.watched_movies.length > 0 ? (
          <div className='container'>
            <h2 className="text-2xl font-bold mb-4">Watched Movies:</h2>
            <div className="movie-cards-container row">
              {currentUser.watched_movies.map((movie) => (
                <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
                  <img src={`https://image.tmdb.org/t/p/w92${movie.img_url}`} alt={movie.title} className="img" />
                  {/* Add more movie information or actions here */}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No watched movies to display.</p>
        )}
      </div>
      {/* Add more user information as needed */}
    </div>
  );
}

export default UserProfile;
