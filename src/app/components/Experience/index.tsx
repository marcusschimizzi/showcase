import Timeline, { TimelineProps } from './Timeline';

interface ExperienceProps {
    work: TimelineProps;
    education: TimelineProps;
}

export default function Experience({ work, education }: ExperienceProps) {
    return (
        <div className="flex flex-col gap-4 py-16 text-white md:flex-row justify-center items-center md:items-start">
            <Timeline title={work.title} roles={work.roles} />
            <Timeline title={education.title} roles={education.roles} />
        </div>
    );
}
