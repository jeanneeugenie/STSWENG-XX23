import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import AppHeader from './components/header/header';

const App = () => { // modify nalang for the landing page
    const centeredContainer = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
    };
    return (
        <Router> 
        <div>
            <AppHeader />
            <Routes>
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </div>
        </Router>
    );
}

export default App;