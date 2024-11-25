import React from 'react';
import { AppBar, Toolbar, Button, Avatar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import blankProfile from '../imgs/blankProfile.jpg'; // Corrected path

const AppHeader = () => {
  const username = "John Doe"; // Replace with dynamic username if necessary

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

        {/* Right-aligned Profile section with Avatar and Centered Username */}
        <Box
          component={Link} // Use Link to enable navigation
          to="/profile" // Navigate to ProfilePage
          sx={{
            display: 'flex',
            alignItems: 'center', // Ensure Avatar and Username are vertically aligned
            textDecoration: 'none', // Remove underline for links
          }}
        >
          <Avatar
            alt="Profile Picture"
            src={blankProfile} // Use the imported image
            sx={{
              width: 40,
              height: 40,
              border: '2px solid white', // Add a border to the avatar
              marginRight: 1, // Space between avatar and username
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              fontWeight: '500',
              textAlign: 'center', // Center the text horizontally (in case of multiline text)
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
