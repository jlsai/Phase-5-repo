import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '/src/UserContext';
import Rating from '@mui/material/Rating';
import WatchedButton from '../Movie_actions/WatchedButton';
import "/src/Pages/Moviedetails.css"


const MovieDetails = () => {
  const { user } = useUser();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isMovieWatched, setIsMovieWatched] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


    const fetchData = async () => {
      try {
        // Fetch movie details
        const movieResponse = await fetch(`/api/movies/${movieId}`);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch user data
        if (user) {
          const userDataResponse = await fetch(`/api/users/${user.id}`);
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
  useEffect(() => {
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
      const posturl = `/api/users/${currentUser.id}/watched/${movieId}`;
      fetch(posturl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status === 200) {
            // Update isMovieWatched
            // setIsMovieWatched(true);
            fetchData();
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
      const deleteurl = `/api/users/${currentUser.id}/watched/${movieId}`;
      fetch(deleteurl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status === 200) {
            // Update isMovieWatched
            // setIsMovieWatched(false);
            fetchData();
          } else {
            console.error('Error removing the movie from the watched list');
          }
        })
        .catch((error) => {
          console.error('Error removing the movie from the watched list:', error);
        });
    }
  };

  const handlePostComment = async () => {
    if (currentUser) {
      const postUrl = `/api/movies/${movieId}/comments`;
      const commentData = {
        text: newComment,
        user_id: currentUser.id,
        username: currentUser.username, // Include the user's username
      };

      try {
        const response = await fetch(postUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentData),
        });

        if (response.status === 201) {
          // Comment posted successfully, update comments with the new comment
          setComments([...comments, commentData]);
          setNewComment('');
        } else {
          console.error('Error posting comment:', response.statusText);
        }
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  useEffect(() => {
    // Fetch comments for the movie
    const fetchComments = async () => {
      try {
        const commentsResponse = await fetch(
          `/api/movies/${movieId}/comments`
        );
        const commentsData = await commentsResponse.json();
        setComments(commentsData); // Make sure commentsData is an array of comment objects
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  const value = Math.round(movie.rating * 2) / 2;
  

  return (
    <div>
      <div className="movie-details-container">
        <div className="movie-details-left">
          <h1 className='movietitle'>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.img_url}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-details-right">
          <h1 style={{ color: "white" }}>{movie.rating}</h1>
          <Rating
            name="half-rating-read"
            defaultValue={value}
            max={10}
            precision={0.5}
            readOnly
          />
          <p className="summary" style={{ color: "grey" }}>{movie.summary}</p>
          <WatchedButton
            isMovieWatched={isMovieWatched}
            onToggleWatched={handleToggleWatched}
          />
        </div>
      </div>
  
      <div className="comments-container"> 
        {currentUser && (
          <div className="add-comment-form"> 
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave a comment..."
              className="add-comment-textarea" 
              style={{ resize: 'none' }}
            />
            <div>
              <button onClick={handlePostComment} className="add-comment-button"> 
                Post Comment
              </button>
            </div>
          </div>
        )}
        {comments.length > 0 ? (
          <div>
            {comments.map((comment, index) => (
              <div key={index} className="comment-item"> 
                <strong className="comment-username">{comment.username}: </strong> 
                <span className="comment-text">{comment.text}</span> 
              </div>
            ))}
          </div>
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
  
};

export default MovieDetails;