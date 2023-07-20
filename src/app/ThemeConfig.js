import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
    name: 'light',
    colors: {
        background1: '#f5f5f5',
        background2: '#ebebeb',
        background3: '#e0e0e0',
        text1: '#373737',
        text2: '#4b4b4b',
        text3: '#616161',
        accent1: '#e1f5fe',
        accent2: '#e9e2f9',
        accent3: '#f0d2ff',
        main1: '#1f5abd',
        main2: '#5435B3',
        main3: '#8910a8',
    },
};

export const darkTheme = {
    name: 'dark',
    colors: {
        background1: '#232323',
        background2: '#2d2d2d',
        background3: '#353535',
        text1: '#e1e1e1',
        text2: '#c8c8c8',
        text3: '#aeaeae',
        accent1: '#317DEB',
        accent2: '#67568C',
        accent3: '#7F007F',
        main1: '#1f5abd',
        main2: '#5435B3',
        main3: '#8910a8',
    },
};

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${(props) => props.theme.colors.background1};
        color: ${(props) => props.theme.colors.text1};
        transition: all 0.25s linear;
        box-sizing: border-box;
    }
`;
