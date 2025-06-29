'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { getPersonalInfo } from '@/lib/data';

export default function About() {
  const personalInfo = getPersonalInfo();
  const [showInternships, setShowInternships] = useState(false);

  const fullTimeJobs = personalInfo.experience.filter(exp => exp.type === 'full-time');
  const internships = personalInfo.experience.filter(exp => exp.type === 'internship');

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Who I am
          </h2>
          <p className="text-xl text-amber-600 font-semibold">
            Senior Software Engineer at Yubi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {personalInfo.about}
              </p>

              {/* Experience */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Experience</h3>
                
                {/* Full-time Jobs */}
                {fullTimeJobs.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-amber-500 pl-6"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {exp.position}
                      </h4>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {exp.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-amber-600 font-medium">
                        {exp.company}
                      </p>
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-amber-600 transition-colors"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Internships Section */}
                {internships.length > 0 && (
                  <div className="border-t border-gray-200 pt-6">
                    <button
                      onClick={() => setShowInternships(!showInternships)}
                      className="flex items-center gap-2 text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors mb-4"
                    >
                      {showInternships ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      Internships ({internships.length})
                    </button>
                    
                    <AnimatePresence>
                      {showInternships && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          {internships.map((exp, index) => (
                            <motion.div
                              key={exp.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="border-l-4 border-gray-300 pl-4 ml-2"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-base font-semibold text-gray-800">
                                  {exp.position}
                                </h4>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {exp.duration}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <p className="text-gray-600 font-medium text-sm">
                                  {exp.company}
                                </p>
                                {exp.link && (
                                  <a
                                    href={exp.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-amber-600 transition-colors"
                                  >
                                    <ExternalLink size={12} />
                                  </a>
                                )}
                              </div>
                              <p className="text-gray-600 text-xs leading-relaxed mb-2">
                                {exp.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {exp.technologies.map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="w-80 h-96 md:w-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/img/standing_me_ghibili.png"
                  alt="Kritagya Khandelwal standing"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">💻</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Skills & Technologies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personalInfo.skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {skill.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 