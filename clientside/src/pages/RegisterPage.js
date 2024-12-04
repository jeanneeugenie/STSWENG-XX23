import React from 'react';
import RegisterCard from '../components/cards/register';
const RegisterPage = ( {handleLogIn}) => {
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
            <RegisterCard handleLogIn={handleLogIn}/>
            </div>
        </div>
    );
}

export default RegisterPage;