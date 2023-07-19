import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface ProjectCardProps {
    demo: string;
    link: string;
    thumbnail: string;
    title: string;
    description: string;
}

export default function ProjectCard({ demo, link, thumbnail, title, description }: ProjectCardProps) {
    const ref = useRef<HTMLLIElement>(null);

    useEffect(() => {
        const handleMouseEnter = async (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const videoWrapper = target.querySelector('.hovered-video') as HTMLElement;
            const hoveredVideo = target.querySelector('.hovered-video video') as HTMLVideoElement;
            videoWrapper.style.opacity = '1';
            hoveredVideo.loop = true;
            try {
                await hoveredVideo.play();
            } catch (e) {
                videoWrapper.style.opacity = '0';
            }
        };

        const element = ref.current;
        if (element) {
            element.addEventListener('mouseenter', handleMouseEnter);
        }

        return () => {
            if (element) {
                element.removeEventListener('mouseenter', handleMouseEnter);
            }
        };
    }, []);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const videoWrapper = target.querySelector('.hovered-video') as HTMLElement;
            const hoveredVideo = target.querySelector('.hovered-video video') as HTMLVideoElement;
            videoWrapper.style.opacity = '0';
            videoWrapper.style.transition = 'opacity 0.5s linear 0s';
            hoveredVideo.pause();
            hoveredVideo.currentTime = 0;
        };

        const element = ref.current;
        if (element) {
            element.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (element) {
                element.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <li
            className="group relative rounded-3xl bg-slate-50 p-6 dark:bg-slate-800/80 dark:highlight-white/5 hover:bg-slate-100 dark:hover:bg-slate-700/50"
            ref={ref}
        >
            <div className="aspect-[2688/1372] relative rounded-md transform overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.08)] bg-slate-200 dark:bg-slate-700">
                <Image
                    className="absolute inset-0 w-full h-full"
                    src={thumbnail}
                    alt={title}
                    width={2688}
                    height={1372}
                />
                <div className="hovered-video">
                    <video
                        className="absolute inset-0 w-full h-full [mask-image:radial-gradient(white,black)]"
                        preload="none"
                        playsInline={false}
                    >
                        <source src={demo} />
                    </video>
                </div>
            </div>
            <div className="flex flex-wrap flex-col items-start mt-6">
                <div className="flex flex-row">
                    <h2 className="text-sm leading-6 text-slate-900 dark:text-white font-semibold group-hover:text-sky-500 dark:group-hover:text-sky-400">
                        <a href={link}>{title} </a>
                    </h2>
                    <svg
                        className="w-6 h-6 flex-none opacity-0 group-hover:opacity-100"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M9.75 15.25L15.25 9.75M15.25 9.75H10.85M15.25 9.75V14.15"
                            stroke="#0EA5E9"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </div>
                <p className="text-[0.8125rem] leading-6 text-slate-500 dark:text-slate-400">{description}</p>
            </div>
        </li>
    );
}
