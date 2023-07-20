import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
    name: 'light',
    colors: {
        main1: '#1F5ABD',
        main2: '#8910A8',
        main3: '#5435B3',
        accent1: '#1DE9B6',
        accent2: '#9413FE',
        accent3: '#7F00FF',
        accent4: '#48C774',
        background1: '#F5F5F5',
        background2: '#EBEBEB',
        background3: '#D9D9D9',
        text1: '#000000',
        text2: '#4B4B4B',
        text3: '#616161',
        text4: '#FFFFFF',
    },
};

export const darkTheme = {
    name: 'dark',
    colors: {
        main1: '#1F5ABD',
        main2: '#8910A8',
        main3: '#5435B3',
        accent1: '#317DEB',
        accent2: '#7F007F',
        accent3: '#67568C',
        accent4: '#48C774',
        background1: '#232323',
        background2: '#3A3A3A',
        background3: '#2D2D2D',
        text1: '#FFFFFF',
        text2: '#C8C8C8',
        text3: '#AEAEAE',
        text4: '#000000',
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
