'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface Role {
    institution: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
    image: string;
}

export interface TimelineProps {
    title: string;
    roles: Role[];
}

const variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            mass: 1.5,
            stiffness: 200,
        },
    },
    hidden: {
        opacity: 0,
        y: 100,
    },
};

const containerVariants = {
    visible: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

export default function Timeline({ title, roles }: TimelineProps) {
    const sectionRef = useRef(null);
    const controls = useAnimation();
    const inView = useInView(sectionRef, { once: true, amount: 0.5 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            className="max-w-[80%] md:max-w-[45%]"
            ref={sectionRef}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
        >
            <div className="pb-5 font-sans text-xl font-bold">{title}</div>
            {roles.map((role, index) => (
                <motion.div key={index} variants={variants}>
                    <div className="flex min-h-[200px] font-sans pb-2">
                        <div className="flex flex-col">
                            <div
                                className="relative overflow-hidden rounded-md bg-black"
                                style={{
                                    width: '65px',
                                    height: '65px',
                                }}
                            >
                                <div className="w-full overflow-hidden rounded-[3px] bg-gray-50">
                                    <Image
                                        src={role.image}
                                        alt={role.institution}
                                        width={65}
                                        height={65}
                                        className="absolute h-full w-full aspect-square"
                                        style={{
                                            color: 'transparent',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mt-2 w-px grow self-center bg-gray-200"></div>
                        </div>
                        <div className="flex-initial pl-4">
                            <div className="font-bold text-white">{role.institution}</div>
                            <div className="text-gray-400 text-sm">
                                <span>
                                    {role.role}
                                    <span className="mx-1">●</span>
                                </span>
                                {role.startDate} - {role.endDate}
                            </div>
                            <div className="pb-5 pt-3 font-serif text-gray-100">{role.description}</div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
