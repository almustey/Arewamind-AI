import React from 'react';
import { motion } from 'framer-motion';

const Orb = ({ className = "w-64 h-64" }) => {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          borderRadius: ["50%", "40%", "50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-accent opacity-50 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full rounded-full border border-white/20 glass flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="w-1/2 h-1/2 rounded-full bg-white/20 blur-xl animate-pulse" />
      </motion.div>
    </div>
  );
};

export default Orb;
