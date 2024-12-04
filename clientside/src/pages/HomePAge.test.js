import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../pages/HomePage';

describe('HomePage Component Tests', () => {
    const tempData = [
        {
            id: 1,
            driver: 'Driver A',
            rating: 5,
            pickupPoint: 'George Ty Building',
            destination: 'Paseo Outlets',
            pickupHour: '12',
            pickupMinute: '5',
            carDetails: 'ABC 1234, White Toyota Fortuner',
            maxPass: 4,
        },
        {
            id: 2,
            driver: 'Driver B',
            rating: 4,
            pickupPoint: 'Richard Lee Block',
            destination: 'Vista Mall Sta. Rosa',
            pickupHour: '10',
            pickupMinute: '30',
            carDetails: 'DEF 5678, Black Isuzu D-Max',
            maxPass: 3,
        },
    ];

    it('renders filter section and ride post cards', () => {
        render(<HomePage />);
        const filterSection = screen.getByText(/Filter/i); // Assuming FilterSection contains a recognizable text
        expect(filterSection).toBeInTheDocument();

        tempData.forEach((ride) => {
            expect(screen.getByText(ride.destination)).toBeInTheDocument();
        });
    });

    it('filters rides based on driver name', () => {
        render(<HomePage />);
        const filterInput = screen.getByLabelText(/Driver/i); // Assuming there is an input for driver filtering
        fireEvent.change(filterInput, { target: { value: 'Driver A' } });

        expect(screen.getByText('Paseo Outlets')).toBeInTheDocument();
        expect(screen.queryByText('Vista Mall Sta. Rosa')).not.toBeInTheDocument();
    });

    it('opens and closes the ride posting dialog', () => {
        render(<HomePage isDriver={true} />);
        const postRideButton = screen.getByText(/Post Ride/i);
        fireEvent.click(postRideButton);

        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();

        const closeButton = screen.getByText(/Post Ride/i); // Close button inside the dialog
        fireEvent.click(closeButton);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('opens and closes ride details dialog', () => {
        render(<HomePage />);
        const rideCard = screen.getByText(/Paseo Outlets/i);
        fireEvent.click(rideCard);

        const detailsDialog = screen.getByRole('dialog');
        expect(detailsDialog).toBeInTheDocument();

        const closeButton = screen.getByText(/Book Ride/i);
        fireEvent.click(closeButton);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('books a ride when "Book Ride" is clicked', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        render(<HomePage />);

        const rideCard = screen.getByText(/Paseo Outlets/i);
        fireEvent.click(rideCard);

        const bookRideButton = screen.getByText(/Book Ride/i);
        fireEvent.click(bookRideButton);

        expect(consoleSpy).toHaveBeenCalledWith(tempData[0]);
    });

    it('validates minute input for posting ride', () => {
        render(<HomePage isDriver={true} />);
        const postRideButton = screen.getByText(/Post Ride/i);
        fireEvent.click(postRideButton);

        const minuteInput = screen.getByLabelText(/Pick-up Time \(minute\)/i);
        fireEvent.change(minuteInput, { target: { value: '70' } }); // Invalid value
        expect(minuteInput.value).toBe(''); // Should reset or prevent invalid input

        fireEvent.change(minuteInput, { target: { value: '30' } }); // Valid value
        expect(minuteInput.value).toBe('30');
    });
});
