'use client';

import styled from 'styled-components';
import Bubbles from '../Bubbles';

const StyledSkills = styled.section`
    background-color: ${({ theme }) => theme.colors.background2};
    color: ${({ theme }) => theme.colors.text3};
`;

const StyledHeader = styled.h1`
    color: ${({ theme }) => theme.colors.text1};
`;

const SkillsPage = () => {
    return (
        <StyledSkills className="py-40 text-center" id="skills">
            <StyledHeader className="text-5xl">Skills</StyledHeader>
            <div className="mx-auto h-[50vh] max-w-6xl mt-24">
                <Bubbles />
            </div>
        </StyledSkills>
    );
};

export default SkillsPage;
