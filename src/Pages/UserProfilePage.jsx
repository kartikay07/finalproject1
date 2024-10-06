// UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/movies/user/profile/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-page">
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <h2>Booking History</h2>
      <ul>
        {user.bookings.map((booking) => (
          <li key={booking.id}>
            {booking.movieTitle} - {booking.seats.join(', ')} - ${booking.totalCost}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfilePage;
