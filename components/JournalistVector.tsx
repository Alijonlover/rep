import * as React from 'react';

const JournalistVector: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg 
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <defs>
            <linearGradient id="grad-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1f2937" />
                <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <linearGradient id="grad-mic" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6b7280" />
                <stop offset="100%" stopColor="#374151" />
            </linearGradient>
            <radialGradient id="grad-glow">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
            </radialGradient>
        </defs>

        {/* Background Shapes */}
        <rect width="800" height="800" fill="url(#grad-bg)" opacity="0" />
        <circle cx="400" cy="400" r="350" fill="url(#grad-glow)" opacity="0.3" />

        {/* Network Lines */}
        <path d="M100 200 Q 400 100, 700 400" stroke="#2dd4bf" strokeWidth="3" fill="none" opacity="0.5" />
        <path d="M150 600 Q 400 700, 650 200" stroke="#4f46e5" strokeWidth="3" fill="none" opacity="0.5" />
        <path d="M200 100 Q 500 500, 100 700" stroke="#a78bfa" strokeWidth="2" fill="none" opacity="0.4" />
        
        {/* Data points */}
        <circle cx="100" cy="200" r="8" fill="#2dd4bf" />
        <circle cx="700" cy="400" r="8" fill="#2dd4bf" />
        <circle cx="150" cy="600" r="8" fill="#4f46e5" />
        <circle cx="650" cy="200" r="8" fill="#4f46e5" />
        <circle cx="200" cy="100" r="6" fill="#a78bfa" />
        <circle cx="100" cy="700" r="6" fill="#a78bfa" />

        {/* Central Microphone Icon */}
        <g transform="translate(325, 275) scale(1.2)">
            {/* Mic Head */}
            <rect x="25" y="0" width="100" height="150" rx="50" fill="url(#grad-mic)" />
            <rect x="35" y="10" width="80" height="130" rx="40" fill="#1f2937" />
            {/* Mic Grill */}
            <line x1="50" y1="20" x2="100" y2="20" stroke="#6b7280" strokeWidth="5" />
            <line x1="50" y1="40" x2="100" y2="40" stroke="#6b7280" strokeWidth="5" />
            <line x1="50" y1="60" x2="100" y2="60" stroke="#6b7280" strokeWidth="5" />
            <line x1="50" y1="80" x2="100" y2="80" stroke="#6b7280" strokeWidth="5" />
            <line x1="50" y1="100" x2="100" y2="100" stroke="#6b7280" strokeWidth="5" />
            <line x1="50" y1="120" x2="100" y2="120" stroke="#6b7280" strokeWidth="5" />
            
            {/* Mic Body */}
            <rect x="50" y="150" width="50" height="80" fill="#374151" />
            <rect x="40" y="145" width="70" height="10" rx="5" fill="#4b5563" />
            
            {/* Mic Stand */}
            <path d="M 75 230 L 75 280" stroke="#6b7280" strokeWidth="10" />
        </g>

        {/* Sound/Data Waves */}
        <path d="M200 400 C 250 350, 300 350, 350 400" stroke="#2dd4bf" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M150 400 C 225 300, 325 300, 400 400" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M450 400 C 500 450, 550 450, 600 400" stroke="#2dd4bf" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M400 400 C 475 500, 575 500, 650 400" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
};

export default JournalistVector;