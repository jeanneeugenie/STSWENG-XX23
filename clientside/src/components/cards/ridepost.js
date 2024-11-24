import React from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';

import useStyle from './styles'

const RidePostCard = ({ destination, pickupPoint, driver, time, rating, getRide}) => {
    const classes = useStyle();
  return (
    <Card className={classes.card} sx = {{width: '600px', margin: '10px', cursor: 'pointer'}}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
        {destination || 'Ride Destination/Drop off'}
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
        {pickupPoint || 'Ride Pick-up point'}
        </Typography>
        <Typography variant="h6" component="div" className={classes.greyH6} gutterBottom>
        {driver || 'Driver Name'}
        </Typography>
        <Typography variant="h6" component="div" className={classes.greyH6} gutterBottom>
        {time || 'Schedule'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => getRide({ destination, pickupPoint, driver, time, rating })} // Trigger the callback with ride details
          sx={{backgroundColor: '#3A5940','&:hover': {backgroundColor: '#578158'}}}
        >
        Book Ride
        </Button>
      </CardContent>
    </Card>
  );
};

export default RidePostCard;