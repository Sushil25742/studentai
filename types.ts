export enum EducationLevel {
  ELEMENTARY = 'Elementary School (K-5)',
  MIDDLE_SCHOOL = 'Middle School (6-8)',
  HIGH_SCHOOL = 'High School (9-12)',
  COLLEGE_PREP = 'College Prep',
  UNDERGRADUATE = 'Undergraduate',
  GRADUATE = 'Graduate',
  MASTERS = 'Master\'s',
  DOCTORAL = 'Doctoral',
  PROFESSIONAL = 'Professional Development',
}

export interface UserProfile {
  level: EducationLevel;
  subject: string;
}

export interface FileObject {
  id: string;
  name: string;
  type: string;
  content: string; // text content or base64 for images
  size: number;
  isSupported: boolean; // True if content can be extracted/viewed
  status: 'processing' | 'completed' | 'error';
}

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  sources?: { uri: string; title: string }[];
}

export interface AiResponse {
    text: string;
    sources: { uri: string; title: string }[];
}