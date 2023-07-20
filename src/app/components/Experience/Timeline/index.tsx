'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styled from 'styled-components';

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

const StyledRole = styled.div`
    color: ${({ theme }) => theme.colors.text2};
`;

const StyledRoleTitle = styled.div`
    color: ${({ theme }) => theme.colors.text1};
`;

const StyledTimeline = styled.div`
    background-color: ${({ theme }) => theme.colors.text1};
`;

const StyledImageOuterWrapper = styled.div`
    width: 65px;
    height: 65px;
`;

const StyledImageInnerWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.text1};
`;

const StyledImage = styled(Image)`
    color: transparent;
`;

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
                            <StyledImageOuterWrapper className="relative overflow-hidden rounded-md">
                                <StyledImageInnerWrapper className="w-full overflow-hidden rounded-[3px]">
                                    <StyledImage
                                        src={role.image}
                                        alt={role.institution}
                                        width={65}
                                        height={65}
                                        className="absolute h-full w-full aspect-square"
                                    />
                                </StyledImageInnerWrapper>
                            </StyledImageOuterWrapper>
                            <StyledTimeline className="mt-2 w-px grow self-center"></StyledTimeline>
                        </div>
                        <StyledRole className="flex-initial pl-4">
                            <StyledRoleTitle className="font-bold">{role.institution}</StyledRoleTitle>
                            <div className="text-sm">
                                <span>
                                    {role.role}
                                    <span className="mx-1">●</span>
                                </span>
                                {role.startDate} - {role.endDate}
                            </div>
                            <div className="pb-5 pt-3 font-serif">{role.description}</div>
                        </StyledRole>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
