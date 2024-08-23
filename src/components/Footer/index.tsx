'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import SocialMedia from '../SocialMedia';
import LinesAnimation from '../LinesAnimation';
import Link from 'next/link';


export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className='bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50'>
            <div className='max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <div>
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
                        <h3 className='text-lg font-semibold mt-2'>Marcus J. Schimizzi</h3>
                        <p className='text-gray-700 dark:text-gray-300'>I&apos;m a passionate software engineer specializing in web development and data visualization.</p>
                    </div>

                    <div>
                        <h3 className='text-lg font-semibold'>Quick Links</h3>
                        <ul className="space-y-2">
                            {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link href={`/${link.toLowerCase()}`} className='text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-gray-50 transition-colors'>
                                       {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className='text-lg font-semibold'>Connect</h3>
                        <div className='mt-2'>

                        <SocialMedia align='left' />
                        </div>
                    </div>
                </div>

                <div className='mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300'>
                <p>
       Made by me with <FontAwesomeIcon className="text-[#b51442] align-middle" icon={faHeart} />

{" "}and lots of <FontAwesomeIcon className="text-[saddlebrown] align-middle" icon={faCoffee} />
</p>
                            <p className='mt-2'>&copy; {currentYear} Marcus Schimizzi. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
