import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import WeatherPage from './pages/WeatherPage';
import NewsPage from './pages/NewsPage';
import CodeGeneratorPage from './pages/CodeGeneratorPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import Navbar from './components/layout/Navbar';
import ParticlesBackground from './components/ui/ParticlesBackground';
import Orb from './components/ui/Orb';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#030014] flex flex-col items-center justify-center relative overflow-hidden select-none">
        <Orb className="w-32 h-32 mb-8" />
        <h1 className="text-4xl md:text-5xl font-black neon-text tracking-wider">ArewaMind AI</h1>
        <p className="mt-4 text-primary font-mono text-sm tracking-widest uppercase animate-pulse">Initializing Systems...</p>
        <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-primary via-secondary to-accent animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>
    );
  }

  return (
    <ChatProvider>
      <Router>
        <div className="min-h-screen bg-[#030014] text-foreground relative overflow-hidden flex flex-col justify-between">
          <ParticlesBackground />
          <Navbar />
          
          <main className="container mx-auto px-4 pt-24 pb-12 relative z-10 flex-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/code" element={<CodeGeneratorPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </AnimatePresence>
          </main>
          
          {/* Floating AI Assistant Orb Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <Link to="/chat" title="Chat with ArewaMind AI">
              <div className="w-14 h-14 rounded-full glass flex items-center justify-center neon-border cursor-pointer hover:scale-110 transition-transform shadow-[0_0_20px_rgba(112,0,255,0.4)]">
                <Orb className="w-10 h-10" />
              </div>
            </Link>
          </div>
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;
