'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCoffee, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import SocialMedia from '../SocialMedia';
import LinesAnimation from '../LinesAnimation';

const StyledFooter = styled.footer`
    background-color: ${({ theme }) => theme.colors.background1};
    color: ${({ theme }) => theme.colors.text2};
`;

export default function Footer() {
    return (
        <StyledFooter className="pt-12 pw-6 pb-24 text-center relative">
            <LinesAnimation />
            <motion.div
                className="mx-auto relative w-auto"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 1, mass: 1.5, stiffness: 200 } }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <a href="/">
                    <figure className="inline-block h-12 w-12 relative">
                        <Image
                            className="block h-auto w-full"
                            src="/logo-gradient.svg"
                            alt="m logo"
                            width={12}
                            height={12}
                        />
                    </figure>
                </a>
                <div className="md:flex justify-center -mw-3 mt-2">
                    <div className="block p-3 md:w-1/3">
                        <h1 className="text-xl lg:text-3xl font-semibold">Marcus J. Schimizzi</h1>
                    </div>
                </div>
                <div className="mt-3">
                    <SocialMedia align="center" />
                </div>
                <div className="mt-3">
                    <p>
                        Made by me with <FontAwesomeIcon className="text-[#b51442] align-middle" icon={faHeart} />
                    </p>
                    <p>
                        and lots of <FontAwesomeIcon className="text-[saddlebrown] align-middle" icon={faCoffee} />
                    </p>
                    <p>
                        <span>
                            <FontAwesomeIcon icon={faCopyright} className="align-middle" />
                        </span>
                        <span> 2023</span>
                    </p>
                </div>
            </motion.div>
        </StyledFooter>
    );
}
