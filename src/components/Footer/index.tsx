'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import LinesAnimation from '../LinesAnimation';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                when: 'beforeChildren',
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <motion.footer
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50"
        >
            <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div variants={itemVariants}>
                        <a href="/">
                            <figure className="inline-block h-12 w-12 relative">
                                <Image
                                    className="block h-auto w-full"
                                    src="/images/logo-gradient.svg"
                                    alt="m logo"
                                    width={12}
                                    height={12}
                                />
                            </figure>
                        </a>
                        <h3 className="text-lg font-semibold mt-2">Marcus J. Schimizzi</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            I&apos;m a passionate software engineer specializing in web development and data
                            visualization.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            {[
                                { label: 'Projects', link: '#projects' },
                                { label: 'Experience', link: '#experience' },
                                { label: 'Skills', link: '#skills' },
                                { label: 'Resume', link: '/docs/resume.pdf' },
                            ].map((link) => (
                                <li key={link.label.toLowerCase()}>
                                    <Link
                                        href={link.link}
                                        className="text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-gray-50 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold">Connect</h3>
                        <div className="mt-2">
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="https://github.com/marcusschimizzi"
                                        className="text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-gray-50 transition-colors"
                                    >
                                        GitHub
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://linkedin.com/in/marcusschimizzi"
                                        className="text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-gray-50 transition-colors"
                                    >
                                        LinkedIn
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    variants={itemVariants}
                    className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300"
                >
                    <p>
                        Made by me with <FontAwesomeIcon className="text-[#b51442] align-middle" icon={faHeart} /> and
                        lots of <FontAwesomeIcon className="text-[saddlebrown] align-middle" icon={faCoffee} />
                    </p>
                    <p className="mt-2">&copy; {currentYear} Marcus Schimizzi. All rights reserved.</p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
