'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Clock, Tag, Star, Search, X } from 'lucide-react';
import { getBlogs } from '@/lib/data';
import { Blog } from '@/types/portfolio';

export default function Blogs() {
  const blogs = getBlogs();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get all unique tags for filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogs.forEach(blog => blog.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [blogs]);

  const categories = ['all', 'featured', ...allTags];
  
  // Filter blogs based on search query and selected category
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      // Category filter
      const categoryMatch = selectedCategory === 'all' || 
                           (selectedCategory === 'featured' && blog.featured) ||
                           blog.tags.includes(selectedCategory);
      
      // Search filter
      const searchMatch = searchQuery === '' || 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return categoryMatch && searchMatch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery !== '';

  return (
    <section id="blogs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Writings
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sharing knowledge and insights through technical articles and tutorials
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles, tags, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                  {selectedCategory === 'featured' ? 'Featured' : selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="ml-1 hover:text-amber-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 hover:text-blue-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.slice(0, 8).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200
                  ${selectedCategory === category
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-600 border border-gray-200'
                  }
                `}
              >
                {category === 'all' ? 'All Posts' : 
                 category === 'featured' ? 'Featured' : 
                 category}
              </button>
            ))}
            {categories.length > 8 && (
              <div className="relative group">
                <button className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-600 border border-gray-200">
                  More...
                </button>
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[200px]">
                  <div className="p-2 max-h-48 overflow-y-auto">
                    {categories.slice(8).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`
                          block w-full text-left px-3 py-2 rounded text-sm hover:bg-amber-50 transition-colors
                          ${selectedCategory === category ? 'bg-amber-100 text-amber-800' : 'text-gray-700'}
                        `}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Results Count */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6"
          >
            <p className="text-gray-600">
              Found {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        )}

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`
                bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer relative
                ${blog.featured ? 'ring-2 ring-amber-200' : ''}
              `}
              onClick={() => window.open(blog.url, '_blank', 'noopener,noreferrer')}
            >
              {/* Featured Badge */}
              {blog.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star size={12} />
                    Featured
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Platform Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                    {blog.platform}
                  </span>
                  {blog.readTime && (
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Clock size={12} />
                      {blog.readTime}
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-amber-600 transition-colors">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.description}
                </p>

                {/* Date */}
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
                  <Calendar size={12} />
                  {formatDate(blog.publishedDate)}
                </div>

                {/* Tags - Show only first 2 tags to reduce clutter */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 2 && (
                    <span className="text-xs text-gray-400">
                      +{blog.tags.length - 2} more
                    </span>
                  )}
                </div>

                {/* Read More */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-amber-600 text-sm font-medium hover:text-amber-700 transition-colors">
                    Read Article
                  </span>
                  <ExternalLink size={16} className="text-gray-400" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <p className="text-gray-600 mb-2">
              {hasActiveFilters 
                ? "No articles found matching your search criteria." 
                : "No articles available at the moment."
              }
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-amber-600 hover:text-amber-700 underline"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://medium.com/@kritagya.0398"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors font-medium"
          >
            View All Articles
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
} 