import React from 'react';
import UserProfile from '../components/cards/userprofile'; // Adjust path to your UserProfile component

const ProfilePage = () => {
  return (
    <div
      style={{
        height: '100vh', 
        width: '100vw', 
        backgroundColor: '#A3B18A', 
        margin: 0, 
        padding: 0, 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
      }}
    >
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
