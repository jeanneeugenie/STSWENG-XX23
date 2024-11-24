import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar} from '@mui/material';
import { Link } from 'react-router-dom';

const AppHeader = ({isLoggedIn}) => {
  //const classes = useStyle();
  return (
    <AppBar style={{ backgroundColor: '#3A5940' }} position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/homepage">STSWING</Button>

        { isLoggedIn ? (
          <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'flex-end'}}>
            <Avatar alt="User Pfp" src="./components/imgs/tempPfp.png" />
            <Typography variant="h6"> User Name </Typography>
          </div>
        ) : (
        <div style={{ margineLeft: 'auto', display: 'flex', alignItems: 'flex-end'}}>
          <Button color="inherit" component={Link} to="/signin">Sign In</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
        </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;