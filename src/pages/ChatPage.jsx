import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../context/ChatContext';
import { getStreamingGeminiResponse } from '../services/gemini';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Send, Mic, Copy, Trash2, Bot, User, Volume2, Sparkles } from 'lucide-react';

const ChatPage = () => {
  const { messages, addMessage, clearChat, settings } = useChat();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input, timestamp: new Date().toISOString() };
    addMessage(userMessage);
    const sentText = input;
    setInput('');
    setIsLoading(true);
    setStreamingText('');

    try {
      await getStreamingGeminiResponse(
        settings.apiKey,
        messages,
        sentText,
        (chunk) => setStreamingText(chunk)
      );
    } catch (error) {
      addMessage({ 
        role: 'ai', 
        text: "Error: " + error.message, 
        timestamp: new Date().toISOString() 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // When streaming finishes, add the full message to context
  useEffect(() => {
    if (!isLoading && streamingText) {
      addMessage({ role: 'ai', text: streamingText, timestamp: new Date().toISOString() });
      setStreamingText('');
    }
  }, [isLoading]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = settings.language || 'en-NG';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = settings.language === 'ha-NG' ? 'ha-NG' : 'en-NG';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-[85vh] max-w-5xl mx-auto glass-card overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-md"></div>
            <Sparkles className="text-primary relative z-10" size={22} />
          </div>
          <div>
            <h2 className="font-bold flex items-center gap-2">
              ArewaMind Assistant 
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/30 text-primary border border-primary/40">v1.0</span>
            </h2>
            <p className="text-xs text-green-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" /> Online • Gemini Flash Active
            </p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
          title="Clear Chat"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-10">
            <Sparkles size={56} className="mb-4 text-primary/40 animate-pulse" />
            <p className="text-lg text-gray-300 font-medium">Sannu! I am ArewaMind AI.</p>
            <p className="text-sm text-gray-500 max-w-md mt-1">Ask me anything in English or Hausa, request code, or explore history & facts.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6 max-w-md w-full">
              {[
                "What is the history of Kano & Gombe?", 
                "Ta yaya zan fara koyon React da Python?", 
                "Explain Quantum Computing simply", 
                "Yaya yanayi yake a Abuja a yau?"
              ].map(q => (
                <button 
                  key={q} 
                  onClick={() => setInput(q)}
                  className="text-xs p-3 glass rounded-xl hover:border-primary/50 text-left transition-all hover:bg-white/10 text-gray-300"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <motion.div
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
              </div>
              <div className={`p-4 rounded-2xl group ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none shadow-[0_0_15px_rgba(112,0,255,0.3)]' 
                  : 'glass text-gray-100 rounded-tl-none border border-white/10'
              }`}>
                <div className="prose prose-invert max-w-none prose-sm">
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
                    {msg.text}
                  </ReactMarkdown>
                </div>
                <div className="flex items-center gap-2 mt-2 pt-1 border-t border-white/5 opacity-70 hover:opacity-100 transition-opacity">
                  <button onClick={() => copyToClipboard(msg.text)} className="p-1 hover:text-white transition-colors" title="Copy">
                    <Copy size={14} />
                  </button>
                  {msg.role === 'ai' && (
                    <button onClick={() => speak(msg.text)} className="p-1 hover:text-white transition-colors" title="Speak">
                      <Volume2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Peaceful Authentic Gemini Loading & Shimmer */}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="max-w-[85%] flex gap-3">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center relative">
                <motion.div 
                  animate={{ rotate: 360, scale: [1, 1.15, 1] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 rounded-full blur-md opacity-50" 
                />
                <Sparkles size={18} className="text-white relative z-10 animate-pulse" />
              </div>
              <div className="p-4 rounded-2xl text-gray-100 rounded-tl-none border border-white/10 relative overflow-hidden min-w-[70px] gemini-shimmer glass">
                {streamingText ? (
                  <div className="prose prose-invert max-w-none prose-sm relative z-10">
                    <ReactMarkdown>{streamingText + ' ✦'}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 h-6 px-1">
                    <span className="text-xs text-cyan-300 font-mono tracking-wider animate-pulse flex items-center gap-1">
                      <Sparkles size={12} className="animate-spin" /> Thinking...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/10 flex gap-2 items-center">
        <button 
          type="button"
          onClick={handleVoiceInput}
          className={`p-3 glass rounded-xl transition-colors ${isListening ? 'text-red-400 border-red-500/50 bg-red-500/10 animate-pulse' : 'text-gray-400 hover:text-primary'}`}
          title="Voice input"
        >
          <Mic size={20} />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Aika saƙo ko tambaya... (Type in English or Hausa)"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-white placeholder:text-gray-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-3 bg-primary rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(112,0,255,0.4)] transition-all"
        >
          <Send size={20} />
        </button>
      </form>
    </motion.div>
  );
};

export default ChatPage;
