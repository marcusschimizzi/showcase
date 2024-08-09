'use client';

import { motion } from 'framer-motion';
import SocialMedia from '../SocialMedia';
import { useTheme } from 'styled-components';
import dynamic from 'next/dynamic';
import Epithets from '../Epithets';
import epithets from '@/data/epithets.json';
import { colors as themeColors } from '@/utils/theme';

const DynamicBlobs = dynamic(() => import('../Blobs'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-950" />,
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

    const colorsAsNumbers = [themeColors.primary[800], themeColors.secondary[800], themeColors.tertiary[800]].map(
        (color) => convertToNumber(color),
    );

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
                                className={`text-opacity-80 text-4xl lg:text-6xl font-bold`}
                                variants={childrenVariants}
                                style={{ color: colors.text1 }}
                            >
                                Hi, I&apos;m Marcus. <br />
                            </motion.h1>
                            <div>
                                <Epithets epithets={epithets} />
                            </div>
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
