import { motion, AnimatePresence } from 'framer-motion';
import { Category, Skill } from '.';
import { ComponentType } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCalendar, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'styled-components';
import Image from 'next/image';

interface SidePanelProps {
    skill: Skill | Category | null;
    onClose: () => void;
    colorScale: (category: string) => string;
}

function isSkill(skill: Skill | Category): skill is Skill {
    return (skill as Skill).proficiency !== undefined;
}

const SidePanel: ComponentType<SidePanelProps> = ({ skill, onClose, colorScale }) => {
    const theme = useTheme();

    if (!skill || !isSkill(skill)) {
        return null;
    }

    return (
        <AnimatePresence>
            {skill && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute top-0 right-0 h-full w-full md:w-1/3 overflow-y-auto z-50 bg-white dark:bg-black bg-opacity-95 md:bg-opacity-30 rounded-lg shadow"
                    style={{ backgroundColor: theme.colors.background1 }}
                >
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-950 text-black dark:text-white"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>

                        <div className="flex items-center mb-6">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                {skill.logo ? (
                                    <Image
                                        src={`/images/skills/${skill.logo}`}
                                        alt={`${skill.name} logo`}
                                        className="mr-4 object-contain"
                                        width={64}
                                        height={64}
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-primary-800 rounded-full relative">
                                        <p className="text-3xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                            {skill.name.charAt(0)}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                            <div className="ml-2 text-left">
                                <h2 className="text-3xl font-bold mb-2">{skill.name}</h2>
                                <div
                                    style={{
                                        backgroundColor: skill.category ? colorScale(skill.category) : 'none',
                                    }}
                                    className="inline-block px-2 py-1 rounded-md"
                                >
                                    <p className="text-gray-950">{skill.category}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 text-left">
                            <h3 className="text-xl font-semibold mb-2">Proficiency</h3>
                            <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        color={i < skill.proficiency * 5 ? '#FFC107' : 'none'}
                                        icon={faStar}
                                    />
                                ))}
                                <span className="ml-2 text-gray-600 dark:text-gray-300">
                                    {(skill.proficiency * 100).toFixed(0)}%
                                </span>
                            </div>
                            <div className="mt-2 flex items-center">
                                <FontAwesomeIcon icon={faCalendar} className="text-gray-300 mr-2" />
                                <span>{skill.experience} years of experience</span>
                            </div>
                        </div>

                        <div className="mb-6 text-left">
                            <h3 className="text-xl font-semibold mb-2">Description</h3>
                            <p>{skill.description}</p>
                        </div>

                        {skill.projects && (
                            <div className="mb-6 text-left">
                                <h3 className="text-xl font-semibold mb-2">Projects</h3>
                                <ul className="space-y-4">
                                    {skill.projects?.map((project, i) => (
                                        <li key={i} className="bg-gray-100 dark:bg-gray-950 p-4 rounded-lg shadow-md">
                                            <h4 className="font-semibold mb-1 flex items-center">
                                                <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                                                {project.name}
                                            </h4>
                                            <p className="text-gray-950 dark:text-gray-100">{project.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {skill.relatedSkills && (
                            <div className="text-left">
                                <h3 className="text-xl font-semibold mb-2">Related Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skill.relatedSkills?.map((relatedSkill, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 dark:bg-gray-950 text-gray-950 dark:text-gray-100 px-3 py-2 rounded-full shadow-md"
                                        >
                                            {relatedSkill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SidePanel;
