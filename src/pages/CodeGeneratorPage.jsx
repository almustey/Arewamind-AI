import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useChat } from '../context/ChatContext';
import { getGeminiResponse } from '../services/gemini';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Code, Play, Copy, Check, Terminal, Cpu } from 'lucide-react';

const languages = [
  { name: 'HTML/CSS', icon: '🌐' },
  { name: 'JavaScript', icon: 'JS' },
  { name: 'React', icon: '⚛️' },
  { name: 'Python', icon: '🐍' },
  { name: 'SQL', icon: '🗄️' },
];

const CodeGeneratorPage = () => {
  const { settings } = useChat();
  const [prompt, setPrompt] = useState('');
  const [selectedLang, setSelectedLang] = useState('React');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setResult('');
    
    try {
      const fullPrompt = `Generate clean, professional, and optimized ${selectedLang} code for: ${prompt}. Include comments and a brief explanation in both English and Hausa where relevant.`;
      const response = await getGeminiResponse(settings.apiKey, [], fullPrompt);
      setResult(response);
    } catch (error) {
      setResult("Error generating code: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Code className="text-primary" size={36} /> AI Code Forge
          </h1>
          <p className="text-gray-400">Professional futuristic code generation & explanations.</p>
        </div>
        <div className="flex gap-2 p-1 glass rounded-xl border border-white/10">
          {languages.map((lang) => (
            <button
              key={lang.name}
              onClick={() => setSelectedLang(lang.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedLang === lang.name 
                  ? 'bg-primary text-white shadow-[0_0_15px_rgba(112,0,255,0.4)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[65vh]">
        {/* Input Area */}
        <div className="flex flex-col gap-4">
          <div className="flex-1 glass-card p-6 flex flex-col">
            <label className="text-sm font-bold text-primary mb-2 uppercase tracking-widest flex items-center gap-2">
              <Terminal size={14} /> Request Details
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the code you want to build (e.g., 'A modern responsive navbar with dark mode' or 'A Python script to scrape weather data')..."
              className="flex-1 bg-transparent border-none outline-none resize-none text-lg text-gray-200 placeholder:text-gray-600 focus:ring-0 min-h-[220px]"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isLoading}
            className="w-full py-4 bg-primary rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(112,0,255,0.4)] hover:shadow-[0_0_30px_rgba(112,0,255,0.6)] disabled:opacity-50 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>Forging Code <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /></>
            ) : (
              <>Forge Code <Play size={20} fill="currentColor" /></>
            )}
          </button>
        </div>

        {/* Output Area */}
        <div className="glass-card overflow-hidden flex flex-col relative min-h-[400px]">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
            <span className="text-sm font-mono text-gray-400 flex items-center gap-2">
              <Cpu size={14} /> Output Panel
            </span>
            {result && (
              <button
                onClick={copyCode}
                className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 glass rounded-lg hover:bg-primary/20 transition-all"
              >
                {copied ? <><Check size={14} className="text-green-400" /> Copied!</> : <><Copy size={14} /> Copy Code</>}
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-6 bg-[#0d1117]">
            {!result && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-gray-600 py-16">
                <Code size={48} className="mb-4 opacity-20" />
                <p>Generated code will appear here.</p>
              </div>
            )}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-16">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <p className="animate-pulse">Synthesizing {selectedLang} algorithms...</p>
              </div>
            )}
            {result && (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {result}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeGeneratorPage;
