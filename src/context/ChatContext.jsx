import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('arewamind_chats');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('arewamind_settings');
    const defaultSettings = {
      theme: 'dark',
      apiKey: 'AIzaSyCvPB5uvoAgNuPDj09OT1cjpKvAHglSpgQ',
      voiceEnabled: true,
      language: 'en-NG',
    };
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.apiKey) {
          parsed.apiKey = defaultSettings.apiKey;
        }
        return parsed;
      } catch (e) {
        return defaultSettings;
      }
    }
    
    return defaultSettings;
  });

  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('arewamind_searches');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('arewamind_chats', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('arewamind_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('arewamind_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addRecentSearch = (search) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== search);
      return [search, ...filtered].slice(0, 10);
    });
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      addMessage, 
      clearChat, 
      settings, 
      updateSettings,
      recentSearches,
      addRecentSearch
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
