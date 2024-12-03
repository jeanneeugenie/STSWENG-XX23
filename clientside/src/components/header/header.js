import React from 'react';
import { AppBar, Toolbar, Button, Avatar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import blankProfile from '../imgs/blankProfile.jpg';

const AppHeader = () => {
  const username = "John Doe";
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#3A5940',
        height: { xs: 60, sm: 80 },
        width: '100%',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Typography
          variant="h6"
          component="a"
          href="/homepage"
          sx={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
            letterSpacing: 1.2,
            '&:hover': { opacity: 0.8 },
          }}
        >
          STSWING
        </Typography>

        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Button
            color="inherit"
            href="/signin"
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              '&:hover': { color: '#FFD700' },
            }}
          >
            Sign In
          </Button>
          <Button
            color="inherit"
            href="/register"
            sx={{
              textTransform: 'none',
              marginLeft: 3,
              fontSize: '1rem',
              fontWeight: '500',
              '&:hover': { color: '#FFD700' },
            }}
          >
            Register
          </Button>
        </Box>

        
        <Box
          component={Link}
          to="/profile"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none', 
          }}
        >
          <Avatar
            alt="Profile Picture"
            src={blankProfile}
            sx={{
              width: 40,
              height: 40,
              border: '2px solid white',
              marginRight: 1,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            {username}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
