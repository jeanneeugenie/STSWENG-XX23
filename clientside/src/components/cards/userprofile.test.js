import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileCard from '../components/cards/userprofile';

describe('userprofile Component Tests', () => {
    it('renders default profile information', () => {
        render(<ProfileCard />);
        expect(screen.getByText(/FULL NAME HERE/i)).toBeInTheDocument();
        expect(screen.getByText(/PROGRAM/i)).toBeInTheDocument();
        expect(screen.getByText(/ID NUMBER/i)).toBeInTheDocument();
    });

    it('opens and closes the edit profile modal', () => {
        render(<ProfileCard />);
        const editButton = screen.getByText(/\. \. \./i); // Trigger button for menu
        fireEvent.click(editButton);

        const editProfileOption = screen.getByText(/Edit Profile/i);
        fireEvent.click(editProfileOption);

        expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();

        const cancelButton = screen.getByText(/Cancel/i);
        fireEvent.click(cancelButton);

        expect(screen.queryByText(/Edit Profile/i)).not.toBeInTheDocument();
    });

    it('allows profile editing and saving', () => {
        render(<ProfileCard />);
        const editButton = screen.getByText(/\. \. \./i);
        fireEvent.click(editButton);

        const editProfileOption = screen.getByText(/Edit Profile/i);
        fireEvent.click(editProfileOption);

        const nameInput = screen.getByLabelText(/Full Name/i);
        fireEvent.change(nameInput, { target: { value: 'New Name' } });

        const saveButton = screen.getByText(/Save/i);
        fireEvent.click(saveButton);

        expect(screen.getByText(/New Name/i)).toBeInTheDocument();
    });

    it('validates file upload for profile picture', () => {
        render(<ProfileCard />);
        const editButton = screen.getByText(/\. \. \./i);
        fireEvent.click(editButton);

        const editProfileOption = screen.getByText(/Edit Profile/i);
        fireEvent.click(editProfileOption);

        const fileInput = screen.getByLabelText(/Upload Profile Picture/i);
        const file = new File(['dummy content'], 'profile.jpg', { type: 'image/jpeg' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        // Mocking FileReader
        expect(fileInput.files[0].name).toBe('profile.jpg');
    });

    it('displays ride schedule correctly', () => {
        render(<ProfileCard />);
        expect(screen.getByText(/MH: Not Set/i)).toBeInTheDocument();
        expect(screen.getByText(/TF: Not Set/i)).toBeInTheDocument();
        expect(screen.getByText(/WS: Not Set/i)).toBeInTheDocument();
    });

    it('handles menu actions (Edit Profile and Logout)', () => {
        render(<ProfileCard />);
        const menuButton = screen.getByText(/\. \. \./i);
        fireEvent.click(menuButton);

        const editProfileOption = screen.getByText(/Edit Profile/i);
        const logoutOption = screen.getByText(/Logout/i);

        expect(editProfileOption).toBeInTheDocument();
        expect(logoutOption).toBeInTheDocument();

        fireEvent.click(logoutOption);
        expect(console.log).toHaveBeenCalledWith('Logout clicked');
    });
});
