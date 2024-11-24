import React from 'react';
import { Card, CardContent, Button, Typography, Link } from '@mui/material';

import useStyle from './styles'

const RidePostCard = ({ destination, pickupPoint, driverName, time, rating }) => {
    const classes = useStyle();
  return (
    <Card className={classes.card} sx = {{width: '600px', margin: '10px'}}>
      <CardContent>
        <Typography variant="h4" component={Link} gutterBottom>
        {destination || 'Ride Destination/Drop off'}
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
        {pickupPoint || 'Ride Pick-up point'}
        </Typography>
        <Typography variant="h6" component="div" className={classes.greyH6} gutterBottom>
        {driverName || 'Driver Name'}
        </Typography>
        <Typography variant="h6" component="div" className={classes.greyH6} gutterBottom>
        {time || 'Schedule'}
        </Typography>
        <Typography variant="h6" component="div" className={classes.greyH6} gutterBottom>
        {licensePlate || 'License Plate'}
        </Typography>
        <Typography variant="h6" component="div" className={classes.greyH6} gutterBottom>
        {color || 'Color'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RidePostCard;