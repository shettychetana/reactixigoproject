import React from 'react';

const BookingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Booking Information</h2>
       
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookingModal;
