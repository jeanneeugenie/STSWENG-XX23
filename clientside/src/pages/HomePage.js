import React, {useState} from 'react';
import RidePostCard from '../components/cards/ridepost';
import FilterSection from '../components/header/filters';
const HomePage = () => {
    const centeredContainer = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
    };
    const [filters, setFilters] = useState({});
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
    return (
        
        <div>
            <FilterSection onApplyFilter={setFilters} />
            <div style={centeredContainer}>
                {filterRides.map((ride) => (
                <RidePostCard key={ride.id} destination = {ride.destination} pickupPoint = {ride.pickupPoint} driver = {ride.driver} time = {ride.time}/>
                ))}
            </div>
        </div>
    );
}

export default HomePage;