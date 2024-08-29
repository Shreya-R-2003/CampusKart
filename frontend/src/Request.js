import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './request.css';

const Request = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/requests')
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => {
        console.error('Error fetching requests:', error);
      });
  }, []);

  const handleProvideClick = (requestId) => {
    fetch(`http://localhost:8080/api/requests/${requestId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        // Remove the deleted request from the state
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        );

        // Navigate to the "Sell" page
        // Replace "/sell" with the actual route to your "Sell" page
        window.location.href = `/sell`;
      })
      .catch((error) => {
        console.error('Error deleting request:', error);
      });
  };

  return (
    <div>
      <h2>Request</h2>
      {requests.length > 0 ? (
        <div className="request-list">
          {requests.map((request) => (
            <div key={request._id} className="request-item">
              <p>Username: {request.username}</p>
              <p>Product Name: {request.productname}</p>
              <p>Description: {request.description}</p>
              <p>Request Type: {request.requesttype}</p>
              <p>Category:{request.category}</p>
              <button
                className="provide-button"
                onClick={() => handleProvideClick(request._id)}
              >
                Provide
              </button>
              <hr />
            </div>
          ))}
        </div>
      ) : (
       <div className="nothing"> <p><br></br>No requests found.</p></div>
      )}
    </div>
  );
};

export default Request;
