'use client';
import { drag as d3Drag } from 'd3-drag';
import {
    forceCenter,
    forceCollide,
    forceManyBody,
    forceSimulation,
    forceX,
    forceY,
    Simulation,
    SimulationNodeDatum,
} from 'd3-force';
import { scaleOrdinal } from 'd3-scale';
import { schemeSet2 } from 'd3-scale-chromatic';
import { select } from 'd3-selection';
import React, { MouseEvent, useCallback, useEffect, useRef, useState, ComponentType } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import skillsData from '@/data/skills.json';
import SidePanel from './side-panel';

export interface Skill {
    name: string;
    category: string;
    proficiency: number;
    description?: string;
    projects?: Array<{ name: string; description?: string }>;
    experience?: number;
    relatedSkills?: string[];
    logo?: string;
}

export interface Category {
    name: string;
    color: string;
}

const skills: Skill[] = skillsData;

const colorScale = scaleOrdinal<string>()
    .domain(skills.map((skill) => skill.category))
    .range(schemeSet2);

interface Node extends Skill {
    radius: number;
    x: number;
    y: number;
    index: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
}

type SimulationNode = Node & SimulationNodeDatum;

interface LegendItemProps {
    category: string;
    color: string;
    isSelected: boolean;
    onClick: () => void;
}

const LegendItem: ComponentType<LegendItemProps> = ({ category, color, isSelected, onClick }) => {
    return (
        <div
            className={`flex items-center cursor-pointer p-2 ${isSelected ? 'underline' : 'no-underline'}`}
            onClick={onClick}
        >
            <div
                className="w-4 h-4 rounded-sm mr-2 transition-transform"
                style={{
                    transform: `scale(${isSelected ? 1.2 : 1})`,
                    backgroundColor: color,
                }}
            />
            <span>{category}</span>
        </div>
    );
};

interface LegendProps {
    categories: string[];
    colorScale: (category: string) => string;
    selectedCategories: Set<string>;
    onCategoryClick: (category: string) => void;
}

const Legend: ComponentType<LegendProps> = ({ categories, colorScale, selectedCategories, onCategoryClick }) => {
    return (
        <div className="bg-transparent p-4 rounded w-[99%] md:w-[90%] mx-auto transition-all">
            <div className="flex flex-col items-center justify-between mb-4">
                <div className="flex flex-wrap">
                    {categories.map((category) => (
                        <LegendItem
                            key={category}
                            category={category}
                            color={colorScale(category)}
                            isSelected={selectedCategories.has(category)}
                            onClick={() => onCategoryClick(category)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

interface BubbleProps {
    node: Node;
    simulation: Simulation<SimulationNode, undefined> | null;
    onHover: (hoverIndex: number | null) => void;
    onSkillClick: (event: MouseEvent<SVGGElement>, node: Node) => void;
    isHovered: boolean;
    isActive: boolean;
    containerSize: { width: number; height: number };
}

const Bubble = ({ node, simulation, onHover, onSkillClick, isHovered, isActive, containerSize }: BubbleProps) => {
    const nodeRef = useRef<SVGGElement | null>(null);

    const [springProps, api] = useSpring(() => ({
        scale: 1,
        opacity: isActive ? 0.9 : 0.3,
        x: node.x,
        y: node.y,
        config: { ...config.wobbly, velocity: 10 },
    }));

    useEffect(() => {
        api.start({
            scale: isHovered ? 1.2 : 1,
            opacity: isActive ? 1 : 0.3,
        });
    }, [isHovered, isActive, api]);

    useEffect(() => {
        api.start({
            x: node.x,
            y: node.y,
        });
    }, [node.x, node.y, api]);

    useEffect(() => {
        if (!simulation || !nodeRef.current) return;
        const nodeCopy = nodeRef.current;

        const drag = d3Drag<SVGGElement, unknown>()
            .subject(() => ({ x: node.x, y: node.y }))
            .on('start', (event) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                node.fx = node.x;
                node.fy = node.y;
            })
            .on('drag', (event) => {
                // Keep nodes within bounds
                const x = Math.max(node.radius + 10, Math.min(containerSize.width - node.radius, event.x));
                const y = Math.max(node.radius + 10, Math.min(containerSize.height - node.radius, event.y));
                node.fx = x;
                node.fy = y;
                api.start({ x, y });
            })
            .on('end', (event) => {
                if (!event.active) simulation.alphaTarget(0);
                node.fx = null;
                node.fy = null;
            });

        select(nodeRef.current).call(drag);

        return () => {
            select(nodeCopy).on('.drag', null);
        };
    }, [simulation, node, containerSize]);

    return (
        <animated.g
            style={{
                transform: springProps.scale.to(
                    (s) => `translate(${springProps.x.get()}px, ${springProps.y.get()}px) scale(${s})`,
                ),
                opacity: springProps.opacity,
            }}
            onMouseEnter={() => {
                onHover(node.index);
            }}
            onMouseLeave={() => {
                onHover(null);
            }}
            onClick={(event) => {
                onSkillClick(event, node);
            }}
            ref={nodeRef}
        >
            <circle r={node.radius} fill={colorScale(node.category)} className="cursor-grab" />
            {node.logo ? (
                <>
                    <image
                        href={`images/skills/${node.logo}`}
                        width={node.radius * 1.4}
                        height={node.radius * 1.4}
                        x={-node.radius * 0.7}
                        y={-node.radius * 0.7}
                        preserveAspectRatio="xMidYMid meet"
                    />
                    <title>{node.name}</title>
                </>
            ) : (
                <text textAnchor="middle" dy=".3em" fontSize={node.radius / 3} fill="white" pointerEvents="none">
                    {node.name}
                </text>
            )}
        </animated.g>
    );
};

interface AnimatedBubblesProps {
    renderOnlyInViewport?: boolean;
}

const AnimatedBubbles: ComponentType<AnimatedBubblesProps> = ({ renderOnlyInViewport = true }) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
    const [scaleFactor, setScaleFactor] = useState(1);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [isInViewport, setIsInViewport] = useState(!renderOnlyInViewport);
    const [selectedSkill, setSelectedSkill] = useState<Skill | Category | null>(null);
    const simulationRef = useRef<Simulation<Node, undefined> | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const updateSimulation = useCallback(() => {
        if (simulationRef.current && containerSize.width > 0 && containerSize.height > 0) {
            simulationRef.current
                .force('center', forceCenter(containerSize.width / 2, containerSize.height / 2))
                .force(
                    'collision',
                    forceCollide().radius((d) => (d as Node).radius + 2),
                )
                .force('x', forceX(containerSize.width / 2).strength(0.1))
                .force('y', forceY(containerSize.height / 2).strength(0.1))
                .force('bounds', forceBounds(containerSize.width, containerSize.height))
                .alpha(1)
                .restart();
        }
    }, [containerSize]);

    useEffect(() => {
        if (!containerRef.current || !renderOnlyInViewport) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInViewport(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            },
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [renderOnlyInViewport]);

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setContainerSize({ width, height });
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const forceBounds = (width: number, height: number) => {
        return () => {
            if (!simulationRef.current) return;
            for (let node of simulationRef.current!.nodes()) {
                const r = node.radius + 10;
                node.x = Math.max(r, Math.min(width - r, node.x ?? 0));
                node.y = Math.max(r, Math.min(height - r, node.y ?? 0));
            }
        };
    };

    useEffect(() => {
        if (!containerRef.current || containerSize.width === 0 || containerSize.height === 0) return;

        const simulation = forceSimulation(nodes)
            .force('charge', forceManyBody<SimulationNode>().strength(80))
            .force('center', forceCenter(containerSize.width / 2, containerSize.height / 2))
            .force(
                'collision',
                forceCollide<SimulationNode>().radius((d) => (d as Node).radius + 2),
            )
            .force('x', forceX(containerSize.width / 2).strength(0.1))
            .force('y', forceY(containerSize.height / 2).strength(0.1))
            .force('bounds', forceBounds(containerSize.width, containerSize.height))
            .on('tick', () => {
                setNodes((currentNodes) => [...currentNodes]);
            });

        const initialNodes = skills.map((skill, index) => ({
            ...skill,
            radius: skill.proficiency * 50 * scaleFactor + 20,
            index,
            // Keep random initial positions sort of around the middle
            x: Math.random() * containerSize.width * 0.5 + containerSize.width * 0.25,
            y: Math.random() * containerSize.height * 0.5 + containerSize.height * 0.25,
        }));

        setNodes(initialNodes);
        simulation.nodes(initialNodes);
        simulationRef.current = simulation;

        return () => {
            simulation.stop();
        };
    }, [containerSize]);

    useEffect(() => {
        updateSimulation();
    }, [updateSimulation, selectedCategories]);

    useEffect(() => {
        if (!simulationRef.current || !containerRef.current) return;

        const simulation = simulationRef.current;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        if (selectedCategories.size > 0) {
            const categories = Array.from(selectedCategories);
            const angleStep = (2 * Math.PI) / categories.length;

            // Group selected category nodes
            simulation.force(
                'x',
                forceX<SimulationNode>()
                    .strength(0.3)
                    .x((d: SimulationNode) => {
                        if (selectedCategories.has(d.category)) {
                            const index = categories.indexOf(d.category);
                            return width / 2 + Math.cos(index * angleStep) * 300;
                        }
                        return width / 2;
                    }),
            );
            simulation.force(
                'y',
                forceY<SimulationNode>()
                    .strength(0.3)
                    .y((d: SimulationNode) => {
                        if (selectedCategories.has(d.category)) {
                            const index = categories.indexOf(d.category);
                            return height / 2 + Math.sin(index * angleStep) * 300;
                        }
                        return height / 2;
                    }),
            );
        } else {
            simulation.force('x', null);
            simulation.force('y', null);
            simulation.force('center', forceCenter(width / 2, height / 2));
        }

        simulation.alpha(0.3).restart();
    }, [selectedCategories]);

    const handleHover = (index: number | null) => {
        setHoveredIndex(index);
    };

    const handleClick = (event: MouseEvent<SVGGElement>, node: Node) => {
        if (selectedSkill === node) {
            setSelectedSkill(null);
            return;
        }
        setSelectedSkill(node);
    };

    const handleCategoryClick = useCallback((category: string) => {
        setSelectedSkill(null);
        setSelectedCategories((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
        if (selectedCategories.size === 1) {
            setSelectedSkill({
                name: category,
                color: colorScale(category),
            });
        }
    }, []);

    const categories = Array.from(new Set(skills.map((skill) => skill.category)));

    return (
        <>
            <div
                ref={containerRef}
                className={`relative ${
                    selectedSkill ? 'w-full md:w-2/3' : 'w-full'
                } h-full bg-transparent overflow-hidden`}
            >
                {isInViewport && (
                    <>
                        <svg className="w-full h-full">
                            <>
                                <g>
                                    {nodes
                                        .sort((a, b) =>
                                            hoveredIndex === a.index ? 1 : hoveredIndex === b.index ? -1 : 0,
                                        )
                                        .map((node) => (
                                            <Bubble
                                                key={node.index}
                                                node={node}
                                                onHover={handleHover}
                                                onSkillClick={handleClick}
                                                simulation={simulationRef.current}
                                                isHovered={hoveredIndex === node.index}
                                                isActive={
                                                    (selectedCategories.size === 0 && !selectedSkill) ||
                                                    selectedCategories.has(node.category) ||
                                                    selectedSkill?.name === node.name
                                                }
                                                containerSize={containerSize}
                                            />
                                        ))}
                                </g>
                            </>
                        </svg>
                    </>
                )}
            </div>
            <SidePanel skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
            {isInViewport && (
                <Legend
                    categories={categories}
                    colorScale={colorScale}
                    selectedCategories={selectedCategories}
                    onCategoryClick={handleCategoryClick}
                />
            )}
        </>
    );
};

export default AnimatedBubbles;
