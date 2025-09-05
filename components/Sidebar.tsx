import React from 'react';
import type { FileObject, UserProfile } from '../types';
import { BookCopy, BrainCircuit, ChevronLeft, ChevronRight, FileCode, FileImage, FileText, FileUp, FileX, Presentation, Trash2, Loader, CheckCircle } from './icons';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userProfile: UserProfile | null;
  uploadedFiles: FileObject[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<FileObject[]>>;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const getFileIcon = (file: FileObject) => {
    if (!file.isSupported) return <FileX className="w-5 h-5 text-red-300" />;
    if (file.type.startsWith('image/')) return <FileImage className="w-5 h-5 text-purple-300" />;
    if (file.type.startsWith('text/')) return <FileText className="w-5 h-5 text-blue-300" />;
    if (file.type.includes('wordprocessingml')) return <FileCode className="w-5 h-5 text-sky-300" />;
    if (file.type.includes('presentationml')) return <Presentation className="w-5 h-5 text-orange-300" />;
    return <FileText className="w-5 h-5 text-gray-300" />;
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
});

const fileToText = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});


export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, userProfile, uploadedFiles, setUploadedFiles, setUserProfile }) => {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newFileObjects: FileObject[] = files.map(file => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        name: file.name,
        type: file.type,
        size: file.size,
        content: '',
        isSupported: false,
        status: 'processing',
      }));

      setUploadedFiles(prev => [...prev, ...newFileObjects]);

      newFileObjects.forEach((fileObject, index) => {
        const file = files[index];
        // Simulate processing delay
        setTimeout(async () => {
          let content = '';
          let isSupported = true;

          if (file.type.startsWith('image/')) {
              content = await fileToBase64(file);
          } else if (file.type.startsWith('text/')) {
              content = await fileToText(file);
          } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') { // DOCX
              content = `[Content from DOCX file '${file.name}' would be extracted here. The AI is aware this file has been uploaded.]`;
          } else if (file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') { // PPTX
              content = `[Content from PPTX file '${file.name}' would be extracted here. The AI is aware this file has been uploaded.]`;
          } else {
              content = `File type not supported for content extraction.`;
              isSupported = false;
          }

          setUploadedFiles(prev => prev.map(f =>
            f.id === fileObject.id
              ? { ...f, content, isSupported, status: 'completed' }
              : f
          ));
        }, 1500);
      });
    }
  };
  
  const deleteFile = (id: string) => {
    setUploadedFiles(files => files.filter(file => file.id !== id));
  };
  
  const resetProfile = () => {
    localStorage.removeItem('userProfile');
    setUserProfile(null);
    setUploadedFiles([]);
  };

  const SidebarContent = () => (
    <div className={`absolute top-0 left-0 h-full bg-black/30 backdrop-blur-2xl border-r border-white/10 transition-all duration-300 ease-in-out ${isOpen ? 'w-80' : 'w-20'} p-4 flex flex-col`}>
      <div className="flex items-center justify-between mb-8">
        {isOpen && <div className="flex items-center gap-2"><BrainCircuit className="w-8 h-8 text-blue-400" /><span className="text-xl font-bold">StudyMate</span></div>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          {isOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </button>
      </div>

      {userProfile && (
        <div className="mb-6">
          <h3 className={`text-sm text-gray-400 mb-2 ${!isOpen && 'text-center'}`}>{isOpen ? 'PROFILE' : 'PROF'}</h3>
          <div className={`p-3 rounded-2xl bg-white/5 ${!isOpen && 'flex justify-center'}`}>
            <BookCopy className={`w-6 h-6 text-green-300 ${!isOpen && 'mx-auto'}`} />
            {isOpen && <div className="ml-3">
              <p className="font-semibold truncate">{userProfile.subject}</p>
              <p className="text-sm text-gray-300">{userProfile.level}</p>
            </div>}
          </div>
           {isOpen && <button onClick={resetProfile} className="text-xs text-center w-full mt-2 text-gray-400 hover:text-red-400">Change Profile</button>}
        </div>
      )}
      
      <div className="flex-grow overflow-y-auto -mr-2 pr-2">
        <h3 className={`text-sm text-gray-400 mb-2 ${!isOpen && 'text-center'}`}>{isOpen ? 'MATERIALS' : 'FILES'}</h3>
        <label htmlFor="file-upload" className={`w-full flex items-center justify-center p-4 border-2 border-dashed border-gray-500 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-500/10 transition-all mb-4 ${!isOpen && 'h-16'}`}>
          <FileUp className="w-8 h-8 text-gray-400" />
          {isOpen && <span className="ml-3 text-sm text-gray-300">Upload Files</span>}
          <input id="file-upload" type="file" multiple onChange={handleFileChange} className="hidden" />
        </label>
        
        <ul className="space-y-2">
          {uploadedFiles.map(file => (
            <li key={file.id} className="group flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
              <div className={`flex items-center overflow-hidden ${isOpen ? '' : 'justify-center w-full'}`}>
                 {file.type.startsWith('image/') && file.isSupported ? (
                    <img 
                        src={`data:${file.type};base64,${file.content}`} 
                        alt={file.name} 
                        className="w-8 h-8 rounded-md object-cover flex-shrink-0" 
                    />
                ) : (
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        {getFileIcon(file)}
                    </div>
                )}
                {isOpen && (
                    <div className="ml-3 overflow-hidden">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <div className="flex items-center text-xs text-gray-400">
                            {file.status === 'processing' && (
                                <>
                                    <Loader className="w-3 h-3 mr-1.5 animate-spin" />
                                    <span>Processing...</span>
                                </>
                            )}
                            {file.status === 'completed' && (
                                file.isSupported ? (
                                    <>
                                        <CheckCircle className="w-3 h-3 mr-1.5 text-green-400" />
                                        <span>{(file.size / 1024).toFixed(1)} KB</span>
                                    </>
                                ) : (
                                    <>
                                        <FileX className="w-3 h-3 mr-1.5 text-red-400" />
                                        <span className="text-red-400">Unsupported</span>
                                    </>
                                )
                            )}
                        </div>
                    </div>
                )}
              </div>
              {isOpen && <button onClick={() => deleteFile(file.id)} className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-red-500/20 text-red-400 transition-opacity">
                <Trash2 className="w-4 h-4" />
              </button>}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );

  return (
    <>
        <div className="hidden md:block">
            <SidebarContent />
        </div>
        <div className="md:hidden">
            {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-30"></div>}
            <div className={`fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarContent />
            </div>
            {!isOpen && <button onClick={() => setIsOpen(true)} className="fixed top-4 left-4 z-20 p-2 bg-black/30 backdrop-blur-md rounded-full"><ChevronRight className="w-6 h-6"/></button>}
        </div>
    </>
  );
};