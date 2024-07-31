'use client';
import { drag as d3Drag } from 'd3-drag';
import {
    Force,
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
import { useSpring, animated, config } from 'react-spring';

interface Skill {
    name: string;
    category: string;
    proficiency: number;
    description?: string;
    projects?: string[];
    experience?: string;
}

const skills: Skill[] = [
    {
        name: 'React',
        category: 'Frontend',
        proficiency: 0.9,
    },
    {
        name: 'TypeScript',
        category: 'Language',
        proficiency: 0.8,
    },
    {
        name: 'Node.js',
        category: 'Backend',
        proficiency: 0.7,
    },
    {
        name: 'D3.js',
        category: 'Data Visualization',
        proficiency: 0.6,
    },
    {
        name: 'Python',
        category: 'Language',
        proficiency: 0.5,
    },
    {
        name: 'SQL',
        category: 'Database',
        proficiency: 0.4,
    },
    {
        name: 'Docker',
        category: 'DevOps',
        proficiency: 0.5,
    },
    {
        name: 'Golang',
        category: 'Language',
        proficiency: 0.3,
    },
    {
        name: 'Jest',
        category: 'Testing',
        proficiency: 0.6,
    },
    {
        name: 'MongoDB',
        category: 'Database',
        proficiency: 0.4,
    },
    {
        name: 'Rust',
        category: 'Language',
        proficiency: 0.2,
    },
    {
        name: 'Git',
        category: 'DevOps',
        proficiency: 0.7,
    },
];

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
        <div className={`flex items-center cursor-pointer p-2 ${isSelected ? 'font-bold' : ''}`} onClick={onClick}>
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
        <div className="bg-gray-950 p-4 rounded shadow w-[99%] md:w-[90%] mx-auto">
            <div className="flex flex-col items-center justify-between mb-4">
                <h3 className="text-lg font-bold mb-2">Skill categories</h3>
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
    isHovered: boolean;
    isActive: boolean;
}

const Bubble = ({ node, simulation, onHover, isHovered, isActive }: BubbleProps) => {
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
                node.fx = event.x;
                node.fy = event.y;
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
    }, [simulation, node]);

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
            ref={nodeRef}
        >
            <circle r={node.radius} fill={colorScale(node.category)} className="cursor-grab" />
            <text textAnchor="middle" dy=".3em" fontSize={node.radius / 3} fill="white" pointerEvents="none">
                {node.name}
            </text>
        </animated.g>
    );
};

const AnimatedBubbles = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
    const simulationRef = useRef<Simulation<Node, undefined> | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

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
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth ?? 500;
        const height = containerRef.current.clientHeight ?? 500;

        const simulation = forceSimulation(nodes)
            .force('charge', forceManyBody<SimulationNode>().strength(80))
            .force('center', forceCenter(width / 2, height / 2))
            .force(
                'collide',
                forceCollide<SimulationNode>().radius((d) => (d as Node).radius + 2),
            )
            .force('bounds', forceBounds(width, height))
            .on('tick', () => {
                setNodes((currentNodes) => [...currentNodes]);
            });

        const initialNodes = skills.map((skill, index) => ({
            ...skill,
            radius: skill.proficiency * 50 + 20,
            index,
            // Keep random initial positions sort of around the middle
            x: Math.random() * width * 0.5 + width * 0.25,
            y: Math.random() * height * 0.5 + height * 0.25,
        }));

        setNodes(initialNodes);
        simulation.nodes(initialNodes);
        simulationRef.current = simulation;

        return () => {
            simulation.stop();
        };
    }, []);

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

    const handleCategoryClick = useCallback((category: string) => {
        setSelectedCategories((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    }, []);

    const categories = Array.from(new Set(skills.map((skill) => skill.category)));

    return (
        <div ref={containerRef} className="relative w-full h-full bg-transparent">
            <svg className="w-full h-full">
                <>
                    <g>
                        {nodes
                            .sort((a, b) => (hoveredIndex === a.index ? 1 : hoveredIndex === b.index ? -1 : 0))
                            .map((node) => (
                                <Bubble
                                    key={node.index}
                                    node={node}
                                    onHover={handleHover}
                                    simulation={simulationRef.current}
                                    isHovered={hoveredIndex === node.index}
                                    isActive={selectedCategories.size === 0 || selectedCategories.has(node.category)}
                                />
                            ))}
                    </g>
                </>
            </svg>
            <Legend
                categories={categories}
                colorScale={colorScale}
                selectedCategories={selectedCategories}
                onCategoryClick={handleCategoryClick}
            />
        </div>
    );
};

export default AnimatedBubbles;
