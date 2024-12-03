import React, { useState } from 'react';
import { Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const FilterSection = ({ onApplyFilter }) => {
    // declare as blank selection first
  const [driver, setDriver] = useState('');
  const [rating, setRating] = useState('');
  const [pickupPoint, setPickupPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');

  const handleApplyFilter = () => {
    const filters = { driver, rating, pickupPoint, destination, startHour, endHour };
    onApplyFilter(filters);
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: 'white' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* Driver Filter */}
        <Grid item xs={12} sm={6} md={2}>
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

        {/* Rating Filter */}
        <Grid item xs={12} sm={6} md={2}>
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
              <MenuItem value="3">3 Stars</MenuItem>
              <MenuItem value="2">2 Stars</MenuItem>
              <MenuItem value="1">1 Star</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Pick-up Point Filter */}
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#3A5940' }}>Pick-up Point</InputLabel>
            <Select
              value={pickupPoint}
              onChange={(e) => setPickupPoint(e.target.value)}
              sx={{ backgroundColor: 'white', color: '#3A5940' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="George Ty Building">George Ty Building</MenuItem>
              <MenuItem value="Richard Lee Block">Richard Lee Block</MenuItem>
              <MenuItem value="Milagros R. del Rosario Building">Milagros R. del Rosario Building</MenuItem>
              <MenuItem value="Enrique Razon Building">Enrique Razon Building</MenuItem>
              <MenuItem value="University Hall">University Hall</MenuItem>
              <MenuItem value="Covered Court/West Canopy">Covered Court/West Canopy</MenuItem>
              <MenuItem value="LC2 Annex">LC2 Annex</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Destination Filter */}
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#3A5940' }}>Destination</InputLabel>
            <Select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              sx={{ backgroundColor: 'white', color: '#3A5940' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Paseo Outlets">Paseo Outlets</MenuItem>
              <MenuItem value="Vista Mall Sta. Rosa">Vista Mall Sta. Rosa</MenuItem>
              {/* Add more destination options here */}
            </Select>
          </FormControl>
        </Grid>

        {/* Start Hour Filter */}
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            type="number"
            label="Pick-up Start Hour"
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
            sx={{ backgroundColor: 'white', color: '#3A5940' }}
            fullWidth
            InputProps={{ inputProps: { min: 0, max: 23 } }}
          />
        </Grid>

        {/* End Hour Filter */}
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            type="number"
            label="Pick-up End Hour"
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
            sx={{ backgroundColor: 'white', color: '#3A5940' }}
            fullWidth
            InputProps={{ inputProps: { min: 0, max: 23 } }}
          />
        </Grid>
      </Grid>

      {/* Apply Filter Button */}
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button
          variant="contained"
          onClick={handleApplyFilter}
          sx={{
            backgroundColor: '#3A5940',
            '&:hover': { backgroundColor: '#578158' },
            textTransform: 'none',
          }}
        >
          Apply Filter
        </Button>
      </Box>
    </Box>
  );
};

export default FilterSection;
