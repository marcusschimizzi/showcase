'use client';

import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
    return (
        <section className=" contact w-full bg-[#070b0d] min-h-64 text-gray-50 flex justify-center items-center py-24">
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
                    <a href="mailto:hello@schimizzi.io" className="text-[#1f5abd] hover:underline">
                        hello@schimizzi.io
                    </a>
                </h1>
            </motion.div>
        </section>
    );
}
