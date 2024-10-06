import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SeatSelectionPage = () => {
    const { id } = useParams();  // Movie ID from URL parameters
    const [seats, setSeats] = useState([]);  // State to hold the seats data
    const [selectedSeats, setSelectedSeats] = useState([]); // State to hold selected seats
    const [error, setError] = useState(null);  // State to hold error messages
    
    // Fetch the seats from the backend on component mount
    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/movies/movies/${id}/seats/`);
                console.log('API Response:', response.data); // Log API response for debugging

                // Filter out duplicate seat numbers
                const uniqueSeats = response.data.filter((seat, index, self) =>
                    index === self.findIndex((s) => s.seatNumber === seat.seatNumber)
                );

                setSeats(uniqueSeats);  // Set the filtered seats
            } catch (error) {
                console.error('Error fetching seats:', error);
                setError('Error fetching seats.');  // Set an error message
            }
        };

        fetchSeats();
    }, [id]);

    // Handle seat selection
    const handleSeatSelect = (seat) => {
        if (selectedSeats.includes(seat)) {
            // If the seat is already selected, remove it
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            // If the seat is not selected, add it
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const handleBooking = async () => {
      try {
          const response = await axios.post(`http://127.0.0.1:8000/movies/movies/${id}/book-seats/`, {
              seats: selectedSeats,
          }, {
              headers: {
                  'Content-Type': 'application/json',  // Set the content type if necessary
                  // Add any other necessary headers here
              },
          });
  
          alert(response.data.message); // Show success message from response
          setSelectedSeats([]); // Clear selected seats after booking
      } catch (error) {
          console.error('Error booking seats:', error);
          setError('Error booking seats.');  // Set an error message
      }
  };
  

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.pageTitle}>Select Your Seats</h1>
            {error && <p style={styles.errorText}>{error}</p>}  {/* Display error if any */}

            {/* Display seats */}
            {seats.length > 0 ? (
                <div style={styles.seatsContainer}>
                    <h2 style={styles.seatsTitle}>Available Seats</h2>
                    <ul style={styles.seatList}>
                        {seats.map(seat => (
                            <li key={seat.seatNumber} style={styles.seatItem}>
                                <button
                                    style={{
                                        ...styles.seatButton,
                                        backgroundColor: seat.available ? (selectedSeats.includes(seat.seatNumber) ? '#4CAF50' : '#f0f0f0') : '#ff6347',
                                        cursor: seat.available ? 'pointer' : 'not-allowed',
                                        border: selectedSeats.includes(seat.seatNumber) ? '2px solid #4CAF50' : '1px solid #ddd',
                                    }}
                                    onClick={() => seat.available && handleSeatSelect(seat.seatNumber)}
                                    disabled={!seat.available} // Disable button if seat is not available
                                >
                                    {seat.seatNumber}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div style={styles.selectionSummary}>
                        <h3 style={styles.selectedSeatsText}>Selected Seats: {selectedSeats.join(', ') || 'None'}</h3>
                        <button style={styles.bookButton} onClick={handleBooking} disabled={selectedSeats.length === 0} >
                        
                    
                
                            Book Selected Seats
                        </button>
                    </div>
                </div>
            ) : (
                <p style={styles.noSeatsText}>No seats available.</p>
            )}
        </div>
    );
};

// Inline styles object
const styles = {
    pageContainer: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: '#f7f7f7',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    pageTitle: {
        textAlign: 'center',
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '20px',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: '1.2rem',
        marginBottom: '20px',
    },
    seatsContainer: {
        textAlign: 'center',
    },
    seatsTitle: {
        fontSize: '1.8rem',
        color: '#333',
        marginBottom: '15px',
    },
    seatList: {
        listStyleType: 'none',
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    seatItem: {
        margin: '10px',
    },
    seatButton: {
        fontSize: '1.2rem',
        padding: '10px 15px',
        borderRadius: '5px',
        outline: 'none',
        transition: 'all 0.3s ease',
        color: '#333',
    },
    selectionSummary: {
        marginTop: '30px',
    },
    selectedSeatsText: {
        fontSize: '1.5rem',
        color: '#333',
    },
    bookButton: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        fontSize: '1.2rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s ease',
    },
    noSeatsText: {
        fontSize: '1.5rem',
        color: '#999',
        textAlign: 'center',
        marginTop: '20px',
    },
};

export default SeatSelectionPage;
