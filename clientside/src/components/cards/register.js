import React from 'react';
import { Card, CardContent, TextField, Button, Typography, Link, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import useStyle from './styles'

const RegisterCard = () => {
    const classes = useStyle();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          DLSU Email
        </Typography>
        <TextField required="True"
          label="Enter DLSU Email"
          type="email"
          variant="outlined"
          className={classes.textField}
        />
        <Typography variant="h6" component="div" gutterBottom>
          Password
        </Typography>
        <TextField required="True" 
          label="Enter Password"
          type="password"
          variant="outlined"
          className={classes.textField}
        />
        <Typography variant="h6" component="div" gutterBottom>
          ID Number
        </Typography>
        <TextField
          required="True"
          type="Number"
          label="Enter ID Number"
          variant="outlined"
          className={classes.textField}
        />
         <Typography variant="h6" component="div" gutterBottom>
          Name
        </Typography>
        <TextField required="True" 
          label="Enter your name"
          type="password"
          variant="outlined"
          className={classes.textField}
        />
        <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">User Type</FormLabel>
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="rider"
            name="radio-buttons-group"
        >
            <FormControlLabel value="rider" control={<Radio />} label="Rider" />
            <FormControlLabel value="driver" control={<Radio />} label="Driver" />
        </RadioGroup>
        </FormControl>
        <Button variant="contained" className={classes.button}>
          Sign In
        </Button>
        <Link href="/signin" variant="body2" className={classes.link}>
          Have an account? Sign In
        </Link>
      </CardContent>
    </Card>
  );
};

export default RegisterCard;