import React, {useState} from 'react';
import RidePostCard from '../components/cards/ridepost';
import FilterSection from '../components/header/filters';
import {Button, Dialog, DialogContent, DialogActions, TextField, Typography} from '@mui/material';
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
    const [dialogState, setDialogState] = useState(false);
    const [bookedRide, setBookedRide] = useState(null);
    const tempData = [
        { id: 1, driver: 'Driver A', rating: 5, pickupPoint: 'GT Building', destination: 'MRR', time: '830' },
        { id: 2, driver: 'Driver B', rating: 4, pickupPoint: 'MRR', destination: 'GT Building', time: '1030' },
    ];

    const filterRides = tempData.filter((ride) => {
        return (
            (!filters.driver || ride.driver === filters.driver) &&
            (!filters.rating || ride.rating.toString() === filters.rating) &&
            (!filters.pickupPoint || ride.pickupPoint === filters.pickupPoint) &&
            (!filters.destination || ride.destination === filters.destination) &&
             (!filters.time || ride.time === filters.time)
        );
    });
    const openDialog = () => {
        setDialogState(true);
    };

    const closeDialog = () => {
        setDialogState(false);
    };
    const getRide = (rideDetails) => {
        setBookedRide(rideDetails);
        alert(`You have booked the ride to ${rideDetails.destination}`);
    };
    return (
        
        <div>
            <FilterSection onApplyFilter={setFilters} />
            <div style={centeredContainer}>
                {filterRides.map((ride) => (
                <RidePostCard key={ride.id} destination = {ride.destination} pickupPoint = {ride.pickupPoint} driver = {ride.driver} time = {ride.time} getRide={getRide}/>
                ))}
            </div>
            { isDriver && (
            <div style={stickyButton}>
                <Button variant="contained"  onClick={openDialog}
                sx={{
                    backgroundColor: '#3A5940',
                    '&:hover': {
                        backgroundColor: '#578158',
                    },
                }}>
                Post Ride </Button>
            </div> 
            )}
            <Dialog open={dialogState} onClose={closeDialog}>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '2rem',
                    }}
                >
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
                    <TextField
                        fullWidth
                        label="Pick-up Point"
                        variant="outlined"
                        margin="dense"
                    />
                    <Typography variant="h6">
                        Pick-up Schedule
                    </Typography>
                    <TextField
                        fullWidth
                        label="Pick-up Time"
                        variant="outlined"
                        margin="dense"
                        sx={{ marginBottom: '1rem' }}
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
                            }}
                        >
                            Post Ride
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
        
    );
}

export default HomePage;