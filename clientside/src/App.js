import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage'; // Import the ProfilePage
import AppHeader from './components/header/header';
import HomePage from './pages/HomePage';
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                {/* Global App Header */}
                <AppHeader />

                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} /> {/* New ProfilePage Route */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
