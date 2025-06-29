'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Twitter, Facebook } from 'lucide-react';
import { getPersonalInfo } from '@/lib/data';

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
};

export default function Footer() {
  const personalInfo = getPersonalInfo();

  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-2xl font-semibold hover:text-amber-400 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Mail size={24} />
              {personalInfo.email}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6 mb-8"
          >
            {personalInfo.social.map((social, index) => {
              const IconComponent = socialIcons[social.icon as keyof typeof socialIcons];
              if (!IconComponent) return null;

              return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition-colors duration-200 p-2 rounded-full hover:bg-gray-800"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={24} />
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-gray-700 pt-8"
          >
            <p className="text-gray-400">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            {/* <p className="text-gray-500 text-sm mt-2">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p> */}
          </motion.div>
        </div>
      </div>
    </footer>
  );
} 