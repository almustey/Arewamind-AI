import React from 'react';
import { motion } from 'framer-motion';
import { Bot, History, Book, Cpu, Zap, Star } from 'lucide-react';

const AboutPage = () => {
  const sections = [
    {
      title: "The Mission",
      icon: Bot,
      content: "ArewaMind AI was born from the vision of bridging the digital divide in Northern Nigeria. By combining cutting-edge AI technology with cultural and linguistic relevance, we empower developers, researchers, and students across the region."
    },
    {
      title: "Knowledge Core",
      icon: Book,
      content: "Our system is optimized for Nigerian history, Islamic scholarship, world facts, and scientific principles. We provide deep insights into the legacy of the Sokoto Caliphate, the Kanem-Bornu Empire, and the modern Nigerian tech landscape."
    },
    {
      title: "Futuristic Architecture",
      icon: Cpu,
      content: "Built with a fully decentralized frontend-first approach. Your data never leaves your device. We use browser-native capabilities and secure API tunnels to provide a premium, serverless experience."
    }
  ];

  const facts = [
    "Kano is one of the oldest cities in West Africa with over 1,000 years of documented history.",
    "Gombe State is known as the jewel in the savannah and a rising tech and agricultural innovation hub.",
    "The Nok civilization in central/northern Nigeria dates back to 1000 BC with remarkable terracotta art.",
    "Hausa is one of the most widely spoken and culturally influential languages across the African continent."
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="max-w-6xl mx-auto space-y-20 pb-20"
    >
      <div className="text-center space-y-6 pt-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 relative"
        >
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse" />
          <Star size={44} className="text-primary relative z-10" />
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">Intelligent by Design</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          ArewaMind AI is more than a chatbot. It is a localized intelligence engine designed to elevate the cognitive potential of Northern Nigeria's digital generation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="glass-card p-8 md:p-10 hover:border-primary/40 transition-all group"
          >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
              <section.icon className="text-primary" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">{section.content}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
           <History size={200} />
        </div>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><Zap className="text-primary" /> Historical & Regional Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facts.map((fact, i) => (
            <div key={i} className="flex gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-primary/30 transition-all">
              <div className="text-primary font-black text-2xl font-mono">0{i+1}</div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">{fact}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 py-10 border-t border-white/5">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-1 text-white">Version 1.0 "Gombe"</h2>
          <p className="text-gray-400 font-mono text-sm">Build: 2026.05.06_by AL-musty developer</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <div className="px-4 py-1.5 glass rounded-full text-xs font-bold text-primary border border-primary/30">REACT 19</div>
          <div className="px-4 py-1.5 glass rounded-full text-xs font-bold text-secondary border border-secondary/30">VITE 8</div>
          <div className="px-4 py-1.5 glass rounded-full text-xs font-bold text-accent border border-accent/30">GEMINI FLASH</div>
          <div className="px-4 py-1.5 glass rounded-full text-xs font-bold text-emerald-400 border border-emerald-500/30">LOCALSTORAGE</div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
