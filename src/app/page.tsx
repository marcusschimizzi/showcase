import Blurb from './components/Blurb';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProgressBar from './components/ProgressBar';
import Projects from './components/Projects';

const experience = {
    work: {
        title: 'Work Experience',
        roles: [
            {
                institution: 'Qualtrics',
                role: 'Software Development Engineer',
                startDate: 'August 2019',
                endDate: 'Now',
                description:
                    'I worked on the Data Visualization team, building out new features for the Qualtrics XM Platform. I worked full-stack with a slight emphasis on the front-end, using technologies like React, Typescript, D3, and Golang.',
                image: '/XM.png',
            },
            {
                institution: 'Ford Motor Company',
                role: 'Software Engineering Intern',
                startDate: 'May 2018',
                endDate: 'August 2018',
                description:
                    'I worked on a team building a gamified application to help call center employees train and onboard. I worked full-stack, building out the front-end and back-end of the application.',
                image: '/ford.svg',
            },
            {
                institution: 'Self Employed',
                role: 'Freelance Web Developer',
                startDate: 'May 2014',
                endDate: 'August 2019',
                description:
                    'I worked as a freelance web developer, building out websites and small applications for small businesses and individuals.',
                image: '/logo-gradient.svg',
            },
        ],
    },
    education: {
        title: 'Education',
        roles: [
            {
                institution: 'University of Notre Dame',
                role: 'BSE in Computer Science',
                startDate: 'August 2015',
                endDate: 'May 2019',
                description: 'I graduated from the University of Notre Dame with a BSE in Computer Science.',
                image: '/notredame.jpg',
            },
        ],
    },
};

export default function Home() {
    return (
        <>
            <ProgressBar />
            <Hero />
            <Blurb />
            <Projects />
            <Experience work={experience.work} education={experience.education} />
            <Contact />
            <Footer />
        </>
    );
}
