'use client';
import { ComponentType, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';

interface RecentProjectsProps {}

interface Language {
    name: string;
    color: string;
    percentage: number;
}

interface RecentProject {
    name: string;
    url: string;
    commits: number;
    isPrivate: boolean;
    description: string;
    languages: Language[];
}

const SectionTitle = styled.h1`
    margin-left: 0;
    margin-right: 0;
    max-width: 80rem;
    padding: 0 1rem;
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text1};

    @media (min-width: 768px) {
        margin-top: 8rem;
        font-size: 3rem;
        line-height: 1;
    }
`;

const SectionSubtitle = styled.h2`
    font-size: 0.8rem;
    line-height: 1.25rem;
    font-weight: 300;
    margin-bottom: 2rem;
    padding: 0 1rem;
    color: ${({ theme }) => theme.colors.text3};

    @media (min-width: 768px) {
        margin-bottom: 2.5rem;
    }
`;

const RecentProjectsSection = styled.section`
    margin: 0 auto;
    max-width: 80rem;
    padding: 0 1rem 4rem 1rem;
`;

const RecentProjectsGrid = styled.div`
    display: grid;
    grid-auto-columns: max-content;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const StyledProjectCard = styled.a`
    display: block;
    cursor: pointer;
    border-radius: 0.375rem;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.main3};
    padding: 1rem;
    box-shadow: ${({ theme }) => `0 0 0 1px ${theme.colors.main3}`};
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: translateY(-0.375rem);
    }
`;

const ProjectTitle = styled.h2`
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
`;

const ProjectTitleInner = styled.span`
    background-image: ${({ theme }) =>
        `linear-gradient(to right, ${theme.colors.text1} 0%, ${theme.colors.accent1} 50%, ${theme.colors.accent2} 100%)`};
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
`;

const ProjectDescription = styled.p`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const ProjectLanguages = styled.ul`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ProjectLanguage = styled.li`
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: ${({ theme }) => theme.colors.text2};
`;

const ProjectLanguageColor = styled.span<{ $color?: string }>`
    background-color: ${({ $color }) => $color || 'inherit'};
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.3rem;
`;

const RecentProjects: ComponentType<RecentProjectsProps> = () => {
    const [data, setData] = useState<RecentProject[] | null>(null);

    useEffect(() => {
        const url = '/api/recent-repositories';
        async function fetchRecentProjects() {
            try {
                const res = await fetch(url);
                const data = await res.json();
                setData(data);
            } catch (e) {
                console.error(e);
            }
        }

        if (!data) fetchRecentProjects();
    }, [data]);

    return (
        <>
            {data && data.length === 0 && (
                <>
                    <SectionTitle>What I&apos;ve been up to recently</SectionTitle>
                    <SectionSubtitle>Projects I&apos;ve worked on most over the last month</SectionSubtitle>
                    <RecentProjectsSection>
                        {data && (
                            <RecentProjectsGrid>
                                {data.map((project) => (
                                    <StyledProjectCard key={project.name} href={project.url}>
                                        <ProjectTitle>
                                            <ProjectTitleInner>{project.name}</ProjectTitleInner>
                                        </ProjectTitle>
                                        <ProjectDescription>{project.description}</ProjectDescription>
                                        <ProjectLanguages>
                                            {project.languages
                                                .sort((a, b) => b.percentage - a.percentage)
                                                .map((language) => (
                                                    <ProjectLanguage key={language.name}>
                                                        <ProjectLanguageColor $color={language.color} />
                                                        {language.name + ' ' + language.percentage.toFixed(2) + '%'}
                                                    </ProjectLanguage>
                                                ))}
                                        </ProjectLanguages>
                                    </StyledProjectCard>
                                ))}
                            </RecentProjectsGrid>
                        )}
                    </RecentProjectsSection>
                </>
            )}
        </>
    );
};

export default RecentProjects;
