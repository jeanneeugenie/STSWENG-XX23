import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme} from '@mui/material/styles';
const root = createRoot(document.getElementById('root'));
const theme = createTheme();
root.render(
<ThemeProvider theme={theme}> 
    <App />
</ThemeProvider>
);
