// App.js

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import SignInSignUpPage from './Pages/SignInSignUpPage';
import MovieDetailsPage from './Pages/MovieDetailsPage';
import SeatSelectionPage from './Pages/SeatSelectionPage';
import BookingSummaryPage from './Pages/BookingSummaryPage';
import UserProfilePage from './Pages/UserProfilePage';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignInSignUpPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/movie/:id/seats" element={<SeatSelectionPage />} />
        <Route path="/booking-summary/:id" element={<BookingSummaryPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
