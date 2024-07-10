'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styled, { useTheme } from 'styled-components';

const StyledBlurb = styled.section<{ $background: string; $text: string }>`
    background-color: ${(props) => props.$background};
    color: ${(props) => props.$text};
`;

const StyledHeading = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
`;

const StyledParagraph = styled.p`
    margin-bottom: 1.5rem;
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
        <StyledBlurb $background={colors.background1} $text={colors.text} className="my-40" ref={sectionRef} id="about">
            <motion.div
                className="mx-4 lg:mx-auto flex flex-col md:flex-row items-start justify-between md:justify-around w-100 md:w-9/12 pt-3 md:py-0"
                variants={containerVariants}
                initial="hidden"
                animate={control}
            >
                <motion.div
                    className="w-[256px] lg:w-96 px-3 md:px-6 border-4 aspect-square rounded-md overflow-hidden mb-12 md:mb-0"
                    variants={childrenVariants}
                    style={{
                        backgroundImage: 'url(/images/portrait.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderColor: colors.accent1,
                    }}
                ></motion.div>
                <motion.div
                    className="px-3 md:px-6 font-sans text-md md:text-lg max-w-prose"
                    variants={childrenVariants}
                >
                    <StyledHeading>Who am I?</StyledHeading>
                    <StyledParagraph>Hi there! My name is Marcus.</StyledParagraph>
                    <StyledParagraph>
                        I&apos;m a software engineer with a passion for building clean, intuitive interfaces and
                        bringing data to life through compelling visualizations.
                    </StyledParagraph>
                    <StyledParagraph>
                        My journey in tech has been driven by a love for problem-solving and a keen eye for detail. I
                        specialize in crafting seamless user experiences using React and TypeScript (plus some Vue and
                        Svelte), always striving to write code that&apos;s not just functional, but elegant and
                        maintainable. Whether it&apos;s a complex web application or a sleek mobile interface, I thrive
                        on the challenge of creating software that&apos;s both powerful and user-friendly.
                    </StyledParagraph>
                    <StyledParagraph>
                        One area that really gets me excited is data visualization. I believe that data has stories to
                        tell, and I&apos;m passionate about finding innovative ways to uncover and share those stories.
                        From interactive charts that make complex information accessible, to performance-optimized
                        dashboards that handle large datasets with ease, I love using my skills to help people
                        understand and interact with data in meaningful ways.
                    </StyledParagraph>
                    <StyledParagraph>
                        When I&apos;m not immersed in code or exploring datasets, you can find me with my nose in a
                        book, cheering on my beloved Pittsburgh sports teams (go Steelers!), or planning my next travel
                        adventure. I believe that these diverse interests fuel my creativity and bring fresh
                        perspectives to my work.
                    </StyledParagraph>
                    <StyledParagraph>
                        I&apos;m always eager to take on new challenges and collaborate on exciting projects. If
                        you&apos;re looking for a software engineer who combines technical expertise with creativity and
                        a user-centered approach, I&apos;d love to chat about how we can work together to bring your
                        ideas to life.
                    </StyledParagraph>
                </motion.div>
            </motion.div>
        </StyledBlurb>
    );
}
