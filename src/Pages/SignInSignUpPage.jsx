import React, { useState } from 'react';
import axios from 'axios';

const SignInSignUpPage = () => {
  const [isSignUp, setIsSignUp] = useState(true); // toggle for sign up and sign in
  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); // State for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
      name: isSignUp ? name : undefined, // Include name only for signup
      username: isSignUp ? username : undefined // Include username only for signup
    };

    try {
      const url = isSignUp ? 'http://localhost:8000/movies/user/signup/' : 'http://localhost:8000/movies/user/login/'; // Adjust URLs accordingly
      const response = await axios.post(url, data);
      setSuccess(response.data.message);
      setError(null);
    } catch (err) {
      setError(err.response?.data.error || 'An error occurred');
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        {isSignUp && (
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username} // Add a new state for username
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default SignInSignUpPage;
