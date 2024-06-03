'use client';

import styled from 'styled-components';
import Timeline, { TimelineProps } from './Timeline';

interface ExperienceProps {
    work: TimelineProps;
    education: TimelineProps;
}

const StyledExperience = styled.div`
    color: ${({ theme }) => theme.colors.text1};
    display: grid;
    column-gap: 0.5rem;
    grid-template-columns: repeat(24, 1fr);
    margin: 0px auto;
    max-width: 1600px;
    padding: 0 3rem;
    width: 100%;
`;

export default function Experience({ work, education }: ExperienceProps) {
    return (
        <section className="my-40">
            <StyledExperience id="experience">
                <Timeline title={work.title} roles={work.roles} />
                <Timeline title={education.title} roles={education.roles} />
            </StyledExperience>
        </section>
    );
}
