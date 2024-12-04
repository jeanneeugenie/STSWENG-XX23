import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterPage from '../pages/RegisterPage';

describe('RegisterPage Component Tests', () => {
    it('renders RegisterPage with RegisterCard centered', () => {
        render(<RegisterPage />);
        const registerCard = screen.getByText(/DLSU Email/i); // Assuming "DLSU Email" is in RegisterCard
        expect(registerCard).toBeInTheDocument();

        const containerStyle = getComputedStyle(registerCard.parentElement.parentElement);
        expect(containerStyle.display).toBe('flex');
        expect(containerStyle.justifyContent).toBe('center');
        expect(containerStyle.alignItems).toBe('center');
    });
});
