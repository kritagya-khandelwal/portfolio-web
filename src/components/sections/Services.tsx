'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, 
  Brain, 
  Monitor, 
  Smartphone, 
  Gamepad2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getServices } from '@/lib/data';

const iconMap = {
  server: Server,
  brain: Brain,
  monitor: Monitor,
  smartphone: Smartphone,
  'gamepad-2': Gamepad2,
};

export default function Services() {
  const services = getServices();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate how many cards to show per page based on screen size
  const getCardsPerPage = () => {
    if (typeof window === 'undefined') return 3; // SSR fallback
    if (window.innerWidth >= 1280) return 3; // xl screens
    if (window.innerWidth >= 1024) return 2; // lg screens
    return 1; // md and below
  };

  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(getCardsPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(services.length / cardsPerPage));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(services.length / cardsPerPage)) % Math.ceil(services.length / cardsPerPage));
  };

  const totalPages = Math.ceil(services.length / cardsPerPage);
  const startIndex = currentIndex * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, services.length);
  const currentServices = services.slice(startIndex, endIndex);

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What I Do
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Specializing in backend development and AI, with expertise across the full stack
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="mb-16">
          {/* Mobile: Grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`
                  p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl
                  ${service.highlight 
                    ? 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-2 border-amber-200 dark:border-amber-700' 
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }
                `}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`
                    p-3 rounded-lg
                    ${service.highlight 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}>
                    {(() => {
                      const IconComponent = iconMap[service.icon as keyof typeof iconMap];
                      return IconComponent ? <IconComponent size={24} /> : null;
                    })()}
                  </div>
                  <div>
                    <h3 className={`
                      text-lg font-bold
                      ${service.highlight ? 'text-amber-800 dark:text-amber-300' : 'text-gray-900 dark:text-white'}
                    `}>
                      {service.title}
                    </h3>
                    {service.highlight && (
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-200 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                        Specialized
                      </span>
                    )}
                  </div>
                </div>
                <p className={`
                  text-sm leading-relaxed
                  ${service.highlight ? 'text-amber-900 dark:text-amber-200' : 'text-gray-600 dark:text-gray-300'}
                `}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Paginated grid layout */}
          <div className="hidden lg:block">
            {/* Services Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              <AnimatePresence mode="wait">
                {currentServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`
                      p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                      ${service.highlight 
                        ? 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-2 border-amber-200 dark:border-amber-700' 
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`
                        p-4 rounded-xl
                        ${service.highlight 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }
                      `}>
                        {(() => {
                          const IconComponent = iconMap[service.icon as keyof typeof iconMap];
                          return IconComponent ? <IconComponent size={28} /> : null;
                        })()}
                      </div>
                      <div>
                        <h3 className={`
                          text-xl font-bold mb-2
                          ${service.highlight ? 'text-amber-800 dark:text-amber-300' : 'text-gray-900 dark:text-white'}
                        `}>
                          {service.title}
                        </h3>
                        {service.highlight && (
                          <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-200 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                            Specialized
                          </span>
                        )}
                      </div>
                    </div>
                    <p className={`
                      text-base leading-relaxed
                      ${service.highlight ? 'text-amber-900 dark:text-amber-200' : 'text-gray-600 dark:text-gray-300'}
                    `}>
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className="p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {/* Page Indicators */}
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`
                        w-3 h-3 rounded-full transition-colors
                        ${currentIndex === i 
                          ? 'bg-amber-500' 
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }
                      `}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  disabled={currentIndex === totalPages - 1}
                  className="p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Featured Service Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Service
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Currently showcasing my expertise in
              </p>
            </div>
            
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-amber-500 text-white rounded-full">
                  {(() => {
                    const IconComponent = iconMap[services[currentIndex].icon as keyof typeof iconMap];
                    return IconComponent ? <IconComponent size={32} /> : null;
                  })()}
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {services[currentIndex].title}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                {services[currentIndex].description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 