'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Twitter, Facebook, ExternalLink } from 'lucide-react';
import { getPersonalInfo } from '@/lib/data';

// Social platform icon mapping
const getSocialIcon = (platform: string) => {
  const platformLower = platform.toLowerCase();
  
  switch (platformLower) {
    case 'github':
      return <Github size={20} />;
    case 'linkedin':
      return <Linkedin size={20} />;
    case 'instagram':
      return <Instagram size={20} />;
    case 'twitter':
      return <Twitter size={20} />;
    case 'facebook':
      return <Facebook size={20} />;
    case 'medium':
      return <ExternalLink size={20} />;
    case 'angellist':
      return <ExternalLink size={20} />;
    default:
      return <ExternalLink size={20} />;
  }
};

export default function FloatingSocialLinks() {
  const [isVisible, setIsVisible] = useState(false);
  const personalInfo = getPersonalInfo();

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const heroSection = document.getElementById('home');
        if (heroSection) {
          const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
          setIsVisible(window.scrollY > heroBottom - 100);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-8 z-40 hidden lg:block"
        >
          <div className="flex flex-col gap-4">
            {personalInfo.social.map((social, index) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="sr-only">{social.platform}</span>
                <div className="text-gray-600 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {getSocialIcon(social.platform)}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 