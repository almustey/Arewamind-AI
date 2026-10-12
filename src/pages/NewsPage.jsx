import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchNews } from '../services/news';
import { Newspaper, ExternalLink, Calendar, Search, TrendingUp, Zap } from 'lucide-react';

const categories = ['Technology', 'Business', 'Science', 'Health', 'General'];

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('technology');

  const getNews = async (cat) => {
    setLoading(true);
    try {
      const data = await fetchNews(cat);
      setArticles(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews(selectedCategory);
  }, [selectedCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="max-w-7xl mx-auto space-y-12"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3 text-white">
            <Newspaper className="text-accent" size={36} /> Global Intelligence Feed
          </h1>
          <p className="text-gray-400">The latest live updates across Technology, Business, and Nigerian innovation.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat.toLowerCase())}
              className={`px-6 py-2 rounded-full text-sm font-bold border transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.toLowerCase() 
                  ? 'bg-accent/20 border-accent text-accent shadow-[0_0_15px_rgba(255,0,212,0.3)]' 
                  : 'glass border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card h-96 animate-pulse bg-white/5 border border-white/10 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card group hover:border-accent/50 transition-all flex flex-col h-full border border-white/10"
            >
              <div className="relative h-48 overflow-hidden rounded-t-2xl bg-white/5">
                <img 
                  src={article.urlToImage || 'https://images.unsplash.com/photo-1504711432869-efd597cdd0bf?auto=format&fit=crop&q=80&w=800'} 
                  alt={article.title}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1504711432869-efd597cdd0bf?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-accent border border-accent/40">
                    {article.source.name}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                   <span className="flex items-center gap-1"><Calendar size={12} /> {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Today'}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {article.description}
                </p>
                <div className="mt-auto pt-3 border-t border-white/5">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-accent hover:underline"
                  >
                    Read Full Intel <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Featured Insight */}
      <div className="glass-card p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-accent/5 via-transparent to-primary/5 border border-white/10">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
           <Zap size={300} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <TrendingUp className="text-accent" /> AI Market Analysis
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            The integration of AI in Nigeria's digital economy is projected to contribute over $10 billion to the GDP by 2030. 
            ArewaMind AI is positioned at the forefront of this revolution, providing localized intelligence solutions for the Northern region and beyond.
          </p>
          <div className="flex flex-wrap gap-8 mt-8">
             <div>
               <div className="text-3xl font-black text-white">85%</div>
               <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">Tech Adoption Rate</div>
             </div>
             <div>
               <div className="text-3xl font-black text-white">2.4M</div>
               <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">Digital Builders</div>
             </div>
             <div>
               <div className="text-3xl font-black text-white">$10B+</div>
               <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">GDP Projection</div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsPage;
