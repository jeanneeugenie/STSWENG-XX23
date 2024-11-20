import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import AppHeader from './components/header/header';
import HomePage from './pages/HomePage';
import './App.css';
const App = () => { // modify nalang for the landing page
    return (
        <Router> 
        <div>
            <AppHeader />
            <Routes>
            <Route path="/" element={<HomePage />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </div>
        </Router>
    );
}

export default App;