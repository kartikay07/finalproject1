import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    language: '',
    rating: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://127.0.0.1:8000/movies/movies/', { params: filters });
        setMovies(response.data);
      } catch (error) {
        setError('Error fetching movies. Please try again later.');
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Inline styles
  const styles = {
    landingPage: {
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
    },
    filters: {
      marginBottom: '20px',
    },
    filterSelect: {
      margin: '0 10px',
    },
    moviesList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
    },
    movieItem: {
      background: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      textAlign: 'left',
      width: '200px',
      transition: 'transform 0.2s',
      position: 'relative',
    },
    movieItemHover: {
      transform: 'scale(1.05)',
    },
    moviePoster: {
      width: '100%',
      height: 'auto',
    },
    movieTitle: {
      margin: '10px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
    },
    movieDescription: {
      margin: '0 10px 10px',
      color: '#555',
      fontSize: '14px',
      lineHeight: '1.5',
    },
    movieRating: {
      margin: '10px',
      fontSize: '14px',
      color: '#ff9800', // For highlighting the rating
    },
    errorText: {
      color: 'red',
      fontWeight: 'bold',
    },
    loadingText: {
      fontStyle: 'italic',
      color: '#777',
    },
  };

  return (
    <div style={styles.landingPage}>
      <h1>Available Movies</h1>

      {/* Filter Movies */}
      <div style={styles.filters}>
        <select name="genre" onChange={handleFilterChange} style={styles.filterSelect}>
          <option value="">All Genres</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
        </select>

        <select name="language" onChange={handleFilterChange} style={styles.filterSelect}>
          <option value="">All Languages</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="hindi">Hindi</option>
        </select>

        <select name="rating" onChange={handleFilterChange} style={styles.filterSelect}>
          <option value="">All Ratings</option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
        </select>
      </div>

      {/* Show Loading or Error */}
      {loading && <p style={styles.loadingText}>Loading movies...</p>}
      {error && <p style={styles.errorText}>{error}</p>}

      {/* Display Movies */}
      {!loading && !error && (
        <div style={styles.moviesList}>
          {movies.length === 0 ? (
            <p>No movies found. Please try adjusting the filters.</p>
          ) : (
            movies.map((movie) => (
              <div
                key={movie.id}
                style={styles.movieItem}
                onMouseEnter={(e) => (e.currentTarget.style.transform = styles.movieItemHover.transform)}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
              >
                <Link to={`/movie/${movie.id}/`}>
                  <img
                    src={movie.poster_url}
                    alt={`${movie.title} poster`}
                    style={styles.moviePoster}
                  />
                  <h3 style={styles.movieTitle}>{movie.title}</h3>
                  <p style={styles.movieDescription}>{movie.description.substring(0, 100)}...</p>
                  <p style={styles.movieRating}>Rating: {movie.rating}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
