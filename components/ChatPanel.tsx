
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { Bot, User, Send, Loader, Globe, Link as LinkIcon, Sparkles } from './icons';

interface ChatPanelProps {
  chatHistory: ChatMessage[];
  onSendMessage: (message: string, useWebSearch: boolean) => void;
  isLoading: boolean;
}

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center border border-blue-400/30">
          <Bot className="w-6 h-6 text-blue-300" />
        </div>
      )}
      <div className={`max-w-xl p-4 rounded-3xl ${isUser ? 'bg-blue-600 rounded-br-lg' : 'bg-white/10 rounded-bl-lg'}`}>
        <p className="whitespace-pre-wrap">{message.text}</p>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-4 border-t border-white/20 pt-2">
            <h4 className="text-xs font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <LinkIcon className="w-4 h-4" /> Sources:
            </h4>
            <ul className="space-y-1">
              {message.sources.map((source, index) => (
                <li key={index}>
                  <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-300 hover:underline truncate block">
                    {source.title || source.uri}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gray-500/20 flex-shrink-0 flex items-center justify-center border border-gray-400/30">
          <User className="w-6 h-6 text-gray-300" />
        </div>
      )}
    </div>
  );
};


export const ChatPanel: React.FC<ChatPanelProps> = ({ chatHistory, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const [useWebSearch, setUseWebSearch] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);
  
  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim(), useWebSearch);
      setInput('');
    }
  };
  
  const handleQuickAction = (action: 'summarize' | 'quiz' | 'flashcards') => {
    const lastAiMessage = [...chatHistory].reverse().find(m => m.role === 'ai')?.text;
    if(!lastAiMessage) return;

    let prompt = '';
    switch(action) {
      case 'summarize':
        prompt = `Please summarize the key points from the following text in a few bullet points:\n\n"${lastAiMessage}"`;
        break;
      case 'quiz':
        prompt = `Based on the following text, create a 3-question multiple-choice quiz to test my understanding. Provide the correct answers at the end:\n\n"${lastAiMessage}"`;
        break;
      case 'flashcards':
        prompt = `Generate 3-5 flashcards from the following text. Format them as "Term: [Term]\nDefinition: [Definition]".\n\n"${lastAiMessage}"`;
        break;
    }
    onSendMessage(prompt, false);
  }

  return (
    <div className="flex flex-col h-full p-4 md:p-6">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 p-4">
        {chatHistory.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center border border-blue-400/30">
              <Loader className="w-6 h-6 text-blue-300 animate-spin" />
            </div>
            <div className="max-w-xl p-4 rounded-3xl bg-white/10 rounded-bl-lg">
              <p>Thinking...</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center space-x-2">
          <button onClick={() => handleQuickAction('summarize')} className="flex items-center gap-2 px-4 py-2 text-sm bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Sparkles className="w-4 h-4 text-yellow-300"/>Summarize</button>
          <button onClick={() => handleQuickAction('quiz')} className="flex items-center gap-2 px-4 py-2 text-sm bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Sparkles className="w-4 h-4 text-green-300"/>Create Quiz</button>
          <button onClick={() => handleQuickAction('flashcards')} className="flex items-center gap-2 px-4 py-2 text-sm bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Sparkles className="w-4 h-4 text-purple-300"/>Make Flashcards</button>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex items-center w-full max-w-4xl mx-auto shadow-lg">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent px-4 py-2 resize-none focus:outline-none h-12 max-h-48"
            rows={1}
          />
          <button
            onClick={() => setUseWebSearch(!useWebSearch)}
            className={`p-3 rounded-full transition-colors ${useWebSearch ? 'bg-blue-500 text-white' : 'bg-white/10 hover:bg-white/20'}`}
            title="Toggle Web Search"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="ml-2 p-3 rounded-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
