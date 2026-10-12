import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Orb from '../components/ui/Orb';
import { ArrowRight, Bot, Zap, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Orb className="w-64 h-64 mx-auto mb-8" />
        <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent">
          ArewaMind AI
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12">
          The future of intelligence, built for Nigeria. Experience the most advanced AI agent with Hausa support, real-time insights, and futuristic capabilities.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/chat">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-primary rounded-full font-bold text-lg flex items-center gap-2 shadow-[0_0_20px_rgba(112,0,255,0.4)] hover:shadow-[0_0_30px_rgba(112,0,255,0.6)] transition-all"
            >
              Start Chatting <ArrowRight size={20} />
            </motion.button>
          </Link>
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 glass rounded-full font-bold text-lg border border-white/10 hover:bg-white/10 transition-all"
            >
              Explore Features
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-6xl">
        {[
          { icon: Bot, title: "Multi-Lingual AI", desc: "Native support for English and Hausa language with cultural awareness." },
          { icon: Zap, title: "Real-time Data", desc: "Live weather, news, and world clock integration for up-to-date information." },
          { icon: Shield, title: "Private & Secure", desc: "No backend required. Your chat history stays in your browser's LocalStorage." }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.2 }}
            className="glass-card p-8 text-left hover:border-primary/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
