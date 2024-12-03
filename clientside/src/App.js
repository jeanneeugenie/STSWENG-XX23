import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import AppHeader from './components/header/header';
import HomePage from './pages/HomePage';
import './App.css';
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // changes based on log in state

    return (
        <Router> 
        <div>
            <AppHeader isLoggedIn={isLoggedIn}/>
            <Routes>
            <Route path="/" element={<Navigate to="/homepage" replace />}/> 
                <Route path="/homepage" element={<HomePage isDriver={true} />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </div>
        </Router>
    );
}

export default App;