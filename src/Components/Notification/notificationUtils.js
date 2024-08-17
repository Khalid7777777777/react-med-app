// notificationUtils.js

// Function to save notification data to local storage
export const saveNotificationToLocalStorage = (notificationData) => {
    localStorage.setItem('notification', JSON.stringify(notificationData));
  };
  
  // Function to clear notification data from local storage
  export const clearNotificationFromLocalStorage = () => {
    localStorage.removeItem('notification');
  };
  
  // Function to get notification data from local storage
  export const getNotificationFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('notification'));
  };
  