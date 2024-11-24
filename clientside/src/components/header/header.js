import React from 'react';
import { AppBar, Toolbar, Button, Avatar, Box, Typography } from '@mui/material';
import blankProfile from '../imgs/blankProfile.jpg'; // Corrected path

const AppHeader = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#3A5940', // Green header
        height: { xs: 60, sm: 80 }, 
        width: '100%',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center', // Vertically align items to the center
          justifyContent: 'space-between', // Distribute items horizontally
          height: '100%',
        }}
      >
        {/* Left-aligned Logo */}
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

        {/* Center-aligned Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1, // Push the contents to the middle of the header
          }}
        >
          <Button
            color="inherit"
            href="/signin"
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              '&:hover': { color: '#FFD700' }, // Gold hover effect
            }}
          >
            Sign In
          </Button>
          <Button
            color="inherit"
            href="/register"
            sx={{
              textTransform: 'none',
              marginLeft: 3, // Add spacing between buttons
              fontSize: '1rem',
              fontWeight: '500',
              '&:hover': { color: '#FFD700' }, // Gold hover effect
            }}
          >
            Register
          </Button>
        </Box>

        {/* Right-aligned Profile button with Avatar */}
        <Button color="inherit" href="/Profile">
          <Avatar
            alt="Profile Picture"
            src={blankProfile} // Use the imported image
            sx={{
              width: 40,
              height: 40,
              border: '2px solid white', // Add a border to the avatar
            }}
          />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
