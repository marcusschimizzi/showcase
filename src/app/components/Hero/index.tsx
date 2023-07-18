'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import './hero.css';
import SocialMedia from '../SocialMedia';
import Blobs from '../Blobs';

export default function Hero() {
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

    return (
        <section className="min-h-screen items-stretch flex flex-col justify-between bg-[#070b0d]">
            <Blobs />
            <div className="grow shrink-0 p-12 flex items-center">
                <div className="relative w-auto m-auto grow shrink">
                    <div className="-mx-3 -mt-3 last:-mb-3 justify-center md:flex">
                        <motion.div
                            className="block basis-0 shrink grow p-3"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div className="logo block relative mb-3" variants={childrenVariants}>
                                <Image
                                    className="block h-auto w-full"
                                    src="/logo-gradient.svg"
                                    alt="m logo"
                                    width={12}
                                    height={12}
                                />
                            </motion.div>
                            <motion.h1
                                className="text-white text-opacity-80 text-3xl lg:text-5xl font-bold"
                                variants={childrenVariants}
                            >
                                Hi, I&apos;m Marcus. <br />
                                <span className="gradient">
                                    Software developer,
                                    <br />
                                    travel enthusiast,
                                    <br />
                                    and avid policy wonk too.
                                </span>
                            </motion.h1>
                            <motion.div variants={childrenVariants}>
                                <SocialMedia />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
