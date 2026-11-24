import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Home, ChevronRight, Award, GraduationCap } from 'lucide-react';

export const HeaderBanner = ({
  badge = 'Academic Resources',
  title = 'Browse Resources',
  highlightWord = '',
  subtitle = 'Find notes, past papers and study materials for your examinations.',
  breadcrumb = []
}) => {
  // Split title if highlightWord is provided
  let titleParts = [title];
  if (highlightWord && title.includes(highlightWord)) {
    const parts = title.split(highlightWord);
    titleParts = parts;
  }

  return (
    <div className="relative w-full bg-[#0D1930] text-white overflow-hidden py-10 md:py-14 border-b border-[#1F3558]">
      {/* Background library & lighting overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D1930] via-[#0D1930]/90 to-[#14213D]/80" />

      {/* Decorative blurred lights */}
      <div className="absolute -top-12 right-1/4 w-72 h-72 bg-[#F4A62A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#1F3558]/30 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F3558]/80 border border-[#F4A62A]/30 text-xs font-semibold text-[#F4A62A] mb-3 shadow-inner">
              <BookOpen className="w-3.5 h-3.5 text-[#F4A62A]" />
              <span>{badge}</span>
            </div>

            {/* Page Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {highlightWord ? (
                <>
                  {titleParts[0]}
                  <span className="text-[#F4A62A]">{highlightWord}</span>
                  {titleParts[1] || ''}
                </>
              ) : (
                title
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              {subtitle}
            </p>

            {/* Breadcrumbs */}
            {breadcrumb.length > 0 && (
              <div className="flex items-center gap-2 mt-4 text-xs font-medium text-slate-400">
                <Link to="/" className="flex items-center gap-1 hover:text-[#F4A62A] transition-colors">
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
                {breadcrumb.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                    {item.link ? (
                      <Link to={item.link} className="hover:text-[#F4A62A] transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-[#F4A62A] font-semibold">{item.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Right Visual Academic Accent (Matching Reference: Graduation cap over books & handwritten slogan) */}
          <div className="hidden lg:flex items-center justify-end flex-shrink-0 relative">
            <div className="flex flex-col items-end pr-4">
              <div className="flex items-center gap-2 text-white font-script text-2xl tracking-wide rotate-[-3deg] text-[#F4A62A]">
                <span>Study Smart</span>
                <span className="text-white">Achieve More</span>
              </div>
              <div className="w-28 h-1 bg-[#F4A62A] rounded-full mt-1 mb-3 rotate-[-3deg] opacity-70" />
            </div>

            <div className="relative group">
              <div className="w-36 h-28 rounded-2xl bg-gradient-to-tr from-[#14213D] to-[#1F3558] border border-[#F4A62A]/30 p-2 shadow-2xl flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
                <div className="relative">
                  <GraduationCap className="w-14 h-14 text-[#F4A62A] drop-shadow-md" />
                  <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4A62A] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F4A62A]"></span>
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-200 mt-1">Verified Academic</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
