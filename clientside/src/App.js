import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage'; // Import the ProfilePage
import AppHeader from './components/header/header';
import HomePage from './pages/HomePage';
import './App.css';
const App = () => {
  
    const [isLoggedIn, setIsLoggedIn] = useState(); // changes based on log in state
    const [userEmail, setUserEmail] = useState('');
    const [isDriver, setDriver] = useState();
    const handleLogout = () => {
        setIsLoggedIn(false);
        alert('You have been logged out!');
    };
    const handleLogIn = (userEmail) => {
        setIsLoggedIn(true);
        setUserEmail(userEmail);
    };
    return (
        <Router> 
        <div>
            <AppHeader isLoggedIn={isLoggedIn} onLogout={handleLogout} userEmail={userEmail}/>
            <Routes>
            <Route path="/" element={<Navigate to="/homepage" replace />}/> 
                <Route path="/homepage" element={<HomePage isDriver={isDriver} />} />
                <Route path="/signin" element={<SignInPage handleLogIn={handleLogIn}/>} />
                <Route path="/register" element={<RegisterPage handleLogIn={handleLogIn}/>} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </div>
        </Router>
    );
};

export default App;
