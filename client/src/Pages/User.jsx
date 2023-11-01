import React from 'react';
import { useUser } from '/src/UserContext'; // Import the user context or authentication data

function UserProfile() {
  const { user } = useUser(); // Retrieve the user data from your context

  if (!user) {
    // Handle the case when there is no user data (user is not logged in)
    return <div>You are not logged in.</div>;
  }

  return (
    <div>
      <div>
        <strong>Username:</strong> {user.username}
      </div>
      <div>
        <strong>My movies:</strong> {user.email}
      </div>
      {/* Add more user information as needed */}
    </div>
  );
}

export default UserProfile;
