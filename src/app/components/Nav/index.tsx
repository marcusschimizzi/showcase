'use client';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '@/app/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import ScrollLink from '../ScrollLink';

const StyledLogo = styled(motion.div)`
    margin: 0 0 0.25rem;
    height: 32px;
    width: 32px;

    @media screen and (min-width: 1024px) {
        height: 64px;
        width: 64px;
    }
`;

const StyledNav = styled.nav`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 1rem 3rem;
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
`;

const StyledListItem = styled.li`
    margin: 0 1rem;

    @media (max-width: 500px) {
        display: none;
    }
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

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const hash = window.location.hash;

        if (!hash) {
            return;
        }

        setTimeout(() => {
            const startWithHash = /^#\w+/;
            if (!startWithHash.test(hash)) {
                return;
            }

            let target = document.querySelector(hash);

            if (!target) {
                return;
            }

            const targetRect = target.getBoundingClientRect();
            const targetTop = targetRect.top + window.scrollY;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth',
            });
        }, 1000);
    }, []);

    return (
        <StyledNav>
            <StyledLogo
                className="block relative mb-3"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
            >
                <Image
                    className="block h-auto w-full"
                    src="/images/logo-gradient.svg"
                    alt="m logo"
                    width={12}
                    height={12}
                    priority
                />
            </StyledLogo>
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
                        initial={{ x: 100, rotate: 360 }}
                        animate={{ x: 0, rotate: 0 }}
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
