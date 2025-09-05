
import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatPanel } from './components/ChatPanel';
import { OnboardingModal } from './components/OnboardingModal';
import type { ChatMessage, FileObject, UserProfile, AiResponse } from './types';
import { generateContentWithRAG } from './services/geminiService';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileObject[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
      setChatHistory([
        { role: 'ai', text: `Welcome back to StudyMate Pro! How can I help you with your ${JSON.parse(storedProfile).subject} studies today?`, sources: [] }
      ]);
    }
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setChatHistory([
      { role: 'ai', text: `Hello! I'm your AI StudyMate. I've tailored my responses for a ${profile.level} level in ${profile.subject}. Let's get started!`, sources: [] }
    ]);
  };

  const handleSendMessage = useCallback(async (message: string, useWebSearch: boolean) => {
    if (!userProfile) return;

    const newUserMessage: ChatMessage = { role: 'user', text: message };
    setChatHistory(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const aiResponse: AiResponse = await generateContentWithRAG({
        prompt: message,
        files: uploadedFiles,
        userProfile,
        useWebSearch
      });

      const newAiMessage: ChatMessage = {
        role: 'ai',
        text: aiResponse.text,
        sources: aiResponse.sources
      };
      setChatHistory(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error("Error generating content:", error);
      const errorMessage: ChatMessage = {
        role: 'ai',
        text: "Sorry, I encountered an error. Please check your API key and try again.",
        sources: []
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [userProfile, uploadedFiles]);


  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-gray-900 to-indigo-900/50"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      {!userProfile && <OnboardingModal onComplete={handleOnboardingComplete} />}

      <div className="relative flex h-screen w-full">
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen}
          userProfile={userProfile}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          setUserProfile={setUserProfile}
        />
        <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-80' : 'ml-0 md:ml-20'}`}>
          <ChatPanel 
            chatHistory={chatHistory} 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading} 
          />
        </main>
      </div>
    </div>
  );
}
