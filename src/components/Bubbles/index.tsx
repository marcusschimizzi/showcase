'use client';
import { mean, rollup } from 'd3-array';
import { drag as d3Drag } from 'd3-drag';
import {
    Force,
    forceCenter,
    ForceCollide,
    forceCollide,
    ForceManyBody,
    forceManyBody,
    forceSimulation,
    forceY,
    Simulation,
    SimulationNodeDatum,
} from 'd3-force';
import { ScaleOrdinal, scaleOrdinal } from 'd3-scale';
import { schemeSet2 } from 'd3-scale-chromatic';
import { select } from 'd3-selection';
import React, { ComponentType, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSpring, animated, useTrail } from 'react-spring';

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

interface Skill {
    name: string;
    category: string;
    proficiency: number;
}

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
type ClusterForce = Force<SimulationNode, undefined> & {
    strength: (strength: number) => ClusterForce;
    selectedCategory: (category: string | null) => ClusterForce;
};

const categories = [...new Set(skills.map((skill) => skill.category))];

interface BubbleProps {
    node: Node;
    simulation: Simulation<SimulationNode, undefined>;
    onHover: (hoverIndex: number | null) => void;
    isHovered: boolean;
}

const Bubble = ({ node, simulation, onHover, isHovered }: BubbleProps) => {
    const [{ scale, opacity }, api] = useSpring(() => ({
        scale: 1,
        opacity: 0.7,
        config: { mass: 1, tension: 300, friction: 20 },
    }));

    console.info('Bubble', node);

    useEffect(() => {
        api.start({
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 1 : 0.7,
        });
    }, [isHovered]);

    const handleMouseDown = useCallback(
        (event: MouseEvent<SVGElement>) => {
            const draggedNode = simulation.find(event.clientX, event.clientY);
            if (!draggedNode) return;

            const drag = d3Drag<SVGElement, unknown>()
                .on('drag', (event) => {
                    draggedNode.fx = event.x;
                    draggedNode.fy = event.y;
                    simulation.alpha(1).restart();
                })
                .on('end', () => {
                    draggedNode.fx = null;
                    draggedNode.fy = null;
                });

            drag(select(event.currentTarget));
        },
        [simulation],
    );

    return (
        <animated.g
            transform={scale.to((s) => `translate(${node.x}, ${node.y}) scale(${s})`)}
            onMouseEnter={() => {
                onHover(node.index);
            }}
            onMouseLeave={() => {
                onHover(null);
            }}
            onMouseDown={handleMouseDown}
        >
            <animated.circle
                r={node.radius}
                fill={colorScale(node.category) as string}
                opacity={opacity as any}
                className="cursor-pointer"
            />
            <animated.text textAnchor="middle" dy=".3em" fontSize={node.radius / 3} fill="white" pointerEvents="none">
                {node.name}
            </animated.text>
        </animated.g>
    );
};

interface LegendProps {
    categories: string[];
    colorScale: ScaleOrdinal<string, string>;
    activeCategory: string | null;
    setActiveCategory: (category: string | null) => void;
}

const Legend: ComponentType<LegendProps> = ({ categories, colorScale, activeCategory, setActiveCategory }) => {
    return (
        <div className="absolute top-4 left-4 bg-gray-950 p-4 rounded shadow">
            <h3 className="font-bold mb-2">Categories</h3>
            {categories.map((category) => (
                <div
                    key={category}
                    className="flex items-center mb-1 cursor-pointer"
                    onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                >
                    <div className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: colorScale(category) }} />
                    <span className={category === activeCategory ? 'font-bold' : ''}>{category}</span>
                </div>
            ))}
        </div>
    );
};

const AnimatedBubbles = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [selectedSkill, setSelectedSkill] = useState<Node | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isIntroAnimationComplete, setIsIntroAnimationComplete] = useState(false);
    const simulationRef = useRef<Simulation<Node, undefined> | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // const handleResize = useCallback(() => {
    //     if (simulationRef.current && containerRef.current) {
    //         console.info('handleResize');
    //         const { width, height } = containerRef.current.getBoundingClientRect();
    //         simulationRef.current
    //             .force('center', forceCenter(width / 2, height / 2))
    //             .force('bounds', forceBounds(width, height))
    //             .alpha(0.9)
    //             .restart();

    //         // const minDimension = Math.min(width, height);
    //         // const scaleFactor = minDimension / 800;
    //         // console.info('scaleFactor', scaleFactor);

    //         setNodes((currentNodes) =>
    //             currentNodes.map((node, index) => ({
    //                 ...node,
    //                 index,
    //                 radius: node.proficiency * 50 * 1 + 20,
    //             })),
    //         );
    //     }
    // }, []);

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

    // const forceCluster = useCallback(() => {
    //     let strength = 0.2;
    //     let nodes: SimulationNode[] = [];
    //     let selectedCategory: string | null = null;

    //     function force(alpha: number) {
    //         if (!selectedCategory) return;

    //         const categoryNodes = nodes.filter((d) => d.category === selectedCategory);
    //         const centroid = {
    //             x: mean(categoryNodes, (d) => d.x) ?? 0,
    //             y: mean(categoryNodes, (d) => d.y) ?? 0,
    //         };

    //         const l = alpha * strength;
    //         for (const d of categoryNodes) {
    //             if (typeof d.x === 'number' && typeof d.y === 'number') {
    //                 d.vx = (d.vx ?? 0) - (d.x - centroid.x) * l;
    //                 d.vy = (d.vy ?? 0) - (d.y - centroid.y) * l;
    //             }
    //         }
    //     }

    //     force.initialize = (_nodes: SimulationNode[]) => (nodes = _nodes);

    //     (force as any).strength = (s: number) => {
    //         strength = s;
    //         return force;
    //     };

    //     (force as any).selectedCategory = (category: string | null) => {
    //         selectedCategory = category;
    //         return force;
    //     };

    //     return force as unknown as ClusterForce;
    // }, []);

    useEffect(() => {
        if (!containerRef.current) return;
        const width = containerRef.current?.clientWidth ?? 500;
        const height = containerRef.current?.clientHeight ?? 500;

        const simulation = forceSimulation(nodes)
            .force('charge', forceManyBody<SimulationNode>().strength(80))
            // .force('charge', forceY(0).strength(0.1))
            .force('center', forceCenter(width / 2, height / 2))
            // .force('cluster', forceCluster().strength(0.5))
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
            x: width * Math.random(),
            y: height * Math.random(),
        }));

        setNodes(initialNodes);
        simulation.nodes(initialNodes);
        simulationRef.current = simulation;

        // const resizeObserver = new ResizeObserver(handleResize);
        // if (containerRef.current) {
        //     resizeObserver.observe(containerRef.current);
        // }

        // handleResize();

        return () => {
            simulation.stop();
            // resizeObserver.disconnect();
        };
    }, []);

    // useEffect(() => {
    //     if (simulationRef.current && nodes.length > 0) {
    //         simulationRef.current.nodes(nodes as SimulationNode[]);
    //         const clusterForce = simulationRef.current.force('cluster') as ClusterForce | undefined;

    //         if (clusterForce) {
    //             clusterForce.selectedCategory(activeCategory);
    //             clusterForce.strength(activeCategory ? 0.1 : 0);
    //         }

    //         simulationRef.current.alpha(1).restart();
    //     }
    // }, [nodes, activeCategory]);

    // const handleClick = (node: Node) => {
    //     setSelectedSkill(node);
    // };

    const handleHover = (index: number | null) => {
        setHoveredIndex(index);
    };

    // const trail = useTrail(nodes.length, {
    //     from: { opacity: 0, radius: 0 },
    //     to: { radius: 1, opacity: 1 },
    //     config: { mass: 5, tension: 300, friction: 200 },
    //     onRest: () => {
    //         if (!isIntroAnimationComplete) {
    //             setIsIntroAnimationComplete(true);
    //             // handleResize();
    //         }
    //     },
    // });

    return (
        <div ref={containerRef} className="relative w-full h-full bg-transparent">
            <svg className="w-full h-full">
                {/* {!isIntroAnimationComplete && (
                    <g>
                        {trail.map((props, index) => (
                            <animated.g
                                className="trails"
                                key={index}
                                transform={`translate(${nodes[index].x}, ${nodes[index].y})`}
                                style={{ opacity: props.opacity }}
                            >
                                <animated.circle
                                    r={props.radius.to((r) => r * (nodes[index].proficiency * 50 + 20))}
                                    fill={colorScale(nodes[index].category)}
                                />
                                <animated.text
                                    textAnchor="middle"
                                    dy=".3em"
                                    fontSize={props.radius.to((r) => (r * (nodes[index].proficiency * 50 + 20)) / 3)}
                                    fill="white"
                                    pointerEvents="none"
                                >
                                    {nodes[index].name}
                                </animated.text>
                            </animated.g>
                        ))}
                    </g>
                )}
                {isIntroAnimationComplete && simulationRef.current && ( */}
                <>
                    <g>
                        {nodes
                            .sort((a, b) => (hoveredIndex === a.index ? 1 : hoveredIndex === b.index ? -1 : 0))
                            .map((node, index) => (
                                <Bubble
                                    key={index}
                                    node={node}
                                    // onClick={handleClick}
                                    onHover={handleHover}
                                    simulation={simulationRef.current as Simulation<SimulationNode, undefined>}
                                    isHovered={hoveredIndex === node.index}
                                />
                            ))}
                    </g>
                </>
                {/* )} */}
            </svg>
            {/* <Legend
                categories={categories}
                colorScale={colorScale}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            {selectedSkill && (
                <div className="absolute top-4 right-4 bg-gray-500 p-4 rounded shadow text-black">
                    <h3 className="text-lg font-bold">{selectedSkill.name}</h3>
                    <p>Category: {selectedSkill.category}</p>
                    <p>Proficiency: {Math.round(selectedSkill.proficiency * 100)}%</p>
                </div>
            )} */}
        </div>
    );
};

export default AnimatedBubbles;
