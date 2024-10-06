// BookingSummaryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingSummaryPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBookingSummary = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/movies/booking-summary/${id}/`);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking summary:', error);
      }
    };
    fetchBookingSummary();
  }, [id]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-summary-page">
      <h1>Booking Summary</h1>
      <p>Movie: {booking.movieTitle}</p>
      <p>Seats: {booking.seats.join(', ')}</p>
      <p>Total Cost: ${booking.totalCost}</p>
      <p>Confirmation: {booking.confirmationNumber}</p>
    </div>
  );
};

export default BookingSummaryPage;
