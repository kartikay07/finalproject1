import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/movies/movies/${id}/`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  // Inline styles for the text
  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
  };

  const descriptionStyle = {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '1rem',
  };

  const infoStyle = {
    fontSize: '1rem',
    color: '#888',
    marginBottom: '0.5rem',
  };

  const linkStyle = {
    display: 'inline-block',
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  };

  return (
    <div className="movie-details-page" style={{ padding: '20px' }}>
      <h1 style={titleStyle}>{movie.title}</h1>
      <p style={descriptionStyle}>{movie.description}</p>
      <p style={infoStyle}>Duration: {movie.duration} minutes</p>
      <p style={infoStyle}>Rating: {movie.rating}</p>
      <Link to={`/movie/${id}/seats`} style={linkStyle}>Book Now</Link>
    </div>
  );
};

export default MovieDetailsPage;

