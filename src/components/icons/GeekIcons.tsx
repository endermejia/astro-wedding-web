import React from 'react';

export const CatPawsSvg: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
    <g transform="translate(6, 22) rotate(-15)">
      <ellipse cx="14" cy="18" rx="7" ry="5.5" />
      <circle cx="6" cy="9" r="2.8" />
      <circle cx="11.5" cy="6.5" r="2.8" />
      <circle cx="17.5" cy="6.5" r="2.8" />
      <circle cx="22.5" cy="9.5" r="2.8" />
    </g>
    <g transform="translate(32, 6) rotate(12)">
      <ellipse cx="14" cy="18" rx="7" ry="5.5" />
      <circle cx="6" cy="9" r="2.8" />
      <circle cx="11.5" cy="6.5" r="2.8" />
      <circle cx="17.5" cy="6.5" r="2.8" />
      <circle cx="22.5" cy="9.5" r="2.8" />
    </g>
  </svg>
);

export const OneRingSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className={className} aria-hidden="true">
    <ellipse cx="32" cy="34" rx="22" ry="14" strokeWidth="3.2" />
    <ellipse cx="32" cy="32" rx="22" ry="14" strokeWidth="1.5" strokeOpacity="0.6" />
    <path d="M13 33 C19 41 45 41 51 33" strokeWidth="1.3" strokeDasharray="2 2" />
    <path d="M32 10 L33.5 14.5 L38 16 L33.5 17.5 L32 22 L30.5 17.5 L26 16 L30.5 14.5 Z" fill="currentColor" stroke="none" />
  </svg>
);

export const StrawHatSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <ellipse cx="32" cy="40" rx="27" ry="8.5" fill="currentColor" fillOpacity="0.08" />
    <path d="M16 38 C16 23 23 18 32 18 C41 18 48 23 48 38" fill="currentColor" fillOpacity="0.12" />
    <path d="M16.5 34 C24 37.5 40 37.5 47.5 34" strokeWidth="3.5" />
    <path d="M16.2 37.5 C24 41 40 41 47.8 37.5" strokeWidth="1.6" />
  </svg>
);

export const GoldenSnitchSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 80 56" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M31 28 C22 14 10 10 3 12 C8 19 15 24 28 29" fill="currentColor" fillOpacity="0.1" />
    <path d="M29 30 C19 25 10 26 6 29 C13 33 21 33 30 32" />
    <path d="M49 28 C58 14 70 10 77 12 C72 19 65 24 52 29" fill="currentColor" fillOpacity="0.1" />
    <path d="M51 30 C61 25 70 26 74 29 C67 33 59 33 50 32" />
    <circle cx="40" cy="31" r="9.5" fill="currentColor" fillOpacity="0.18" strokeWidth="2.2" />
    <path d="M32 28 C37 31 43 31 48 28" />
    <path d="M32 34 C37 31 43 31 48 34" />
  </svg>
);

export const SimpsonsDonutSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="32" cy="32" r="21" fill="currentColor" fillOpacity="0.1" />
    <circle cx="32" cy="32" r="7" fill="var(--bg-ivory)" />
    <path d="M13 28 Q16 20 23 23 Q28 16 35 20 Q43 16 48 24 Q53 30 49 37 Q44 45 37 42 Q31 48 24 43 Q16 45 14 36 Z" />
    <line x1="22" y1="19" x2="25" y2="20" strokeWidth="2.5" />
    <line x1="38" y1="18" x2="40" y2="21" strokeWidth="2.5" />
    <line x1="45" y1="30" x2="47" y2="33" strokeWidth="2.5" />
    <line x1="19" y1="35" x2="22" y2="37" strokeWidth="2.5" />
    <line x1="33" y1="43" x2="36" y2="42" strokeWidth="2.5" />
  </svg>
);

export const OliveBranchDivider: React.FC<{ className?: string; withPaw?: boolean }> = ({
  className = '',
  withPaw = false,
}) => (
  <div className={`flex items-center justify-center gap-4 py-8 select-none ${className}`} aria-hidden="true">
    <svg viewBox="0 0 180 36" className="w-28 md:w-40 h-auto text-[#555B2F]/65 leaf-breathe" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M175 18 Q95 16 12 20" strokeLinecap="round" />
      <path d="M145 17 C138 9 126 9 122 16 C128 19 138 19 145 17 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M130 18 C122 26 110 26 106 19 C112 16 122 16 130 18 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M102 17 C95 9 83 9 79 16 C85 19 95 19 102 17 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M86 19 C78 27 66 27 62 20 C68 17 78 17 86 19 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M58 18 C51 10 39 10 35 17 C41 20 51 20 58 18 Z" fill="currentColor" fillOpacity="0.18" />
      <circle cx="118" cy="13" r="2.2" fill="currentColor" />
      <circle cx="74" cy="22" r="2.2" fill="currentColor" />
    </svg>

    {withPaw ? (
      <span className="text-[#B86B4B] opacity-80">
        <CatPawsSvg className="w-6 h-6" />
      </span>
    ) : (
      <span className="w-2 h-2 rotate-45 border border-[#555B2F]/60 bg-[#C59B57]/30 shrink-0" />
    )}

    <svg viewBox="0 0 180 36" className="w-28 md:w-40 h-auto text-[#555B2F]/65 leaf-breathe -scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M175 18 Q95 16 12 20" strokeLinecap="round" />
      <path d="M145 17 C138 9 126 9 122 16 C128 19 138 19 145 17 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M130 18 C122 26 110 26 106 19 C112 16 122 16 130 18 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M102 17 C95 9 83 9 79 16 C85 19 95 19 102 17 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M86 19 C78 27 66 27 62 20 C68 17 78 17 86 19 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M58 18 C51 10 39 10 35 17 C41 20 51 20 58 18 Z" fill="currentColor" fillOpacity="0.18" />
      <circle cx="118" cy="13" r="2.2" fill="currentColor" />
      <circle cx="74" cy="22" r="2.2" fill="currentColor" />
    </svg>
  </div>
);
