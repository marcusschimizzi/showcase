import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

interface ProjectCardProps {
    demo: string;
    link: string;
    thumbnail: string;
    title: string;
    description: string;
}

const StyledProjectCard = styled.li`
    background-color: ${({ theme }) => theme.colors.background3};

    &:hover {
        background-color: ${({ theme }) => rgba(theme.colors.background3, 0.5)};
    }

    &.group {
        .hovered-video {
            opacity: 0;
            transition: opacity 0.5s linear 0s;
        }
    }
`;

const StyledCardTitle = styled.h2`
    color: ${({ theme }) => theme.colors.text1};

    &:hover {
        color: ${({ theme }) => theme.colors.main1};
    }
`;

const StyledCardDescription = styled.p`
    color: ${({ theme }) => theme.colors.text2};
`;

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
        <StyledProjectCard className="group relative rounded-3xl p-6" ref={ref}>
            <div className="aspect-[2688/1372] relative rounded-md transform overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.08)]">
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
            <div className="flex flex-wrap flex-col items-start mt-6 text-left">
                <div className="flex flex-row">
                    <StyledCardTitle className="text-sm leading-6 font-semibold">
                        <a href={link}>
                            {title}
                            <FontAwesomeIcon icon={faExternalLink} className="ml-2" />
                        </a>
                    </StyledCardTitle>
                </div>
                <StyledCardDescription className="text-[0.8125rem] leading-6">{description}</StyledCardDescription>
            </div>
        </StyledProjectCard>
    );
}
