import React from 'react';

/**
 * FloatingAcademicElements
 * Subtle, low-opacity academic outlines floating slowly in the background
 * Includes: graduation cap, books, document sheets, math symbols (∑, ∫, π, √, ∞, λ)
 */
export const FloatingAcademicElements = ({ mode = 'normal' }) => {
  const isSubtle = mode === 'subtle';
  const baseOpacity = isSubtle ? 'opacity-[0.035]' : 'opacity-[0.06]';

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${baseOpacity}`}>
      {/* 1. Graduation Cap (Top Left) */}
      <div 
        className="absolute top-12 left-10 text-[#14213D] animate-float-slow hidden sm:block"
        style={{ animationDuration: '14s' }}
      >
        <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      </div>

      {/* 2. Integral Symbol ∫ (Top Center) */}
      <div 
        className="absolute top-28 left-1/3 text-[#F59E0B] font-serif text-5xl font-light animate-float-reverse hidden md:block"
        style={{ animationDuration: '18s' }}
      >
        ∫
      </div>

      {/* 3. Open Book Outline (Top Right) */}
      <div 
        className="absolute top-20 right-16 text-[#14213D] animate-float-slow hidden sm:block"
        style={{ animationDuration: '16s', animationDelay: '1s' }}
      >
        <svg width="74" height="74" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      </div>

      {/* 4. Summation Symbol ∑ (Mid Left) */}
      <div 
        className="absolute top-1/3 left-16 text-[#14213D] font-serif text-5xl font-light animate-float-reverse hidden lg:block"
        style={{ animationDuration: '20s', animationDelay: '2s' }}
      >
        ∑
      </div>

      {/* 5. PDF Document Sheet Outline (Mid Right) */}
      <div 
        className="absolute top-1/2 right-24 text-[#F59E0B] animate-float-slow hidden md:block"
        style={{ animationDuration: '15s', animationDelay: '3s' }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>

      {/* 6. Pi Symbol π (Lower Mid Left) */}
      <div 
        className="absolute top-2/3 left-1/4 text-[#14213D] font-serif text-4xl font-light animate-float-slow hidden md:block"
        style={{ animationDuration: '17s', animationDelay: '4s' }}
      >
        π
      </div>

      {/* 7. Notebook with Bookmark (Lower Center Right) */}
      <div 
        className="absolute bottom-40 right-1/3 text-[#14213D] animate-float-reverse hidden lg:block"
        style={{ animationDuration: '19s', animationDelay: '1.5s' }}
      >
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="12" y1="2" x2="12" y2="9" />
          <polyline points="10 7 12 9 14 7" />
        </svg>
      </div>

      {/* 8. Infinity Symbol ∞ (Bottom Left) */}
      <div 
        className="absolute bottom-24 left-20 text-[#F59E0B] font-serif text-5xl font-light animate-float-slow hidden sm:block"
        style={{ animationDuration: '22s', animationDelay: '2.5s' }}
      >
        ∞
      </div>

      {/* 9. Square Root √ (Bottom Right) */}
      <div 
        className="absolute bottom-16 right-16 text-[#14213D] font-serif text-4xl font-light animate-float-reverse hidden sm:block"
        style={{ animationDuration: '16s', animationDelay: '3.5s' }}
      >
        √x
      </div>
    </div>
  );
};
