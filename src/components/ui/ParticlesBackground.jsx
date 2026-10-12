import React from 'react';

const ParticlesBackground = () => {
  return (
    <div className="particles-container">
      <div className="grid-background" />
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/20 blur-xl animate-float"
          style={{
            width: Math.random() * 300 + 50 + 'px',
            height: Math.random() * 300 + 50 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 5 + 's',
            animationDuration: Math.random() * 10 + 10 + 's',
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
