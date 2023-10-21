import dynamic from 'next/dynamic';
import Blurb from './components/Blurb';
import Hero from './components/Hero';
import ProgressBar from './components/ProgressBar';

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

const DynamicProjects = dynamic(() => import('./components/Projects'), { ssr: false });
const DynamicExperience = dynamic(() => import('./components/Experience'), { ssr: false });
const DynamicContact = dynamic(() => import('./components/Contact'), { ssr: false });
// const DynamicGitActivity = dynamic(() => import('./components/GitActivity'), { ssr: false });
const DynamicFooter = dynamic(() => import('./components/Footer'), { ssr: false });

export default function Home() {
    return (
        <>
            <ProgressBar />
            <Hero />
            <Blurb />
            <DynamicProjects />
            <DynamicExperience work={experience.work} education={experience.education} />
            <DynamicContact />
            {/* <DynamicGitActivity /> */}
            <DynamicFooter />
        </>
    );
}
