import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ onClose }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const storedNotification = JSON.parse(localStorage.getItem('notification'));
    if (storedNotification) {
      setNotification(storedNotification);
    }
  }, []);

  const handleClose = () => {
    setNotification(null);
    localStorage.removeItem('notification');
    if (onClose) onClose();
  };

  if (!notification) return null;

  return (
    <div className="notification">
      <div className="notification-content">
        <button className="close-button" onClick={handleClose}>✖</button>
        <p>Appointment Details:</p>
        <p>Name: {notification.name}</p>
        <p>Phone Number: {notification.phoneNumber}</p>
        <p>Date: {notification.appointmentDate}</p>
        <p>Time: {notification.appointmentTime}</p>
        <p>Doctor: {notification.doctorName}</p>
        <p>Speciality: {notification.doctorSpeciality}</p>
      </div>
    </div>
  );
};

export default Notification;
