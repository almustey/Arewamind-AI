import { GoogleGenerativeAI } from "@google/generative-ai";

const DEFAULT_SYSTEM_PROMPT = `
You are ArewaMind AI, a futuristic and intelligent Nigerian AI Agent.
You are helpful, creative, and professional. 
You speak English and Hausa fluently.
You provide information about Nigerian history, Islamic history, world facts, technology, and science.
When asked about code, provide clean, well-formatted code blocks.
You were created to be the most advanced AI assistant in Nigeria.
Always maintain a futuristic and helpful persona.
`;

export const getGeminiResponse = async (apiKey, history, userInput) => {
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please add it in Settings.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-flash-latest",
    systemInstruction: DEFAULT_SYSTEM_PROMPT
  });

  const chat = model.startChat({
    history: history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    })),
  });

  const result = await chat.sendMessage(userInput);
  const response = await result.response;
  return response.text();
};

export const getStreamingGeminiResponse = async (apiKey, history, userInput, onChunk) => {
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please add it in Settings.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-flash-latest",
    systemInstruction: DEFAULT_SYSTEM_PROMPT
  });

  const chat = model.startChat({
    history: history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    })),
  });

  const result = await chat.sendMessageStream(userInput);
  let fullText = "";
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    fullText += chunkText;
    onChunk(fullText);
  }
  return fullText;
};
