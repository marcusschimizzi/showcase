'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SocialMedia from '../SocialMedia';
import styled, { useTheme } from 'styled-components';
import dynamic from 'next/dynamic';

const GradientSpan = styled.span<{ $color1: string; $color2: string; $color3: string }>`
    background-clip: text;
    background-image: ${(props) =>
        `linear-gradient(160deg, ${props.$color1} 0, ${props.$color2} 50%, ${props.$color3} 100%)`};
    display: inline-block;
    padding-bottom: 1rem;
    position: relative;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    z-index: 2;
`;

const DynamicBlobs = dynamic(() => import('../Blobs'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-black" />,
});

export default function Hero() {
    const { colors } = useTheme();

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.5,
            },
        },
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

    function convertToNumber(str: string) {
        return parseInt(str.replace(/^#/, ''), 16);
    }

    const colorsAsNumbers = [colors.main1, colors.main2, colors.main3].map((color) => convertToNumber(color));

    return (
        <section className={`min-h-screen items-stretch flex flex-col justify-between bg-[${colors.background1}]`}>
            <DynamicBlobs colors={colorsAsNumbers} background={convertToNumber(colors.background1)} />
            <div className="grow shrink-0 p-12 flex items-center">
                <div className="relative w-auto m-auto grow shrink">
                    <div className="-mx-3 -mt-3 last:-mb-3 justify-center md:flex">
                        <motion.div
                            className="block basis-0 shrink grow p-3"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h1
                                className={`text-opacity-80 text-3xl lg:text-5xl font-bold`}
                                variants={childrenVariants}
                                style={{ color: colors.text1 }}
                            >
                                Hi, I&apos;m Marcus. <br />
                                <GradientSpan $color1={colors.main1} $color2={colors.main2} $color3={colors.main3}>
                                    Software developer,
                                    <br />
                                    travel enthusiast,
                                    <br />
                                    and avid policy wonk too.
                                </GradientSpan>
                            </motion.h1>
                            <motion.div style={{ color: colors.text2 }} variants={childrenVariants}>
                                <SocialMedia align="left" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
