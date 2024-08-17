import React from 'react';
import './Notification.css';

const Notification = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="notification">
      <div className="notification-content">
        <p>Appointment Details:</p>
        <p>Name: {appointment.name}</p>
        <p>Phone Number: {appointment.phoneNumber}</p>
        <p>Date: {appointment.appointmentDate}</p>
        <p>Time: {appointment.appointmentTime}</p>
      </div>
    </div>
  );
};

export default Notification;
