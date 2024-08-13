'use client';

import styled from 'styled-components';
import Bubbles from '../Bubbles';

const StyledHeader = styled.h1`
    color: ${({ theme }) => theme.colors.text1};
`;

const StyledSkills = styled.div`
    background-color: ${({ theme }) => theme.colors.background2};
`;

const SkillsPage = () => {
    return (
        <StyledSkills className="py-40 text-center max-w-full overflow-x-hidden" id="skills">
            <StyledHeader className="text-5xl">Skills</StyledHeader>
            <h3 className="GrayText px-2">
                Circle size indicates relative proficiency. Click on any skill to learn more.
            </h3>

            <div className="mx-auto h-[80vh] md:h-[60vh] max-w-6xl mt-4 relative">
                <Bubbles renderOnlyInViewport={true} />
            </div>
        </StyledSkills>
    );
};

export default SkillsPage;
