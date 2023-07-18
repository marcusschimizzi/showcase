'use client';

import { useEffect } from 'react';
import './ProgressBar.css';

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

    return <div className="progress-bar"></div>;
}
