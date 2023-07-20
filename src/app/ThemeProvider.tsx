'use client';

import { useState, ReactNode, useEffect, createContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyle } from './ThemeConfig';

export const ThemeContext = createContext({
    theme: darkTheme,
    toggleTheme: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState(darkTheme);

    const toggleTheme = () => {
        const newTheme = theme.name === 'light' ? darkTheme : lightTheme;
        setTheme(newTheme);
        window.localStorage.setItem('theme', newTheme.name);
    };

    useEffect(() => {
        // Look for theme in local storage
        const localTheme = window.localStorage.getItem('theme');

        // Load the saved theme or respect the user's OS preference
        const preferDarkQuery = '(prefers-color-scheme: dark)';
        const mql = window.matchMedia(preferDarkQuery);
        const hasMediaQueryPreference = typeof mql.matches === 'boolean';

        // If a theme is saved in localStorage, use that. Otherwise, fall back to honoring the OS preference. Finally, use dark mode as a default.
        let themeToUse;

        if (localTheme) {
            themeToUse = localTheme === 'dark' ? darkTheme : lightTheme;
        } else if (hasMediaQueryPreference) {
            themeToUse = mql.matches ? darkTheme : lightTheme;
        } else {
            themeToUse = darkTheme;
        }

        setTheme(themeToUse);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <StyledThemeProvider theme={theme}>
                <GlobalStyle />
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
}
