'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft, Search, User, Briefcase, FileText } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-8xl md:text-9xl font-bold text-amber-600 dark:text-amber-400 mb-4"
          >
            404
          </motion.div>

          {/* Error Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Oops! Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8"
          >
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              <Home size={20} />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 border-2 border-amber-600 text-amber-600 px-6 py-3 rounded-lg hover:bg-amber-600 hover:text-white transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Navigation
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/#about"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors group"
              >
                <User size={24} className="text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">About</span>
              </Link>
              
              <Link
                href="/#portfolio"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors group"
              >
                <Briefcase size={24} className="text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Projects</span>
              </Link>
              
              <Link
                href="/#blogs"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors group"
              >
                <FileText size={24} className="text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Blogs</span>
              </Link>
              
              <Link
                href="/#contact"
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors group"
              >
                <Search size={24} className="text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact</span>
              </Link>
            </div>
          </motion.div>

          {/* Fun Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 text-sm text-gray-500 dark:text-gray-400"
          >
            <p>Don't worry, even the best developers make typos! 😄</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 