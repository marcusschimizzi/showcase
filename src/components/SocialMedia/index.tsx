'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const StyledLink = styled.a<{ $align: string }>`
    position: relative;
    padding: 0 1rem;
    padding-left: ${(props) => (props.$align === 'left' ? '0' : '1rem')};
    padding-right: ${(props) => (props.$align === 'right' ? '0' : '1rem')};
    transition: color 0.2s ease;
`;

const StyledIcon = styled(FontAwesomeIcon)`
    will-change: transform;
    transition: transform 0.6s ease;

    &:hover {
        transition: transform 0.15s ease;
        transform: scale(1.2);
    }
`;

const StyledLinkedInIcon = styled(StyledIcon)`
    &:hover {
        color: #0077b5;
    }
`;

const StyledGithubIcon = styled(StyledIcon)`
    &:hover {
        color: #6e5494;
    }
`;

interface SocialMediaProps {
    align: 'left' | 'right' | 'center';
}

export default function SocialMedia({ align }: SocialMediaProps) {
    return (
        <div className="links">
            <StyledLink id="linkedin" href="https://www.linkedin.com/in/marcusschimizzi" target="_blank" $align={align}>
                <StyledLinkedInIcon
                    className="icon items-center inline-flex justify-center h-6 w-6"
                    icon={faLinkedin}
                />
            </StyledLink>
            <StyledLink id="github" href="https://github.com/marcusschimizzi" target="_blank" $align={align}>
                <StyledGithubIcon className="icon items-center inline-flex justify-center h-6 w-6" icon={faGithub} />
            </StyledLink>
        </div>
    );
}
