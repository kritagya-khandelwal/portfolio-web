'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-amber-200/30 dark:bg-amber-400/20 rounded-full"
          initial={{
            x: Math.random() * (dimensions.width || 1000),
            y: Math.random() * (dimensions.height || 1000),
            opacity: 0,
          }}
          animate={{
            x: Math.random() * (dimensions.width || 1000),
            y: Math.random() * (dimensions.height || 1000),
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 border border-amber-200/20 dark:border-amber-400/20 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 border border-amber-200/20 dark:border-amber-400/20 rotate-45"
        animate={{
          rotate: -360,
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 border border-amber-200/20 dark:border-amber-400/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-to-r from-amber-200/10 to-orange-200/10 dark:from-amber-400/10 dark:to-orange-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-gradient-to-r from-orange-200/10 to-amber-200/10 dark:from-orange-400/10 dark:to-amber-400/10 rounded-full blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  );
} 