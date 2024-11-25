import React, { useState } from 'react';
import { Card, Box, Button, Typography, Menu, MenuItem, TextField, Modal } from '@mui/material';
import background from '../imgs/mrrFacade.jpg';
import defaultImage from '../imgs/blankProfile.jpg';

const ProfileCard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [fullName, setFullName] = useState('FULL NAME HERE');
  const [program, setProgram] = useState('PROGRAM');
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(fullName);
  const [newProgram, setNewProgram] = useState(program);
  const [newImage, setNewImage] = useState(profileImage);
  const [rideSchedule, setRideSchedule] = useState({
    MH: '',
    TF: '',
    WS: '',
  });  
  const [newRideTime, setNewRideTime] = useState(rideSchedule); // Holds the edited time input
  const [idNumber, setIdNumber] = useState('ID NUMBER'); // Holds the current ID Number
  const [newIdNumber, setNewIdNumber] = useState(idNumber); // Temporary state for editing
  const [usualRoute, setUsualRoute] = useState(''); // Holds the current Usual Route Taken
  const [newUsualRoute, setNewUsualRoute] = useState(usualRoute); // Temporary state for editing




  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    handleMenuClose();
  };

  const handleSave = () => {
    setFullName(newName);
    setProgram(newProgram);
    setProfileImage(newImage);
    setIdNumber(newIdNumber); 
    setRideSchedule(newRideTime); 
    setUsualRoute(newUsualRoute);
    setIsEditing(false);
  };
  
  
  const handleCancel = () => {
    setNewName(fullName);
    setNewProgram(program);
    setNewImage(profileImage);
    setNewIdNumber(idNumber); 
    setNewRideTime(rideSchedule); 
    setNewUsualRoute(usualRoute); 
    setIsEditing(false);
  };
  
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card
      sx={{
        width: 700,
        height: 924,
        margin: 'auto',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: 3,
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          width: '100%',
          zIndex: 2,
          marginTop: 25,
        }}
      >
        <Box
          component="img"
          src={profileImage}
          alt="Profile"
          sx={{
            width: 207,
            height: 207,
            boxShadow: 3,
            zIndex: 3,
            objectFit: 'cover',
          }}
        />

      <Box
        id="id_number_holder"
        sx={{
          flex: 1,
          height: 60,
          backgroundColor: '#DAD7CD',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 1,
          zIndex: 3,
          marginTop: 18.4,
        }}
      >
        <Typography
          id="id_number"
          sx={{
            fontWeight: 'bold',
            color: '#3A5940',
            fontSize: '2rem',
          }}
        >
          {idNumber}
        </Typography>
      </Box>

      </Box>

      <Box
        id="full_name"
        sx={{
          width: '100%',
          height: 80,
          backgroundColor: '#578158',
          zIndex: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            color: '#FFFFFF',
            fontSize:'1.5rem'
          }}
        >
          {fullName}
        </Typography>
      </Box>

      <Box
        id="program"
        sx={{
          width: '100%',
          height: 60,
          backgroundColor: '#386641',
          zIndex: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            color: '#FFFFFF',
            fontSize: '1rem',
          }}
        >
          {program}
        </Typography>
      </Box>

      <Box
        id="URT"
        sx={{
          width: '100%',
          height: 80,
          backgroundColor: '#578158',
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          marginTop: 17.5,
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            color: '#FFFFFF',
            fontSize: '1rem',
            marginLeft: 5,
          }}
        >
          USUAL ROUTE TAKEN: {usualRoute || 'Not Set'} 
        </Typography>

      </Box>

      <Box
        id="URS"
        sx={{
          width: '100%',
          backgroundColor: '#386641',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'flex-start',
          position: 'relative',
          padding: 2,
          paddingLeft: 5,
        }}
      >
        {/* Title */}
        <Typography
          sx={{
            fontWeight: 'bold',
            color: '#FFFFFF',
            fontSize: '1rem',
            marginBottom: 2,
          }}
        >
          USUAL RIDE SCHEDULE:
        </Typography>

        {/* Ride Times */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'flex-start', 
          }}
        >
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '1rem',
              marginBottom: 1,
            }}
          >
            MH: {rideSchedule.MH || 'Not Set'}
          </Typography>
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '1rem',
              marginBottom: 1,
            }}
          >
            TF: {rideSchedule.TF || 'Not Set'}
          </Typography>
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '1rem',
            }}
          >
            WS: {rideSchedule.WS || 'Not Set'}
          </Typography>
        </Box>
      </Box>



      <Button
        variant="contained"
        onClick={handleMenuOpen}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 5,
          backgroundColor: '#FFFFFF',
          color: '#578158',
          fontWeight: 'bold',
          fontSize: '1rem',
          minWidth: 50,
          '&:hover': {
            backgroundColor: '#578158',
            color: '#FFFFFF',
          },
        }}
      >
        . . .
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{ zIndex: 6 }}
      >
        <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Modal
        open={isEditing}
        onClose={handleCancel}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: '400px',
          }}
        >

          
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Edit Profile
          </Typography>
          <TextField
            fullWidth
            label="ID Number"
            value={newIdNumber} 
            onChange={(e) => setNewIdNumber(e.target.value)} 
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Full Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Program"
            value={newProgram}
            onChange={(e) => setNewProgram(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Usual Route Taken"
            value={newUsualRoute} 
            onChange={(e) => setNewUsualRoute(e.target.value)} 
            sx={{ marginBottom: 2 }}
            placeholder="e.g., Taft Ave - Quirino Ave"
          />
          <TextField
            fullWidth
            label="Edit MH Time"
            value={newRideTime.MH || ''}
            onChange={(e) => setNewRideTime({ ...newRideTime, MH: e.target.value })}
            sx={{ marginBottom: 2 }}
            placeholder="e.g., 5:00 PM"
          />
          <TextField
            fullWidth
            label="Edit TF Time"
            value={newRideTime.TF || ''}
            onChange={(e) => setNewRideTime({ ...newRideTime, TF: e.target.value })}
            sx={{ marginBottom: 2 }}
            placeholder="e.g., 5:00 PM"
          />
          <TextField
            fullWidth
            label="Edit WS Time"
            value={newRideTime.WS || ''}
            onChange={(e) => setNewRideTime({ ...newRideTime, WS: e.target.value })}
            sx={{ marginBottom: 2 }}
            placeholder="e.g., 5:00 PM"
          />
          



          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Upload Profile Picture
          </Typography>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: '#3A5940', color: 'white' }} onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" sx={{ color: '#3A5940', borderColor: '#3A5940' }} onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};

export default ProfileCard;
