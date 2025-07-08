"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Award, GraduationCap, BookOpen, Code, Trophy } from "lucide-react";
import { getCertificates } from "@/lib/data";
import { Certificate } from "@/types/portfolio";

// Issuer logo mapping
const getIssuerIcon = (issuer: string) => {
  const issuerLower = issuer.toLowerCase();
  
  if (issuerLower.includes('udemy')) return <BookOpen size={20} className="text-purple-600" />;
  if (issuerLower.includes('google')) return <Code size={20} className="text-blue-600" />;
  if (issuerLower.includes('mongodb')) return <Award size={20} className="text-green-600" />;
  if (issuerLower.includes('freecodecamp')) return <GraduationCap size={20} className="text-blue-500" />;
  if (issuerLower.includes('coding ninjas') || issuerLower.includes('iiit')) return <Trophy size={20} className="text-orange-600" />;
  if (issuerLower.includes('hackerrank')) return <Code size={20} className="text-green-500" />;
  
  return <Award size={20} className="text-gray-600" />;
};

export default function Certificates() {
  const certificates: Certificate[] = getCertificates();
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certificates & Achievements
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Recognitions and milestones from my learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group relative"
              onClick={() => setSelected(cert)}
            >
              {/* Certificate Image Preview */}
              <div className="relative h-48 sm:h-56 md:h-60 overflow-hidden">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 z-10">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow hover:bg-amber-600 transition-colors"
                  >
                    <ExternalLink size={14} />
                    View
                  </a>
                </div>
              </div>
              {/* Certificate Info */}
              <div className="p-6 flex flex-col gap-2">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-shrink-0 mt-1">
                    {getIssuerIcon(cert.issuer)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium">{cert.issuer}</span>
                      <span className="mx-1">•</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for full image preview */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden relative"
                onClick={e => e.stopPropagation()}
              >
                <div className="relative w-full h-80 sm:h-[32rem] bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {selected.title}
                  </h3>
                  <div className="text-gray-500 dark:text-gray-400 mb-4">
                    {selected.issuer} • {selected.date}
                  </div>
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-500 text-white px-5 py-2 rounded-lg hover:bg-amber-600 transition-colors font-medium"
                  >
                    <ExternalLink size={16} />
                    View Certificate
                  </a>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white bg-white dark:bg-gray-800 rounded-full p-2 shadow"
                  aria-label="Close preview"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 