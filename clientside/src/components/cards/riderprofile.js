import React from 'react';
import { Card, CardContent, Button, Typography, Link } from '@mui/material';

import useStyle from './styles'

const RidePostCard = () => {
    const classes = useStyle();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4" component={Link} gutterBottom>
          Ride Destination/Drop off
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          Ride Pick-up point
        </Typography>
        <Typography variant="h6" component="div" className={classes.greyH6} gutterBottom>
          Driver Name
        </Typography>
        <Typography variant="h6" component="div" className={classes.greyH6} gutterBottom>
          Schedule
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RidePostCard;