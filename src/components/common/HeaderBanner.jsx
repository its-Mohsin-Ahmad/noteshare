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
    <div className="relative w-full bg-[#F8F7F3]/95 text-[#14213D] overflow-hidden py-10 md:py-14 border-b border-[#E8E6DF]">
      {/* Subtle organic light wash */}
      <div className="absolute -top-12 right-1/4 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#14213D]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0D6] border border-[#F59E0B]/30 text-xs font-semibold text-[#D97706] mb-3 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{badge}</span>
            </div>

            {/* Page Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#14213D] leading-tight">
              {highlightWord ? (
                <>
                  {titleParts[0]}
                  <span className="text-[#F59E0B] relative inline-block">
                    {highlightWord}
                    <svg
                      className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#F59E0B]/40"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                    >
                      <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                    </svg>
                  </span>
                  {titleParts[1] || ''}
                </>
              ) : (
                title
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed">
              {subtitle}
            </p>

            {/* Breadcrumbs */}
            {breadcrumb.length > 0 && (
              <div className="flex items-center gap-2 mt-4 text-xs font-medium text-slate-500">
                <Link to="/" className="flex items-center gap-1 hover:text-[#14213D] transition-colors">
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
                {breadcrumb.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    {item.link ? (
                      <Link to={item.link} className="hover:text-[#14213D] transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-[#F59E0B] font-semibold">{item.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Right Visual Academic Accent */}
          <div className="hidden lg:flex items-center justify-end flex-shrink-0 relative">
            <div className="flex flex-col items-end pr-4">
              <div className="flex items-center gap-2 font-script text-2xl tracking-wide rotate-[-3deg] text-[#F59E0B]">
                <span>Study Smart</span>
                <span className="text-[#14213D]">Achieve More</span>
              </div>
              <div className="w-28 h-1 bg-[#F59E0B] rounded-full mt-1 mb-3 rotate-[-3deg] opacity-60" />
            </div>

            <div className="relative group">
              <div className="w-36 h-28 rounded-2xl bg-white border border-[#E8E6DF] p-2 shadow-lg shadow-slate-200/60 flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
                <div className="relative">
                  <GraduationCap className="w-14 h-14 text-[#F59E0B] drop-shadow-xs" />
                  <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F59E0B]"></span>
                  </span>
                </div>
                <div className="text-[11px] font-bold text-[#14213D] mt-1">Verified Academic</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
