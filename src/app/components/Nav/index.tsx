'use client';
import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '@/app/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import ScrollLink from '../ScrollLink';

const StyledNav = styled.nav`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 10;
`;

const StyledList = styled.ul`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    list-style: none;
    margin: 0;
    padding: 0 2rem;
`;

const StyledListItem = styled.li`
    margin: 0 1rem;
`;

const StyledLink = styled(ScrollLink)`
    color: ${({ theme }) => theme.colors.text2};

    &:hover {
        color: ${({ theme }) => theme.colors.accent2};
    }
`;

const StyledButton = styled.button`
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: inherit;
    font-weight: inherit;
    padding: 0;
    padding-left: 4rem;
`;

const MotionIcon = motion(FontAwesomeIcon);

export default function Nav() {
    const { toggleTheme, theme } = useContext(ThemeContext);

    return (
        <StyledNav>
            <StyledList>
                <StyledListItem>
                    <StyledLink id="about">About</StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink id="projects">Projects</StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink id="experience">Experience</StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink id="contact">Contact</StyledLink>
                </StyledListItem>
                <StyledButton onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
                    <MotionIcon
                        color={theme.colors.text2}
                        size="2xl"
                        icon={theme.name === 'light' ? faMoon : faSun}
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1 }}
                        style={{
                            transition: 'color 1s linear',
                        }}
                    />
                </StyledButton>
            </StyledList>
        </StyledNav>
    );
}
