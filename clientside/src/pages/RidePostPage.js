import React from 'react';
import RidePost from '../components/cards/ridepost';
import AppHeader from '../components/header/header'
const RidePostPage = () => {
    const centeredContainer = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
    };
    return (
        <div>
            <div style={centeredContainer}>
            <RidePost />
            </div>
        </div>
    );
}

export default RidePostPage;