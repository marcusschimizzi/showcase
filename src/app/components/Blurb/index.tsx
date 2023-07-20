'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styled, { useTheme } from 'styled-components';

const QualtricsText = styled.strong`
    background-image: linear-gradient(90deg, #21dbaa, #00b4ef, #0768dd, #5f1ae5);
    background-size: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    background-clip: text;

    &:hover {
        text-decoration: underline;
    }
`;

const StyledBlurb = styled.section<{ $background: string; $text: string }>`
    background-color: ${(props) => props.$background};
    color: ${(props) => props.$text};
`;

export default function Blurb() {
    const { colors } = useTheme();
    const sectionRef = useRef<HTMLDivElement>(null);
    const control = useAnimation();
    const inView = useInView(sectionRef, { once: true, amount: 0.5 });

    const containerVariants = {
        hidden: {},
        visible: {},
    };

    const childrenVariants = {
        hidden: {
            opacity: 0,
            y: 100,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                mass: 1.5,
                stiffness: 200,
            },
        },
    };

    useEffect(() => {
        if (inView) {
            control.start('visible');
        }
    }, [control, inView]);

    return (
        <StyledBlurb $background={colors.background1} $text={colors.text} className="py-12" ref={sectionRef} id="about">
            <motion.div
                className="mx-auto flex flex-col md:flex-row items-center justify-between md:justify-around w-100 md:w-9/12 pt-3 md:py-0"
                variants={containerVariants}
                initial="hidden"
                animate={control}
            >
                <motion.div
                    className="w-[256px] px-3 md:px-6 border-4 aspect-square rounded-full overflow-hidden mb-12 md:mb-0"
                    variants={childrenVariants}
                    style={{
                        backgroundImage: 'url(/portrait.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderColor: colors.accent1,
                    }}
                ></motion.div>
                <motion.div
                    className="px-3 md:px-6 font-sans text-md md:text-lg max-w-prose"
                    variants={childrenVariants}
                >
                    <p>Hi there! My name is Marcus.</p>
                    <br />
                    <p>
                        I&apos;m a full-stack software developer (although I&apos;ve been doing a lot of front end
                        lately) especially interested in data visualization. I&apos;m currently working for{' '}
                        <QualtricsText className="qualtrics">
                            <a href="https://www.qualtrics.com">Qualtrics</a>
                        </QualtricsText>{' '}
                        on their data visualization team.
                    </p>
                </motion.div>
            </motion.div>
        </StyledBlurb>
    );
}
