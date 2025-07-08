'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, Mail, Github, Linkedin, Instagram, Twitter, Facebook, ExternalLink } from 'lucide-react';
import { getPersonalInfo } from '@/lib/data';
import TypewriterEffect from '@/components/ui/TypewriterEffect';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

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

export default function Hero() {
  const personalInfo = getPersonalInfo();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16 overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Hi, I'm{' '}
                <span className="text-amber-600">
                  <TypewriterEffect 
                    text={personalInfo.name} 
                    speed={150} 
                    delay={1000}
                    className="text-amber-600"
                  />
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-xl sm:text-2xl lg:text-3xl text-amber-600 font-semibold mb-6">
                <TypewriterEffect 
                  text={personalInfo.title} 
                  speed={100} 
                  delay={2500}
                  className="text-amber-600"
                />
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {personalInfo.about}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {/* Resume Download Button */}
              {personalInfo.resume && (
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border-2 border-transparent hover:border-amber-500"
                >
                  <Download size={22} />
                  Download Resume
                </a>
              )}
              
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-amber-600 dark:text-amber-400 border-2 border-amber-600 dark:border-amber-400 px-8 py-4 rounded-xl hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Mail size={22} />
                Get In Touch
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center lg:justify-start gap-6 mt-8"
            >
              {personalInfo.social.map((social, index) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="sr-only">{social.platform}</span>
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-colors">
                    {getSocialIcon(social.platform)}
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-amber-200 shadow-2xl">
                <Image
                  src="/img/my_ghibily_profile.png"
                  alt="Kritagya Khandelwal"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
} 