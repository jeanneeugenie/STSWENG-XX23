import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInCard from '../components/cards/signin';
import axios from 'axios';

jest.mock('axios');

describe('SignInCard Component Tests', () => {
    it('renders all form fields and buttons', () => {
        render(<SignInCard />);
        expect(screen.getByLabelText(/DLSU Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
        expect(screen.getByText(/Register an account/i)).toBeInTheDocument();
    });

    it('validates email field with invalid input', () => {
        render(<SignInCard />);
        const emailInput = screen.getByLabelText(/DLSU Email/i);
        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        expect(emailInput.value).toBe('invalidemail'); // Value is set
        // No specific error message is implemented for email validation
    });

    it('shows error for empty password field', async () => {
        render(<SignInCard />);
        const signInButton = screen.getByText(/Sign In/i);
        fireEvent.click(signInButton);
        const errorMessage = await screen.findByText(/Login failed/i);
        expect(errorMessage).toBeInTheDocument();
    });

    it('shows error on incorrect login credentials', async () => {
        axios.post.mockRejectedValue({
            response: { data: { error: 'Invalid credentials' } },
        });

        render(<SignInCard />);
        const emailInput = screen.getByLabelText(/DLSU Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const signInButton = screen.getByText(/Sign In/i);

        fireEvent.change(emailInput, { target: { value: 'user@dlsu.edu.ph' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(signInButton);

        const errorMessage = await screen.findByText(/Invalid credentials/i);
        expect(errorMessage).toBeInTheDocument();
    });

    it('logs in successfully with correct credentials', async () => {
        axios.post.mockResolvedValue({
            data: { message: 'Login successful!' },
        });

        render(<SignInCard />);
        const emailInput = screen.getByLabelText(/DLSU Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const signInButton = screen.getByText(/Sign In/i);

        fireEvent.change(emailInput, { target: { value: 'user@dlsu.edu.ph' } });
        fireEvent.change(passwordInput, { target: { value: 'correctpassword' } });
        fireEvent.click(signInButton);

        await waitFor(() =>
            expect(window.alert).toHaveBeenCalledWith('Login successful!')
        );
    });

    it('navigates to Register page on clicking Register link', () => {
        render(<SignInCard />);
        const registerLink = screen.getByText(/Register an account/i);
        expect(registerLink).toHaveAttribute('href', '/register');
    });
});
