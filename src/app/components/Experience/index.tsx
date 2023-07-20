'use client';

import styled from 'styled-components';
import Timeline, { TimelineProps } from './Timeline';

interface ExperienceProps {
    work: TimelineProps;
    education: TimelineProps;
}

const StyledExperience = styled.div`
    color: ${({ theme }) => theme.colors.text1};
`;

export default function Experience({ work, education }: ExperienceProps) {
    return (
        <StyledExperience className="flex flex-col gap-4 py-16 md:flex-row justify-center items-center md:items-start">
            <Timeline title={work.title} roles={work.roles} />
            <Timeline title={education.title} roles={education.roles} />
        </StyledExperience>
    );
}
