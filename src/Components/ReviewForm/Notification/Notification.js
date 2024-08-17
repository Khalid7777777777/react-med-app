import React from 'react';
import './Notification.css'; // Ensure this CSS file is imported

const Notification = ({ appointment, onClose }) => {
  if (!appointment) return null; // Do not render if no appointment

  return (
    <div className="notification">
     
      <h4>Appointment Booked!</h4>
      <p><strong>Name:</strong> {appointment.name || 'N/A'}</p>
      <p><strong>Phone Number:</strong> {appointment.phoneNumber || 'N/A'}</p>
      <p><strong>Date:</strong> {appointment.appointmentDate || 'N/A'}</p>
      <p><strong>Time:</strong> {appointment.appointmentTime || 'N/A'}</p>
      <p><strong>Doctor:</strong> {appointment.doctorName || 'N/A'}</p>
      <p><strong>Speciality:</strong> {appointment.doctorSpeciality || 'N/A'}</p>
    </div>
  );
};

export default Notification;
