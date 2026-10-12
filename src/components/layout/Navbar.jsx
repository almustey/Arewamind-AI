import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Cloud, Newspaper, Code, Settings, Home, Info } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/chat', icon: MessageSquare, label: 'Chat' },
  { path: '/code', icon: Code, label: 'Code' },
  { path: '/weather', icon: Cloud, label: 'Weather' },
  { path: '/news', icon: Newspaper, label: 'News' },
  { path: '/settings', icon: Settings, label: 'Settings' },
  { path: '/about', icon: Info, label: 'About' },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 md:px-6 py-3 glass rounded-full flex items-center gap-1 md:gap-4 border border-white/10 shadow-2xl backdrop-blur-xl">
      <Link to="/" className="flex items-center gap-2 mr-2 md:mr-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary animate-pulse" />
        <span className="font-bold text-lg hidden md:block neon-text">ArewaMind</span>
      </Link>
      
      <div className="flex items-center gap-1 md:gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                  isActive 
                    ? 'bg-primary/20 text-primary border border-primary/40 shadow-[0_0_12px_rgba(112,0,255,0.4)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                <span className="text-xs md:text-sm font-medium hidden lg:block">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
