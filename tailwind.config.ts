import { Config } from 'tailwindcss';

export const colors = {
    transparent: 'transparent',
    current: 'currentColor',
    white: '#ffffff',
    black: '#000000',
    primary: {
        50: '#eff8ff',
        100: '#dbeffe',
        200: '#bfe4fe',
        300: '#92d4fe',
        400: '#5fbbfb',
        500: '#3a9cf7',
        600: '#237eed',
        700: '#1c67d9',
        800: '#1f5abd',
        900: '#1d498b',
        950: '#172d54',
    },
    secondary: {
        50: '#fcf3ff',
        100: '#f8e6ff',
        200: '#f0ccff',
        300: '#e9a4ff',
        400: '#dd6eff',
        500: '#cb37fe',
        600: '#b217e2',
        700: '#970fbc',
        800: '#8910a8',
        900: '#69127d',
        950: '#450055',
    },
    tertiary: {
        50: '#f5f4fe',
        100: '#ecebfc',
        200: '#dbdafa',
        300: '#c1bdf5',
        400: '#a197ee',
        500: '#806de5',
        600: '#6d4dda',
        700: '#5d3bc6',
        800: '#5435b3',
        900: '#422a88',
        950: '#27195c',
    },
    pop: {
        50: '#f2fbf5',
        100: '#e0f8e8',
        200: '#c2f0d1',
        300: '#92e3ae',
        400: '#48c774',
        500: '#35b261',
        600: '#26934c',
        700: '#21743e',
        800: '#1f5c35',
        900: '#1b4c2e',
        950: '#0a2916',
    },
    gray: {
        50: '#f6f6f6',
        100: '#e7e7e7',
        200: '#d1d1d1',
        300: '#b0b0b0',
        400: '#888888',
        500: '#6d6d6d',
        600: '#5d5d5d',
        700: '#4f4f4f',
        800: '#454545',
        900: '#3d3d3d',
        950: '#121212',
    },
};

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        fontFamily: {
            serif: ['Courier New', 'Courier', 'monospace'],
            sans: ['Helvetica', 'Arial', 'sans-serif'],
        },
        colors,
    },
    plugins: [],
};

export default config;
