import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePage from '../pages/ProfilePage';

describe('ProfilePage Component Tests', () => {
    it('renders ProfilePage with UserProfile centered', () => {
        render(<ProfilePage />);
        const userProfile = screen.getByRole('region'); // Assuming UserProfile has a role or a recognizable element
        expect(userProfile).toBeInTheDocument();

        const containerStyle = getComputedStyle(userProfile.parentElement);
        expect(containerStyle.display).toBe('flex');
        expect(containerStyle.justifyContent).toBe('center');
        expect(containerStyle.alignItems).toBe('center');
    });

    it('applies the correct background color and styles', () => {
        render(<ProfilePage />);
        const profilePage = screen.getByRole('region'); // Adjust as necessary
        const style = getComputedStyle(profilePage.parentElement);
        expect(style.backgroundColor).toBe('rgb(163, 177, 138)'); // Ensure the color matches
        expect(style.height).toBe('100vh');
        expect(style.width).toBe('100vw');
    });
});
