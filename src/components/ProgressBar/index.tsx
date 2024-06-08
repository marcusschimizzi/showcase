'use client';

import { useEffect } from 'react';
import styled from 'styled-components';

const StyledProgressBar = styled.div`
    position: fixed;
    top: 0;
    height: 5px;
    width: 100%;
    z-index: 1000;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    --progress: 0%;
    background: ${({ theme }) =>
        `linear-gradient(to right, ${theme.colors.main1} 0, ${theme.colors.main2} var(--progress), transparent 0)`};
`;

export default function ProgressBar() {
    useEffect(() => {
        function computeProgress() {
            const bottom = document.body.scrollHeight - window.innerHeight;
            let progress = bottom > 0 ? window.scrollY / bottom : 1;

            // Set bound to 0 and 1 to prevent weirdness
            progress = Math.max(0, Math.min(1, progress));

            return progress * 100;
        }

        function updateScroll() {
            const progress = computeProgress();
            const progressBar = document.querySelector('.progress-bar') as HTMLElement;
            if (progressBar) {
                progressBar.style.setProperty('--progress', `${progress}%`);
            }
        }

        window.addEventListener('scroll', updateScroll, { passive: true });
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    return <StyledProgressBar className="progress-bar"></StyledProgressBar>;
}
