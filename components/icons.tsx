import React from 'react';

// A generic icon wrapper
const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
);

export const BookOpenCheck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z" />
        <path d="m16 12 2 2 4-4" />
        <path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3" />
    </Icon>
);

export const BrainCircuit: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M12 5a3 3 0 1 0-5.993.157" />
        <path d="M18.63 7.143A3 3 0 1 0 12.8 5" />
        <path d="M11.66 12.5A3 3 0 1 0 7.423 9.42" />
        <path d="M17.153 15.31A3 3 0 1 0 12.5 11.66" />
        <path d="M12 18a3 3 0 1 0 5.993-.157" />
        <path d="M5.37 16.857A3 3 0 1 0 11.2 19" />
        <path d="M12.34 11.5A3 3 0 1 0 16.577 14.58" />
        <path d="M6.847 8.69A3 3 0 1 0 11.5 12.34" />
        <path d="M12 5V2" />
        <path d="M12 12h.01" />
        <path d="M12 19v3" />
        <path d="m18.63 7.143.207-.583" />
        <path d="m5.37 16.857-.207.583" />
        <path d="m17.153 15.31.583.207" />
        <path d="m6.847 8.69-.583-.207" />
    </Icon>
);

export const ChevronLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="m15 18-6-6 6-6" />
    </Icon>
);

export const ChevronRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="m9 18 6-6-6-6" />
    </Icon>
);

export const BookCopy: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M2 17h6" />
        <path d="M5 17v-5" />
        <path d="M2 12h6" />
        <path d="M10 3v4" />
        <path d="M7 3h6" />
        <path d="M10 7v4" />
        <path d="M15 7h4" />
        <path d="M15 11h4" />
        <path d="M15 15h4" />
        <path d="M10.4 2.6A2 2 0 0 1 12 2h6a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" />
    </Icon>
);

export const FileUp: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M12 12v-6" />
        <path d="m15 9-3-3-3 3" />
    </Icon>
);

export const FileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </Icon>
);

export const FileImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <circle cx="10" cy="15" r="2" />
        <path d="m20 17-5.09-5.09a2 2 0 0 0-2.82 0L8 16" />
    </Icon>
);

export const FileText: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
    </Icon>
);

export const Trash2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
    </Icon>
);

export const Bot: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
    </Icon>
);

export const User: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </Icon>
);

export const Send: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
    </Icon>
);

export const Loader: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </Icon>
);

export const Globe: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
    </Icon>
);

export const Link: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
    </Icon>
);

export const Sparkles: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9Z"/>
    </Icon>
);

export const FileCode: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="m10 13-2 2 2 2" />
        <path d="m14 13 2 2-2 2" />
    </Icon>
);

export const Presentation: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M2 3h20" />
        <path d="M4 3v18" />
        <path d="m12 12-2 3h4l-2-3z" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 21h16" />
    </Icon>
);

export const FileX: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="m14.5 12.5-5 5" />
        <path d="m9.5 12.5 5 5" />
    </Icon>
);

export const CheckCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </Icon>
);