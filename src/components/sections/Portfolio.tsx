'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  ExternalLink, 
  Github, 
  FileText, 
  Play, 
  Star,
  Eye
} from 'lucide-react';
import { getProjects } from '@/lib/data';

const categories = ['All', 'Featured', 'Personal', 'Academic', 'Internship'];

export default function Portfolio() {
  const projects = getProjects();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = projects.filter(project => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Featured') return project.featured;
    return project.category === selectedCategory.toLowerCase();
  });

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of projects showcasing my skills and experience
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-200 text-sm sm:text-base
                ${selectedCategory === category
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700'
                }
              `}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  scale: project.featured ? 1.05 : 1.02,
                  y: -5 
                }}
                className={`
                  relative group cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-300
                  ${project.featured 
                    ? 'ring-2 ring-amber-400 shadow-xl' 
                    : 'hover:shadow-xl'
                  }
                `}
                onClick={() => handleProjectClick(project)}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-amber-500 text-white p-2 rounded-full shadow-lg">
                    <Star size={16} fill="currentColor" />
                  </div>
                )}
                
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye size={32} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 bg-white">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className={`
                      text-xl font-bold mb-2
                      ${project.featured ? 'text-amber-800' : 'text-gray-900'}
                    `}>
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.subtitle}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`
                          text-xs px-2 py-1 rounded-full
                          ${project.featured 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-gray-100 text-gray-700'
                          }
                        `}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm"
                      >
                        <Play size={16} />
                        Demo
                      </a>
                    )}
                    {project.pdf && (
                      <a
                        href={project.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        <FileText size={16} />
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {selectedProject.title}
                    </h2>
                    {selectedProject.featured && (
                      <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                        Featured Project
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xl text-amber-600 font-medium mb-4">
                    {selectedProject.subtitle}
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <Github size={20} />
                        View Code
                      </a>
                    )}
                    {selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                      >
                        <Play size={20} />
                        Live Demo
                      </a>
                    )}
                    {selectedProject.pdf && (
                      <a
                        href={selectedProject.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <FileText size={20} />
                        View PDF
                      </a>
                    )}
                    {selectedProject.video && (
                      <a
                        href={selectedProject.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Play size={20} />
                        Watch Video
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 