import React from 'react';
import SignInCard from '../components/cards/signin';
const SignInPage = ({handleLogIn}) => {
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
            <SignInCard handleLogIn={handleLogIn}/>
            </div>
        </div>
    );
}

export default SignInPage;