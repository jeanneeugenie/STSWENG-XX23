import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  //const classes = useStyle();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          STSWING
        </Typography>
        <Button color="inherit" component={Link} to="/signin">Sign In</Button>
        <Button color="inherit" component={Link} to="/register">Register</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;