import React from 'react';
import { render, screen } from '@testing-library/react';
import SignInPage from '../pages/SignInPage';

describe('SignInPage Component Tests', () => {
    it('renders SignInPage with SignInCard centered', () => {
        render(<SignInPage />);
        const signInCard = screen.getByText(/DLSU Email/i);
        expect(signInCard).toBeInTheDocument();
        const containerStyle = getComputedStyle(screen.getByText(/DLSU Email/i).parentElement.parentElement);
        expect(containerStyle.display).toBe('flex');
        expect(containerStyle.justifyContent).toBe('center');
        expect(containerStyle.alignItems).toBe('center');
    });
});
