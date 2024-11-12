import React from 'react';
import { Card, CardContent, TextField, Button, Typography, Link } from '@mui/material';
import useStyle from './styles'

const SignInCard = () => {
    const classes = useStyle();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          DLSU Email
        </Typography>
        <TextField
          label="DLSU Email"
          type="email"
          variant="outlined"
          className={classes.textField}
        />
        <Typography variant="h6" component="div" gutterBottom>
          Password
        </Typography>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          className={classes.textField}
        />
        <Button variant="contained" color="primary" className={classes.button}>
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