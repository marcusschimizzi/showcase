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
    image?: string;
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

const StyledTimeline = styled(motion.div)`
    grid-column: 1 / -1;
    margin-bottom: 5rem;

    @media (min-width: 1200px) {
        grid-column: span 12;
        margin-bottom: 0px;
    }
`;

const StyledRoleTitle = styled.div`
    color: ${({ theme }) => theme.colors.text1};
`;

const StyledInstitution = styled.span`
    color: ${({ theme }) => theme.colors.background1};
    background-color: ${({ theme }) => theme.colors.text1};
`;

const StyledLineElement = styled.div`
    background: linear-gradient(
        rgba(255, 255, 255, 0.25) 0%,
        rgba(255, 255, 255, 0.25) calc(100% - 4rem),
        rgba(255, 255, 255, 0)
    );
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 2px;
`;

const StyledDecoration = styled.div`
    background-color: ${({ theme }) => theme.colors.background1};
    border-width: 2px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text1};
    border-radius: 1.5rem;
    height: 2.25rem;
    left: calc(1px - 1.125rem);
    position: absolute;
    top: 0;
    width: 2.25rem;
    z-index: 1;
`;

const StyledImage = styled(Image)`
    background-color: ${({ theme }) => theme.colors.text1};
    border-radius: 0.375rem;
    border-width: 2px;
    border-style: solid;
    z-index: 1;
    color: transparent;
    position: absolute;
    top: 0;
    left: calc(1px - 1.125rem);
    width: 2.25rem;
    height: 2.25rem;
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
        <StyledTimeline ref={sectionRef} variants={containerVariants} initial="hidden" animate={controls}>
            <div className="mb-8 font-sans text-3xl font-bold">{title}</div>
            <div className="ml-8 relative">
                {roles.map((role, index) => (
                    <motion.div key={index} variants={variants} className="pt-0 px-8 pb-16 relative">
                        {role.image ? (
                            <StyledImage src={role.image} alt={role.institution} width={24} height={24} />
                        ) : (
                            <StyledDecoration />
                        )}
                        <StyledRoleTitle className="text-xl font-medium mb-3">{role.role}</StyledRoleTitle>
                        <div className="flex flex-wrap items-baseline text-sm font-medium mb-3 opacity-50 uppercase">
                            <StyledInstitution className="mr-4 backdrop-opacity-75 py-1 px-2">
                                {role.institution}
                            </StyledInstitution>
                            {role.startDate} - {role.endDate}
                        </div>
                        <div className="pb-5 pt-3 font-serif">{role.description}</div>
                    </motion.div>
                ))}
                <StyledLineElement />
            </div>
        </StyledTimeline>
    );
}
