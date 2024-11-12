import React from 'react';
import SignInCard from '../components/cards/signin';
import AppHeader from '../components/header/header'
const SignInPage = () => {
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
            <SignInCard />
            </div>
        </div>
    );
}

export default SignInPage;