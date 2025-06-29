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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [services.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    setIsAutoPlaying(false);
  };

  const scrollServices = (direction: 'left' | 'right') => {
    const container = document.getElementById('services-container');
    if (!container) return;

    const cardWidth = 320; // w-80 = 320px
    const gap = 24; // gap-6 = 24px
    const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
    
    setScrollPosition(prev => {
      const newPosition = prev + scrollAmount;
      const maxScroll = (services.length - 1) * (cardWidth + gap);
      return Math.max(0, Math.min(newPosition, maxScroll));
    });
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What I Do
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specializing in backend development and AI, with expertise across the full stack
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="mb-16">
          <div className="relative">
            {/* Navigation Buttons - Hidden on mobile */}
            <button
              onClick={() => scrollServices('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 hidden md:block"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
            
            <button
              onClick={() => scrollServices('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 hidden md:block"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>

            {/* Services Container */}
            <div className="overflow-hidden">
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
                        ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200' 
                        : 'bg-white border border-gray-200'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`
                        p-3 rounded-lg
                        ${service.highlight 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-gray-100 text-gray-700'
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
                          ${service.highlight ? 'text-amber-800' : 'text-gray-900'}
                        `}>
                          {service.title}
                        </h3>
                        {service.highlight && (
                          <span className="text-xs font-semibold text-amber-700 bg-amber-200 px-2 py-1 rounded-full">
                            Specialized
                          </span>
                        )}
                      </div>
                    </div>
                    <p className={`
                      text-sm leading-relaxed
                      ${service.highlight ? 'text-amber-900' : 'text-gray-600'}
                    `}>
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Desktop: Horizontal scroll layout */}
              <div 
                id="services-container"
                className="hidden lg:flex gap-6 pb-4 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${scrollPosition}px)` }}
              >
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`
                      flex-shrink-0 w-80 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl
                      ${service.highlight 
                        ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200' 
                        : 'bg-white border border-gray-200'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`
                        p-3 rounded-lg
                        ${service.highlight 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-gray-100 text-gray-700'
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
                          ${service.highlight ? 'text-amber-800' : 'text-gray-900'}
                        `}>
                          {service.title}
                        </h3>
                        {service.highlight && (
                          <span className="text-xs font-semibold text-amber-700 bg-amber-200 px-2 py-1 rounded-full">
                            Specialized
                          </span>
                        )}
                      </div>
                    </div>
                    <p className={`
                      text-sm leading-relaxed
                      ${service.highlight ? 'text-amber-900' : 'text-gray-600'}
                    `}>
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Service Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Featured Service
              </h3>
              <p className="text-gray-600">
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
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {services[currentIndex].title}
              </h4>
              <p className="text-gray-700 max-w-2xl mx-auto">
                {services[currentIndex].description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 