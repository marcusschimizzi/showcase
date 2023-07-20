'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { rgba } from 'polished';

const StyledContact = styled.section`
    background: ${({ theme }) => theme.colors.text2};
    background: ${({ theme }) =>
        `linear-gradient(${rgba(theme.colors.background1, 0.5)}, ${rgba(
            theme.colors.background1,
            0.5,
        )}), linear-gradient(96deg, ${rgba(theme.colors.background1, 1)} 0%, ${rgba(theme.colors.main1, 1)} 35%, ${rgba(
            theme.colors.main3,
            1,
        )} 100%)`};
`;

const StyledMail = styled.a`
    color: ${({ theme }) => theme.colors.main1};
    font-weight: 700;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: ${({ theme }) => theme.colors.main2};
    }
`;

export default function Contact() {
    return (
        <StyledContact className="contact w-full min-h-64 flex justify-center items-center py-24" id="contact">
            <motion.div
                className="max-w-[90%] md:max-w-prose text-2xl md:text-4xl font-extrabold text-center lg:text-justify"
                whileInView={{ opacity: 1, y: 0, transition: { duration: 1, mass: 1.5, stiffness: 200 } }}
                initial={{ opacity: 0, y: 100 }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <h1>Want to get in touch?</h1>
                <br />
                <h1>
                    Drop me a line at{' '}
                    <StyledMail href="mailto:hello@schimizzi.io" className="hover:underline">
                        hello@schimizzi.io
                    </StyledMail>
                </h1>
            </motion.div>
        </StyledContact>
    );
}
