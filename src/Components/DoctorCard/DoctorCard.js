import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentFormIC from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';
import Notification from '../Notification/Notification'; // Import the Notification component

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Retrieve the appointments from local storage
    const storedAppointments = JSON.parse(localStorage.getItem(`appointments_${name}`)) || [];
    setAppointments(storedAppointments);

    // Retrieve the notification from localStorage if it exists
    const storedNotification = JSON.parse(localStorage.getItem('notification'));
    if (storedNotification) {
      setNotification(storedNotification);
    }
  }, [name]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
    localStorage.setItem(`appointments_${name}`, JSON.stringify(updatedAppointments));
    
    // Clear the notification when an appointment is canceled
    setNotification(null);
    localStorage.removeItem('notification');
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
      doctorName: name, // Add doctor name
      doctorSpeciality: speciality, // Add doctor speciality
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);

    // Save to local storage for this doctor
    localStorage.setItem(`appointments_${name}`, JSON.stringify(updatedAppointments));

    // Show notification with appointment details
    setNotification(newAppointment);
    localStorage.setItem('notification', JSON.stringify(newAppointment));
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <img src={profilePic} alt={`${name}'s profile`} />
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                  <img src={profilePic} alt={`${name}'s profile`} />
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Date: {appointment.appointmentDate}</p>
                      <p>Time: {appointment.appointmentTime}</p>
                      <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentFormIC doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
          )}
        </Popup>
      </div>

      {/* Notification */}
      <Notification appointment={notification} onClose={() => {
        setNotification(null);
        localStorage.removeItem('notification');
      }} />
    </div>
  );
};

export default DoctorCard;
