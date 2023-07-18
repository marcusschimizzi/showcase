'use client';

import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';

const projects = [
    {
        title: 'Polititrack',
        description: 'Follow the 2016 presidential election.',
        thumbnail: '/polititrack.png',
        demo: '/polititrack.mov',
        link: 'https://polititrack.us',
    },
    {
        title: 'Simudraft',
        description: 'A generic mock draft simulator.',
        thumbnail: '/simudraft.png',
        demo: '/simudraft.mov',
        link: 'https://simudraft.netlify.app/',
    },
    {
        title: 'Perception Website',
        description: 'A homepage for a freelance client.',
        thumbnail: '/perception.png',
        demo: '/perception.mov',
        link: 'https://perception.net',
    },
];

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
        <section className="bg-[#151a1e] text-center py-16 sm:py-20 md:py-32" ref={sectionRef}>
            <h1 className="text-gray-50 text-5xl">Some stuff I&apos;ve built</h1>
            <motion.ul
                className="pt-12 grid max-w-[26rem] sm:max-w-[52.5rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-6 lg:gap-y-8 xl:gap-x-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate={controls}
            >
                {projects.map((project, index) => (
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
            <div className="pt-12">
                <a href="https://github.com/schimizzimj" target="_blank" className="group">
                    <h2 className="text-xl md:text-3xl text-gray-500 group-hover:text-[#8910a8] font-sans font-semibold">
                        View More <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </h2>
                </a>
            </div>
        </section>
    );
}
