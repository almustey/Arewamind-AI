import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { Settings, Key, Globe, Volume2, Moon, Sun, Save, Trash2, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsPage = () => {
  const { settings, updateSettings, clearChat } = useChat();
  const [apiKey, setApiKey] = useState(settings.apiKey || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings({ apiKey: apiKey.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clearData = () => {
    if (window.confirm("Are you sure you want to delete all chat history? This cannot be undone.")) {
      clearChat();
      alert("All local chat history has been cleared.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="max-w-4xl mx-auto space-y-8 pb-20"
    >
      <div>
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Settings className="text-gray-400" size={36} /> System Calibration
        </h1>
        <p className="text-gray-400">Configure your AI Agent and storage preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* API Key Section */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Key size={20} className="text-primary" /> API Configuration
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Google Gemini API Key</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-white placeholder:text-gray-500 font-mono text-sm"
                />
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(112,0,255,0.4)] transition-all cursor-pointer"
                >
                  <Save size={18} /> {saved ? 'Saved!' : 'Save Key'}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Active default: Key pre-configured for instant operation with <code>gemini-flash-latest</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Globe size={20} className="text-secondary" /> Language & Voice
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Primary Dialect / Language</label>
                <select 
                  value={settings.language}
                  onChange={(e) => updateSettings({ language: e.target.value })}
                  className="w-full bg-[#0a081a] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-secondary text-white"
                >
                  <option value="en-NG">English (Nigeria)</option>
                  <option value="ha-NG">Hausa (Nigeria)</option>
                  <option value="ar-SA">Arabic</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-secondary/20 rounded-lg text-secondary"><Volume2 size={20} /></div>
                   <div>
                     <div className="font-bold">Voice Output</div>
                     <div className="text-xs text-gray-500">AI audio vocalization</div>
                   </div>
                </div>
                <button 
                  onClick={() => updateSettings({ voiceEnabled: !settings.voiceEnabled })}
                  className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${settings.voiceEnabled ? 'bg-secondary' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.voiceEnabled ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Moon size={20} className="text-accent" /> UI Theme
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 rounded-2xl border-2 border-accent bg-[#030014] flex flex-col items-center gap-2 shadow-[0_0_15px_rgba(255,0,212,0.3)]">
                  <Moon size={24} className="text-accent" />
                  <span className="text-sm font-bold text-white">Futuristic Dark</span>
                </button>
                <button disabled className="p-4 rounded-2xl border border-white/10 bg-white/5 opacity-50 flex flex-col items-center gap-2 cursor-not-allowed">
                  <Sun size={24} className="text-gray-400" />
                  <span className="text-sm font-bold text-gray-400">Cyber Neon (v2)</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center italic">Dark mode is optimized for high-contrast neon effects.</p>
            </div>
          </div>
        </div>

        {/* Data Management Section */}
        <div className="glass-card p-8 border-red-500/20">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-400">
            <Database size={20} /> Memory Management
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 bg-red-500/5 rounded-2xl border border-red-500/10">
            <div>
              <div className="font-bold text-red-400">Wipe Local Memory</div>
              <div className="text-sm text-gray-400">Clear chat history stored locally in browser LocalStorage.</div>
            </div>
            <button 
              onClick={clearData}
              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              <Trash2 size={18} /> Purge Memory
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
