import React, { useEffect, useState } from 'react';
import { useUser } from '/src/UserContext';

const url = 'http://127.0.0.1:5555';

function UserProfile({ selectedMovies }) {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`http://127.0.0.1:5555/users/${user.id}`)
        .then((response) => response.json())
        .then((userData) => {
          setCurrentUser(userData);
          console.log(userData)
        })
    }
  }, [user]);

  if (!currentUser) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <div>
        <strong>Username:</strong> {currentUser.username}
      </div>
      <div>
      </div>
      <div>
        {selectedMovies ? ( 
          <ul>
            {selectedMovies.map((selectedMovie, index) => (
              <li key={index}>
                {selectedMovie.name} (ID: {selectedMovie.id}, Rating: {selectedMovie.rating})
                <img src={selectedMovie.img_url} alt={selectedMovie.name} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No selected movies to display.</p>
        )}
      </div>
      {/* Add more user information as needed */}
    </div>
  );
}

export default UserProfile;
