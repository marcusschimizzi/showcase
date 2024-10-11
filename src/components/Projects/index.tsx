'use client';

import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';
import styled from 'styled-components';
import projects from '@/data/projects.json';

const containerVariants = {
    visible: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

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

const StyledViewMore = styled.a`
    color: ${({ theme }) => theme.colors.text3};

    &:hover {
        color: ${({ theme }) => theme.colors.accent3};
    }
`;

const StyledProjects = styled.section`
    background-color: ${({ theme }) => theme.colors.background2};
    color: ${({ theme }) => theme.colors.text3};
`;

const StyledHeader = styled.h1`
    color: ${({ theme }) => theme.colors.text1};
`;

export default function Projects({}) {
    const sectionRef = useRef(null);
    const controls = useAnimation();
    const inView = useInView(sectionRef, { once: true, amount: 0.5 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <StyledProjects className="text-center py-40" ref={sectionRef} id="projects">
            <StyledHeader className="text-5xl">Some stuff I&apos;ve built</StyledHeader>
            <motion.ul
                className="pt-12 grid max-w-[26rem] sm:max-w-[52.5rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-6 lg:gap-y-8 xl:gap-x-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate={controls}
            >
                {projects
                    .filter((project) => project.featured)
                    .map((project, index) => (
                        <motion.div key={index} variants={variants}>
                            <ProjectCard
                                key={index}
                                title={project.title}
                                description={project.description}
                                thumbnail={project.thumbnail}
                                demo={project.demo}
                                link={project.link}
                            />
                        </motion.div>
                    ))}
            </motion.ul>
            <div className="pt-12 flex justify-center">
                <div className="max-w-fit">
                    <StyledViewMore href="https://github.com/marcusschimizzi" target="_blank" className="group">
                        <h2 className="text-xl md:text-3xl font-sans font-semibold">
                            View More <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </h2>
                    </StyledViewMore>
                </div>
            </div>
        </StyledProjects>
    );
}
