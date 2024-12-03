import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Link, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, MenuItem, Select, InputLabel } from '@mui/material';
import useStyle from './styles';
import axios from 'axios';

const RegisterCard = () => {
  const classes = useStyle();

  // State for email, ID, password, retypePassword, user type, and validations
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isIdValid, setIsIdValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [userType, setUserType] = useState('rider'); // state for user type (rider or driver)
  const [userName, setName] = useState('')
  // Additional states for driver-specific fields
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseValidityYear, setLicenseValidityYear] = useState('');
  const [idType, setIdType] = useState('');
  const [idFile, setIdFile] = useState(null);

  // Handle email change and validation
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    // Check if email ends with @dlsu.edu.ph
    if (emailValue.endsWith('@dlsu.edu.ph')) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  // Handle ID number change and validation (must be exactly 8 digits)
  const handleIdNumberChange = (event) => {
    const idValue = event.target.value;
    setIdNumber(idValue);

    // Check if ID number is exactly 8 digits
    if (idValue.length === 8 && /^\d+$/.test(idValue)) {
      setIsIdValid(true);
    } else {
      setIsIdValid(false);
    }
  };

  // Handle password change
  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
  };

  // Handle retyped password change and check if it matches the original password
  const handleRetypePasswordChange = (event) => {
    const retypePasswordValue = event.target.value;
    setRetypePassword(retypePasswordValue);

    // Check if retyped password matches the original password
    if (retypePasswordValue === password) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  };

  const handleUsernameChange = (event) => {
    setName(event.target.value)
  }
  // Handle user type change (rider or driver)
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  // Handle driver's license number change
  const handleLicenseNumberChange = (event) => {
    setLicenseNumber(event.target.value);
  };

  // Handle driver's license validity year change
  const handleLicenseValidityYearChange = (event) => {
    setLicenseValidityYear(event.target.value);
  };

  // Handle selected ID type change
  const handleIdTypeChange = (event) => {
    setIdType(event.target.value);
  };

  // Handle ID file upload
  const handleIdFileChange = (event) => {
    setIdFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
      idNumber: idNumber,
      name: userName, // Example name, replace with actual state or form value
      driverBool: userType === 'driver',
      licenseNumber: licenseNumber,
      licenseValidityYear: licenseValidityYear,
      idType: idType,
      idFile: idFile,
    };
    // Check if all fields are valid
    if (isEmailValid && isIdValid && isPasswordMatch && password && email && idNumber && retypePassword) {
      // If user is a driver, check if the driver-specific fields are filled
      if (userType === 'driver' && !licenseNumber) {
        alert('Please enter your driver\'s license number');
        return;
      }
      if (userType === 'driver' && !licenseValidityYear) {
        alert('Please enter your driver\'s license validity year');
        return;
      }
      if (userType === 'driver' && !idType) {
        alert('Please select a valid ID');
        return;
      }
      if (userType === 'driver' && !idFile) {
        alert('Please upload your ID file');
        return;
      }
      
      // Submit the form if everything is valid
      axios.post('http://localhost:2805/api/auth/register', data)
      .then((response) => {
        console.log('Registration success:', response);
        // Handle success (e.g., show success message, redirect user)
        alert('Registration successful!');
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        // Handle error (e.g., show error message)
        alert('Registration failed, please try again.');
      });

      console.log('Form submitted!');
    } else {
      // If there are validation errors, prevent form submission
      console.log('Please fix the errors in the form');
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" component="div" gutterBottom>
            DLSU Email
          </Typography>
          <TextField
            required
            label="Enter DLSU Email"
            type="email"
            variant="outlined"
            className={classes.textField}
            value={email}
            onChange={handleEmailChange}
            error={!isEmailValid} // Set error state based on email validity
            helperText={isEmailValid ? '' : 'Email must end with @dlsu.edu.ph'} // Display error message
          />
          <Typography variant="h6" component="div" gutterBottom>
            Password
          </Typography>
          <TextField
            required
            label="Enter Password"
            type="password"
            variant="outlined"
            className={classes.textField}
            value={password}
            onChange={handlePasswordChange}
          />
          <Typography variant="h6" component="div" gutterBottom>
            Retype Password
          </Typography>
          <TextField
            required
            label="Retype Password"
            type="password"
            variant="outlined"
            className={classes.textField}
            value={retypePassword}
            onChange={handleRetypePasswordChange}
            error={!isPasswordMatch} // Set error state based on password match
            helperText={isPasswordMatch ? '' : 'Passwords do not match'} // Display error message
          />
          <Typography variant="h6" component="div" gutterBottom>
            ID Number
          </Typography>
          <TextField
            required
            type="Number"
            label="Enter ID Number"
            variant="outlined"
            className={classes.textField}
            value={idNumber}
            onChange={handleIdNumberChange}
            error={!isIdValid} // Set error state based on ID validity
            helperText={isIdValid ? '' : 'ID number must be 8 digits'} // Display error message
          />
          <Typography variant="h6" component="div" gutterBottom>
            Name
          </Typography>
          <TextField
            required
            label="Enter your name"
            type="text"
            variant="outlined"
            value={userName}
            onChange={handleUsernameChange}
            className={classes.textField}
          />
          <FormControl>
            <FormLabel id="user-type-label">User Type</FormLabel>
            <RadioGroup
              aria-labelledby="user-type-label"
              value={userType}
              onChange={handleUserTypeChange}
              name="user-type-group"
            >
              <FormControlLabel value="rider" control={<Radio />} label="Rider" />
              <FormControlLabel value="driver" control={<Radio />} label="Driver" />
            </RadioGroup>
          </FormControl>

          {/* Driver-specific fields */}
          {userType === 'driver' && (
            <>
              <Typography variant="h6" component="div" gutterBottom>
                Driver's License Number
              </Typography>
              <TextField
                required
                label="Enter Driver's License Number"
                variant="outlined"
                className={classes.textField}
                value={licenseNumber}
                onChange={handleLicenseNumberChange}
              />
              <Typography variant="h6" component="div" gutterBottom>
                License Year of Validity
              </Typography>
              <TextField
                required
                label="Enter License Validity Year"
                type="number"
                variant="outlined"
                className={classes.textField}
                value={licenseValidityYear}
                onChange={handleLicenseValidityYearChange}
              />
              <Typography variant="h6" component="div" gutterBottom>
                Select a Valid ID
              </Typography>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Choose ID</InputLabel>
                <Select
                  value={idType}
                  onChange={handleIdTypeChange}
                  label="Choose ID"
                >
                  <MenuItem value="passport">Passport</MenuItem>
                  <MenuItem value="birth_certificate">PSA Birth Certificate</MenuItem>
                  <MenuItem value="sss">SSS/GSIS</MenuItem>
                  <MenuItem value="postal_id">Postal ID</MenuItem>
                  <MenuItem value="national_id">National ID</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="h6" component="div" gutterBottom>
                Upload Selected ID
              </Typography>
              <input
                required
                type="file"
                onChange={handleIdFileChange}
              />
            </>
          )}

          <Button type="submit" variant="contained" className={classes.button}>
            Register
          </Button>
          <Link href="/signin" variant="body2" className={classes.link}>
            Have an account? Sign In
          </Link>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
