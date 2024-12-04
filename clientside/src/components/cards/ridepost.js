import React from 'react';
import { Card, CardContent, Typography, Rating } from '@mui/material';

import useStyle from './styles'

const RidePostCard = ({ destination, pickupPoint, driver, pickupTimeHour, pickupTimeMinute, rating, openRideDetails}) => {
    const classes = useStyle();
    console.log({ destination, pickupPoint, driver, pickupTimeHour, pickupTimeMinute, rating });
  return (
    <Card className={classes.card} sx = {{width: '600px', margin: '10px', cursor: 'pointer'}} onClick={()=> openRideDetails({ destination, pickupPoint, driver, pickupTimeHour, pickupTimeMinute, rating })}>
      <CardContent>
       <Rating
        name="driver-rating"
        value={rating || 0}
        readOnly
        precision={0.5}
        size="medium"
        />
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
        {(pickupTimeHour !== undefined && pickupTimeMinute !== undefined)
        ? `${pickupTimeHour.toString().padStart(2, '0')}:${pickupTimeMinute.toString().padStart(2, '0')}`
        : 'Schedule'}
        </Typography>
        
      </CardContent>
    </Card>
  );
};

export default RidePostCard;