import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Link } from '@mui/material';
import useStyle from './styles';
import axios from 'axios';

const SignInCard = () => {
    const classes = useStyle();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
          alert(response.data.message);
      } catch (err) {
          setError(err.response?.data?.error || 'Login failed');
      }
  };
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          DLSU Email
        </Typography>
        <TextField required="True" 
          label="DLSU Email"
          type="email"
          variant="outlined"
          className={classes.textField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography variant="h6" component="div" gutterBottom>
          Password
        </Typography>
        <TextField required="True" 
          label="Password"
          type="password"
          variant="outlined"
          className={classes.textField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" className={classes.button} onClick={handleLogin}>
          Sign In
        </Button>
        <Link href="/register" variant="body2" className={classes.link}>
          Register an account
        </Link>
      </CardContent>
    </Card>
  );
};

export default SignInCard;