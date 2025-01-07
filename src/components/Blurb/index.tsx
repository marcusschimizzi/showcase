'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styled, { useTheme } from 'styled-components';

const StyledBlurb = styled.section<{ $background: string; $text: string }>`
    background-color: ${(props) => props.$background};
    color: ${(props) => props.$text};
`;

const StyledHeading = styled.h1`
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
`;

const StyledParagraph = styled.p`
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    line-height: 1.5;
    letter-spacing: 0.15px;
`;

export default function Blurb() {
    const { colors } = useTheme();
    const sectionRef = useRef<HTMLDivElement>(null);
    const control = useAnimation();
    const inView = useInView(sectionRef, { once: true, amount: 0.3 });

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
        <StyledBlurb $background={colors.background1} $text={colors.text} className="my-40" ref={sectionRef} id="about">
            <motion.div
                className="mx-4 lg:mx-auto flex flex-col lg:flex-row items-start justify-between lg:justify-around w-100 lg:w-9/12 pt-3 lg:py-0"
                variants={containerVariants}
                initial="hidden"
                animate={control}
            >
                <motion.div
                    className="w-[256px] lg:w-96 px-3 lg:px-6 border-4 aspect-square rounded-md overflow-hidden mx-auto lg:mx-0 mb-20 lg:mb-0"
                    variants={childrenVariants}
                    style={{
                        backgroundImage: 'url(/images/portrait.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderColor: colors.accent1,
                    }}
                ></motion.div>
                <motion.div
                    className="px-3 lg:px-6 font-sans text-md lg:text-lg max-w-prose mx-auto lg:mx-0"
                    variants={childrenVariants}
                >
                    <StyledHeading>Who am I?</StyledHeading>
                    <StyledParagraph>Hi there! My name is Marcus.</StyledParagraph>
                    <StyledParagraph>
                        I&apos;m currently employed as a software engineer at Qualia working to make real estate
                        transactions easier and more efficient.
                    </StyledParagraph>
                    <StyledParagraph>
                        Outside of building software, I love to spend time traveling, reading (mostly nonfiction and
                        biographies), worrying too much about my favorite sports teams, and cooking.
                    </StyledParagraph>
                </motion.div>
            </motion.div>
        </StyledBlurb>
    );
}
