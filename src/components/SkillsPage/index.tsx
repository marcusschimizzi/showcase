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
            <h3 className="GrayText px-2">
                Circle size indicates relative proficiency. Click on any skill to learn more.
            </h3>

            <div className="mx-auto h-[50vh] max-w-6xl mt-4 relative">
                <Bubbles renderOnlyInViewport={true} />
            </div>
        </StyledSkills>
    );
};

export default SkillsPage;
