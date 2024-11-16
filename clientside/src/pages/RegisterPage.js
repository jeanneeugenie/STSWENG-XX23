import React from 'react';
import RegisterCard from '../components/cards/register';
import AppHeader from '../components/header/header'
const RegisterPage = () => {
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
            <RegisterCard />
            </div>
        </div>
    );
}

export default RegisterPage;