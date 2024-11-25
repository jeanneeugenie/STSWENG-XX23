import React from 'react';
import UserProfile from '../components/cards/userprofile'; // Adjust path to your UserProfile component

const ProfilePage = () => {
  return (
    <div
      style={{
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        backgroundColor: '#A3B18A', // Background color
        margin: 0, // Remove default margins
        padding: 0, // Remove default paddings
        display: 'flex',
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', 
      }}
    >
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
