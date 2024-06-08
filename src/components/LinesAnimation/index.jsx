import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useTheme } from 'styled-components';
import { area, curveBasis } from 'd3-shape';
import styled from 'styled-components';
import { scaledRandom, useInterval } from '@/utils/utils';

const WIGGLES = 20;
const HEIGHT = 30;

const StyledAnimationWrapper = styled.div`
    width: 100%;
    height: 100%;
    z-index: 0;
    position: absolute;
`;

const StyledSVG = styled.svg`
    position: absolute;
    top: 9em;
    left: 0;
    width: 100%;
    height: 13em;
    filter: blur(10px) brightness(0.8);
    transition: all 0.6s ease-out;
    overflow: visible;

    &:hover {
        filter: blur(0px);
    }
`;

const StyledPath = styled(animated.path)`
    mix-blend-mode: multiply;
`;

const LinesAnimation = () => {
    const colors = useTheme().colors;
    const lineColors = [colors.main1, colors.main2, colors.main3];

    const generateData = () => {
        const data = [];
        for (let i = 0; i < WIGGLES; i++) {
            data.push({
                x: i,
                y0: Math.max(0, (HEIGHT / 2) * (1 / (Math.abs(i - WIGGLES / 2) || 1)) + scaledRandom(0, 8) + 3),
                y1: Math.min(0, (-HEIGHT / 2) * (1 / (Math.abs(i - WIGGLES / 2) || 1)) + scaledRandom(0, 8) - 3),
            });
        }
        return data;
    };

    const getPath = () => {
        const path = area()
            .x((d) => d.x)
            .y0((d) => -d.y0)
            .y1((d) => d.y1)
            .curve(curveBasis)(generateData());
        return path;
    };

    const [path1, setPath1] = useState(getPath());
    const [path2, setPath2] = useState(getPath());
    const [path3, setPath3] = useState(getPath());

    useInterval(() => {
        setPath1(getPath());
        setPath2(getPath());
        setPath3(getPath());
    }, 3000);

    const spring1 = useSpring({ config: { duration: 3000 }, path: path1 });
    const spring2 = useSpring({ config: { duration: 3000 }, path: path2 });
    const spring3 = useSpring({ config: { duration: 3000 }, path: path3 });

    return (
        <StyledAnimationWrapper>
            <StyledSVG viewBox={`0 ${-HEIGHT / 2} ${WIGGLES - 1} ${HEIGHT}`} preserveAspectRatio="none">
                <defs>
                    <linearGradient id="gradient1">
                        <stop offset="0%" stopColor="#f2f2f7" />
                        <stop offset="50%" stopColor={lineColors[0]} />
                        <stop offset="100%" stopColor="#f2f2f7" />
                    </linearGradient>
                    <linearGradient id="gradient2">
                        <stop offset="0%" stopColor="#f2f2f7" />
                        <stop offset="50%" stopColor={lineColors[1]} />
                        <stop offset="100%" stopColor="#f2f2f7" />
                    </linearGradient>
                    <linearGradient id="gradient3">
                        <stop offset="0%" stopColor="#f2f2f7" />
                        <stop offset="50%" stopColor={lineColors[2]} />
                        <stop offset="100%" stopColor="#f2f2f7" />
                    </linearGradient>
                </defs>
                <StyledPath d={spring1.path} fill="url(#gradient1)" stroke="none" />
                <StyledPath d={spring2.path} fill="url(#gradient2)" stroke="none" />
                <StyledPath d={spring3.path} fill="url(#gradient3)" stroke="none" />
            </StyledSVG>
        </StyledAnimationWrapper>
    );
};

export default LinesAnimation;
