import React, { useEffect, useState } from 'react';
import { useUser } from '/src/UserContext';

const CurrUser = () => {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`http://127.0.0.1:5555/users/${user.id}`)
        .then((response) => response.json())
        .then((userData) => {
          setCurrentUser(userData);
        });
    }
  }, [user]);


};

export default CurrUser;
