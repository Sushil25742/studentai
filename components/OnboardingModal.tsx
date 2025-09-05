
import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { EducationLevel } from '../types';
import { EDUCATION_LEVELS } from '../constants';
import { BookOpenCheck } from './icons';

interface OnboardingModalProps {
  onComplete: (profile: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [level, setLevel] = useState<EducationLevel>(EducationLevel.HIGH_SCHOOL);
  const [subject, setSubject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject.trim()) {
      onComplete({ level, subject: subject.trim() });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 max-w-lg w-full text-white transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl mx-auto flex items-center justify-center border border-blue-400/30 mb-4">
                <BookOpenCheck className="w-8 h-8 text-blue-300" />
            </div>
          <h1 className="text-3xl font-bold">Welcome to StudyMate Pro</h1>
          <p className="text-gray-300 mt-2">Let's personalize your learning experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-300 mb-2">
              What's your current education level?
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value as EducationLevel)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            >
              {EDUCATION_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
              What subject are you focusing on?
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Physics, World History, JavaScript"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={!subject.trim()}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};
