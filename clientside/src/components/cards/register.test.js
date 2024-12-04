import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterCard from '../components/cards/register';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('RegisterCard Component Tests', () => {
    it('renders all required form fields and buttons', () => {
        renderWithRouter(<RegisterCard />);
        expect(screen.getByLabelText(/Enter DLSU Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Retype Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Enter ID Number/i)).toBeInTheDocument();
        expect(screen.getByText(/Register/i)).toBeInTheDocument();
        expect(screen.getByText(/Have an account\? Sign In/i)).toBeInTheDocument();
    });

    it('validates email format', () => {
        renderWithRouter(<RegisterCard />);
        const emailInput = screen.getByLabelText(/Enter DLSU Email/i);
        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        expect(emailInput).toHaveValue('invalidemail');
        expect(screen.getByText(/Email must end with @dlsu.edu.ph/i)).toBeInTheDocument();
    });

    it('validates ID number format', () => {
        renderWithRouter(<RegisterCard />);
        const idInput = screen.getByLabelText(/Enter ID Number/i);
        fireEvent.change(idInput, { target: { value: '123' } });
        expect(idInput).toHaveValue('123');
        expect(screen.getByText(/ID number must be 8 digits/i)).toBeInTheDocument();
    });

    it('validates password matching', () => {
        renderWithRouter(<RegisterCard />);
        const passwordInput = screen.getByLabelText(/Enter Password/i);
        const retypePasswordInput = screen.getByLabelText(/Retype Password/i);

        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(retypePasswordInput, { target: { value: 'password124' } });
        expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });

    it('shows driver-specific fields when user type is set to driver', () => {
        renderWithRouter(<RegisterCard />);
        const driverOption = screen.getByLabelText(/Driver/i);
        fireEvent.click(driverOption);

        expect(screen.getByLabelText(/Driver's License Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Enter License Validity Year/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Choose ID/i)).toBeInTheDocument();
    });

    it('handles successful registration', async () => {
        axios.post.mockResolvedValue({ data: { message: 'Registration successful!' } });

        renderWithRouter(<RegisterCard />);
        const emailInput = screen.getByLabelText(/Enter DLSU Email/i);
        const idInput = screen.getByLabelText(/Enter ID Number/i);
        const passwordInput = screen.getByLabelText(/Enter Password/i);
        const retypePasswordInput = screen.getByLabelText(/Retype Password/i);
        const registerButton = screen.getByText(/Register/i);

        fireEvent.change(emailInput, { target: { value: 'user@dlsu.edu.ph' } });
        fireEvent.change(idInput, { target: { value: '12345678' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(retypePasswordInput, { target: { value: 'password123' } });
        fireEvent.click(registerButton);

        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:2805/api/auth/register',
            expect.any(Object)
        );
    });

    it('handles registration failure', async () => {
        axios.post.mockRejectedValue({ response: { data: { error: 'Registration failed' } } });

        renderWithRouter(<RegisterCard />);
        const emailInput = screen.getByLabelText(/Enter DLSU Email/i);
        const passwordInput = screen.getByLabelText(/Enter Password/i);
        const retypePasswordInput = screen.getByLabelText(/Retype Password/i);
        const registerButton = screen.getByText(/Register/i);

        fireEvent.change(emailInput, { target: { value: 'user@dlsu.edu.ph' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(retypePasswordInput, { target: { value: 'password123' } });
        fireEvent.click(registerButton);

        const errorMessage = await screen.findByText(/Registration failed/i);
        expect(errorMessage).toBeInTheDocument();
    });

    it('navigates to SignIn page on clicking the link', () => {
        renderWithRouter(<RegisterCard />);
        const signInLink = screen.getByText(/Have an account\? Sign In/i);
        expect(signInLink).toHaveAttribute('href', '/signin');
    });
});
