import dynamic from 'next/dynamic';
import Blurb from './components/Blurb';
import Hero from './components/Hero';
import ProgressBar from './components/ProgressBar';
import workExperience from './data/work.json';
import education from './data/education.json';

const DynamicProjects = dynamic(() => import('./components/Projects'), { ssr: false });
const DynamicExperience = dynamic(() => import('./components/Experience'), { ssr: false });
// const DynamicSkills = dynamic(() => import('./components/Skills'), { ssr: false });
const DynamicContact = dynamic(() => import('./components/Contact'), { ssr: false });
// const DynamicGitActivity = dynamic(() => import('./components/GitActivity'), { ssr: false });
// const DynamicRecentProjects = dynamic(() => import('./components/RecentProjects'), { ssr: false });
const DynamicFooter = dynamic(() => import('./components/Footer'), { ssr: false });

export default function Home() {
    return (
        <>
            <ProgressBar />
            <Hero />
            <Blurb />
            <DynamicProjects />
            <DynamicExperience work={workExperience} education={education} />
            {/* <DynamicSkills /> */}
            <DynamicContact />
            {/* <DynamicGitActivity /> */}
            {/* <DynamicRecentProjects /> */}
            <DynamicFooter />
        </>
    );
}
