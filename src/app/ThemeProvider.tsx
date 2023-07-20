'use client';

import { useState, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyle } from './ThemeConfig';

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState('dark');

    return (
        <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyle />
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
            {children}
        </StyledThemeProvider>
    );
}
