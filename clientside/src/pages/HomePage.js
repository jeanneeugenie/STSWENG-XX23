import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RidePostCard from '../components/cards/ridepost';
import FilterSection from '../components/header/filters';
import { Button, Dialog, DialogContent, DialogActions, TextField, Typography, Rating, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const HomePage = ({ isDriver }) => {
    const centeredContainer = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
    };

    const stickyButton = {
        position: 'sticky',
        bottom: '2%',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
    };

    const [filters, setFilters] = useState({});
    const [tempData, setTempData] = useState([]);
    const [dialogState, setDialogState] = useState(false);
    const [selectedRide, setSelectedRide] = useState(null);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false); 
    const [bookedRide, setBookedRide] = useState(null);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await axios.get('http://localhost:2805/api/ride/getAllRides');
                console.log('API Response:', response.data.allRides);
                setTempData(response.data.allRides);
            } catch (error) {
                console.error('Error fetching rides:', error);
            }
        };

        fetchRides();
    }, []);

    const filterRides = tempData.filter((ride) => {
        return (
            (!filters.driver || ride.driver === filters.driver) &&
            (!filters.rating || ride.rating.toString() === filters.rating) &&
            (!filters.pickupPoint || ride.pickupPoint === filters.pickupPoint) &&
            (!filters.destination || ride.destination === filters.destination) &&
            (!filters.startHour || ride.pickupTimeHour >= parseInt(filters.startHour, 10)) &&
            (!filters.endHour || ride.pickupTimeHour <= parseInt(filters.endHour, 10))
        );
    });

    const openDialog = () => {
        setDialogState(true);
    };

    const closeDialog = () => {
        setDialogState(false);
    };

    const openRideDetails = (ride) => {
        setSelectedRide(ride);
        setDetailsDialogOpen(true);
    };

    const closeDetails = () => {
        setDetailsDialogOpen(false);
        setSelectedRide(null);
    };

    const getRide = (rideDetails) => {
        setBookedRide(rideDetails);
        console.log(bookedRide);
    };

    // Function to validate minutes between 00 and 59
    const handleMinuteChange = (e) => {
        const value = e.target.value;
        if (value >= 0 && value <= 59) {
            setFilters({ ...filters, pickupTimeMinute: value });
        }
    };

    return (
        <div>
            <FilterSection onApplyFilter={setFilters} />
            <div style={centeredContainer}>
                {filterRides.map((ride) => (
                    <RidePostCard 
                        key={ride.id}
                        rating={ride.rating} 
                        destination={ride.dropoff} 
                        pickupPoint={ride.pickupPoint} 
                        driver={ride.driver} 
                        pickupTimeHour={ride.pickupTimeHour} 
                        pickupTimeMinute={ride.pickupTimeMinute} 
                        getRide={getRide} 
                        carDetails={ride.vehicle} 
                        maxPass={ride.maxPassengers}
                        openRideDetails={() => openRideDetails(ride)}
                    />
                ))}
            </div>
            {isDriver && (
                <div style={stickyButton}>
                    <Button 
                        variant="contained"  
                        onClick={openDialog}
                        sx={{
                            backgroundColor: '#3A5940',
                            '&:hover': {
                                backgroundColor: '#578158',
                            },
                        }}>
                        Post Ride 
                    </Button>
                </div> 
            )}
            <Dialog open={dialogState} onClose={closeDialog}>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '2rem',
                    }}>
                    <Typography variant="h6">
                        Ride destination
                    </Typography>
                    <TextField
                        fullWidth
                        label="Destination"
                        variant="outlined"
                        margin="dense"
                    />
                    <Typography variant="h6">
                        Ride pick-up point
                    </Typography>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Pick-up Point</InputLabel>
                        <Select
                            value={filters.pickupPoint || ''}
                            onChange={(e) => setFilters({ ...filters, pickupPoint: e.target.value })}
                            label="Pick-up Point"
                        >
                            <MenuItem value="George Ty Building">George Ty Building</MenuItem>
                            <MenuItem value="Richard Lee Block">Richard Lee Block</MenuItem>
                            <MenuItem value="Milagros R. del Rosario Building">Milagros R. del Rosario Building</MenuItem>
                            <MenuItem value="Enrique Razon Building">Enrique Razon Building</MenuItem>
                            <MenuItem value="University Hall">University Hall</MenuItem>
                            <MenuItem value="Covered Court/West Canopy">Covered Court/West Canopy</MenuItem>
                            <MenuItem value="LC2 Annex">LC2 Annex</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography variant="h6">
                        Pick-up Schedule (in Military Time)
                    </Typography>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Pick-up Hour</InputLabel>
                        <Select
                            value={filters.pickupTimeHour || ''}
                            onChange={(e) => setFilters({ ...filters, pickupTimeHour: e.target.value })}
                            label="Pick-up Hour"
                        >
                            {[...Array(24).keys()].map((hour) => (
                                <MenuItem key={hour} value={hour}>
                                    {hour < 10 ? `0${hour}` : hour}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Typography variant="h6">
                        Pick-up Schedule (minutes)
                    </Typography>
                    <TextField
                        type="number"
                        fullWidth
                        label="Pick-up Time (minute)"
                        variant="outlined"
                        margin="dense"
                        value={filters.pickupTimeMinute || ''}
                        onChange={handleMinuteChange}
                        inputProps={{ min: 0, max: 59 }}
                    />
                    <Typography variant="h6">
                        Vehicle Information (Identification)
                    </Typography>
                    <TextField
                        fullWidth
                        label="Vehicle details (License plate & Color)"
                        variant="outlined"
                        margin="dense"
                    />
                    <Typography variant="h6">
                        Maximum No. of Passengers
                    </Typography>
                    <TextField
                        type="number"
                        fullWidth
                        label="Max No. of Passengers"
                        variant="outlined"
                        margin="dense"
                    />
                    <DialogActions sx={{ padding: 0, marginTop: '1rem', width: '100%' }}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                closeDialog();
                            }}
                            sx={{
                                backgroundColor: '#3A5940',
                                '&:hover': {
                                    backgroundColor: '#578158',
                                },
                                textTransform: 'none',
                            }}>
                            Post Ride
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <Dialog open={detailsDialogOpen} onClose={closeDetails}>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        padding: '2rem',
                    }}>
                    <Rating
                        name="driver-rating"
                        value={selectedRide?.rating || 0}
                        readOnly
                        precision={0.5}
                        size="medium"
                    />
                    <Typography variant="h5" sx={{ fontWeight: 'bold'}}>
                        {selectedRide?.destination}
                    </Typography>
                    <Typography variant="h6" color="gray">
                        Pick up point: {selectedRide?.pickupPoint}
                    </Typography>
                    <Typography variant="h6" color="gray">
                        Pick up time: 
                    {(selectedRide?.pickupTimeHour !== undefined && selectedRide?.pickupTimeMinute !== undefined)
                    ? `${selectedRide?.pickupTimeHour.toString().padStart(2, '0')}:${selectedRide?.pickupTimeMinute.toString().padStart(2, '0')}`
                    : 'Schedule'}
                    </Typography>
                    <Typography variant="h6" color="gray">
                        Driver: {selectedRide?.driver}
                    </Typography>
                    <Typography variant="h6" color="gray">
                        Vehicle Identification: {selectedRide?.vehicle}
                    </Typography>
                    <DialogActions sx={{ padding: '1px', marginTop: '1rem', width: '100%' }}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                getRide(selectedRide);
                                closeDetails();
                            }}
                            sx={{
                                backgroundColor: '#3A5940',
                                '&:hover': {
                                    backgroundColor: '#578158',
                                },
                                textTransform: 'none',
                            }}>
                            Book Ride
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default HomePage;
