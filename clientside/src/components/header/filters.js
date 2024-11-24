import React, { useState } from 'react';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';


const FilterSection = ({ onApplyFilter }) => {
    // declare as blank selection first
  const [driver, setDriver] = useState('');
  const [rating, setRating] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');

  const handleApplyFilter = () => {
    const filters = { driver, rating, destination, time };
    onApplyFilter(filters);
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: 'white', color: 'white' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#3A5940' }}>Driver</InputLabel>
            <Select
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
              sx={{ backgroundColor: 'white', color: '#3A5940' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#3A5940' }}>Min. Rating</InputLabel>
            <Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              sx={{ backgroundColor: 'white', color: '#3A5940' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="5">5 Stars</MenuItem>
              <MenuItem value="4">4 Stars</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#3A5940' }}>Drop off</InputLabel>
            <Select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              sx={{ backgroundColor: 'white', color: '#3A5940' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="MRR">MRR</MenuItem>
              <MenuItem value="GT">GT Building</MenuItem>
              <MenuItem value="RL">RL Building</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#3A5940' }}>Time</InputLabel>
            <Select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              sx={{ backgroundColor: 'white', color: '#3A5940' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="830">8:30 AM </MenuItem>
              <MenuItem value="1030">10:30 AM</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button
          variant="contained"
          onClick={handleApplyFilter}
          sx={{ backgroundColor: '#3A5940', '&:hover': { backgroundColor: '#578158' } }}
        >
          Apply Filter
        </Button>
      </Box>
    </Box>
  );
};

export default FilterSection;