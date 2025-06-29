'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, Download, Mail, Github, Linkedin, Instagram, Twitter, Facebook, ExternalLink } from 'lucide-react';
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

export default function Hero() {
  const personalInfo = getPersonalInfo();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Hi, I'm{' '}
                <span className="text-amber-600">{personalInfo.name}</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-xl sm:text-2xl lg:text-3xl text-amber-600 font-semibold mb-6">
                {personalInfo.title}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {personalInfo.about}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium text-lg"
              >
                <Mail size={20} />
                Get In Touch
              </a>
              <button
                onClick={scrollToAbout}
                className="inline-flex items-center justify-center gap-2 border-2 border-amber-600 text-amber-600 px-6 py-3 rounded-lg hover:bg-amber-600 hover:text-white transition-colors font-medium text-lg"
              >
                <ArrowDown size={20} />
                Learn More
              </button>
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
                  className="text-gray-600 hover:text-amber-600 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="sr-only">{social.platform}</span>
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors">
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

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
        >
          <button
            onClick={scrollToAbout}
            className="text-gray-400 hover:text-amber-600 transition-colors animate-bounce"
          >
            <ArrowDown size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  );
} 