'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import './Blurb.css';

export default function Blurb() {
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
        <section className="bg-[#070b0d] text-gray-50 py-12" ref={sectionRef}>
            <motion.div
                className="mx-auto flex flex-col md:flex-row items-center justify-between md:justify-around w-100 md:w-9/12 pt-3 md:py-0"
                variants={containerVariants}
                initial="hidden"
                animate={control}
            >
                <motion.div
                    className="w-[256px] px-3 md:px-6 border-4 border-gray-50 aspect-square rounded-full overflow-hidden mb-12 md:mb-0"
                    variants={childrenVariants}
                    style={{
                        backgroundImage: 'url(/portrait.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
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
                        <strong className="qualtrics">
                            <a href="https://www.qualtrics.com">Qualtrics</a>
                        </strong>{' '}
                        on their data visualization team.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
