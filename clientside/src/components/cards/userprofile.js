import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

const ProfileCard = () => {
  return (
    <Card
      sx={{
        width: 600, // Width of the card
        height: 824, // Height of the card
        margin: 'auto',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: 3,
      }}
    >
      {/* Background image and profile picture */}
      <Box
        sx={{
          position: 'relative',
          height: '40%', // Set a proportionate height for the background
          backgroundImage: 'url("/components/imgs/dlsumrr.jpg")', // Replace with your background image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Profile picture */}
        <Avatar
          alt="Profile Picture"
          src="/components/imgs/blankProfile.jpg" // Replace with your profile picture path
          sx={{
            width: 100,
            height: 100,
            border: '3px solid white',
            position: 'absolute',
            bottom: -50, // Position the avatar overlapping the background
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </Box>

      {/* Profile details */}
      <CardContent sx={{ paddingTop: 8 }}>
        {/* Name */}
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontWeight: 'bold',
            color: '#FFFFFF',
            backgroundColor: '#4F7942',
            padding: '8px 0',
            borderRadius: 1,
          }}
        >
          MILLER, George Kusunoki
        </Typography>

        {/* Program */}
        <Typography
          variant="body2"
          align="center"
          sx={{
            marginTop: 2,
            color: '#4F7942',
          }}
        >
          Program: BSCS-ST
        </Typography>

        {/* Additional Details */}
        <Box
          sx={{
            backgroundColor: '#4F7942',
            color: '#FFFFFF',
            marginTop: 3,
            padding: 3,
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            <strong>Usual Route Taken:</strong> Not Set
          </Typography>
          <Typography variant="body2">
            <strong>Usual Ride Schedule:</strong> Not Set
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
