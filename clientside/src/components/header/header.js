import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  //const classes = useStyle();
  return (
    <AppBar style={{ backgroundColor: '#3A5940' }} position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/homepage">STSWING</Button>
        <Button color="inherit" component={Link} to="/signin">Sign In</Button>
        <Button color="inherit" component={Link} to="/register">Register</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;