// import React, { useState, useEffect } from 'react';

// const Comments = ({ movieId, currentUser }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');

//   useEffect(() => {
//     // Fetch comments for the movie with movieId
//     fetch(`http://127.0.0.1:5555/movies/${movieId}/comments`)
//       .then((res) => res.json())
//       .then((data) => setComments(data))
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, [movieId]);

//   const handleAddComment = () => {
//     if (currentUser) {
//       // Create a new comment object
//       const commentData = {
//         text: newComment,
//         author: currentUser.username, // Assuming you have a username in currentUser
//       };

//       // Send a POST request to add the newComment to the comments for the movie
//       fetch(`http://127.0.0.1:5555/movies/${movieId}/comments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(commentData),
//       })
//         .then((response) => {
//           if (response.status === 200) {
//             // Comment added successfully, you may want to update the comments state
//             // or refetch the comments to show the new comment immediately
//             setComments([...comments, commentData]);
//             setNewComment(''); // Clear the comment form
//           } else {
//             console.error('Error adding the comment');
//           }
//         })
//         .catch((error) => {
//           console.error('Error adding the comment:', error);
//         });
//     }
//   };

//   return (
//     <div>
//       <h2>Comments</h2>
//       {comments.map((comment, index) => (
//         <div key={index}>
//           <p>{comment.text}</p>
//           <p>Author: {comment.author}</p>
//         </div>
//       ))}
  
//       {currentUser && (
//         <div>
//           <textarea
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add a comment..."
//           />
//           <button onClick={handleAddComment}>Add Comment</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Comments;
