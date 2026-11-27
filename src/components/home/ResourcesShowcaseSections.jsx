import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileText,
  Download,
  Eye,
  Calendar,
  HardDrive,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BookOpen,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

gsap.registerPlugin(ScrollTrigger);

const getFormatStyle = (fileType = 'PDF') => {
  const fmt = (fileType || 'PDF').toUpperCase();
  if (fmt.includes('DOC')) {
    return { label: 'DOCX', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', fold: 'bg-blue-200' };
  }
  if (fmt.includes('PPT')) {
    return { label: 'PPTX', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', fold: 'bg-orange-200' };
  }
  return { label: 'PDF', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', fold: 'bg-rose-200' };
};

export const RecentResourcesSection = () => {
  const { resources, recordDownload, setPreviewResource, recordView } = useApp();
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef(null);

  const filterTabs = ['All', 'Notes', 'Past Papers', 'Assignments', 'Lecture Slides'];

  const publishedResources = resources
    .filter((r) => r.isPublished)
    .filter((r) => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Past Papers') {
        return r.category === 'Past Papers' || r.examType === 'Final Term' || r.examType === 'Midterm';
      }
      if (activeFilter === 'Lecture Slides') {
        return r.category === 'Lecture Slides' || r.category === 'Slides';
      }
      return r.category === activeFilter;
    })
    .slice(0, 6);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.recent-resource-card', {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePreview = (res) => {
    recordView(res.id);
    setPreviewResource(res);
  };

  return (
    <section ref={sectionRef} className="relative bg-[#F2F1EC]/65 py-16 sm:py-20 border-b border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              Live Repository Feed
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D]">
              Recently Added <span className="text-[#F59E0B]">Resources</span>
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Explore the latest academic materials shared on NoteShare.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === tab
                    ? 'bg-[#14213D] text-white shadow-sm'
                    : 'bg-white text-[#14213D]/75 border border-[#E8E6DF] hover:border-[#F59E0B]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Grid */}
        {publishedResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {publishedResources.map((res, index) => {
              const fmt = getFormatStyle(res.fileType);
              return (
                <div
                  key={res.id}
                  onClick={() => handlePreview(res)}
                  className="recent-resource-card group bg-white rounded-2xl p-5 border border-[#E8E6DF] hover:border-[#F59E0B]/70 shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Top Row: Document Preview Thumbnail + Badges */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className={`relative w-12 h-14 rounded-xl ${fmt.bg} ${fmt.border} border flex flex-col items-center justify-center shrink-0 overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-3 h-3 ${fmt.fold}`} style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
                        <FileText className={`w-4 h-4 ${fmt.text} mb-0.5`} />
                        <span className={`text-[9px] font-black tracking-wider ${fmt.text}`}>{fmt.label}</span>
                      </div>

                      <div className="flex flex-wrap items-center justify-end gap-1.5">
                        {index < 3 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FFF0D6] text-[#D97706] border border-[#F59E0B]/30">
                            New
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F8F7F3] text-[#14213D] border border-[#E8E6DF]">
                          {res.category}
                        </span>
                      </div>
                    </div>

                    {/* Title & Tags */}
                    <h3 className="text-base font-extrabold text-[#14213D] group-hover:text-[#D97706] transition-colors line-clamp-2 leading-snug">
                      {res.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-[11px] font-semibold text-[#64748B]">
                      <span className="text-[#14213D]">{res.subject}</span>
                      <span>•</span>
                      <span>{res.semester}</span>
                      {res.department && (
                        <>
                          <span>•</span>
                          <span>{res.department}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Footer Metadata & Actions */}
                  <div className="mt-5 pt-4 border-t border-[#E8E6DF] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 text-[11px] text-[#64748B]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#F59E0B]" />
                        {res.uploadRelative || res.uploadDate || 'Recent'}
                      </span>
                      {res.fileSize && (
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-3 h-3" />
                          {res.fileSize}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreview(res);
                        }}
                        title="Preview Resource"
                        className="p-2 rounded-xl bg-[#F8F7F3] hover:bg-[#14213D] text-[#14213D] hover:text-white transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          recordDownload(res);
                        }}
                        title="Download Resource"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#E8E6DF]">
            <BookOpen className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
            <p className="text-sm font-bold text-[#14213D]">No published resources in "{activeFilter}" yet.</p>
            <button
              type="button"
              onClick={() => setActiveFilter('All')}
              className="mt-3 text-xs font-bold text-[#F59E0B] hover:underline cursor-pointer"
            >
              Show All Categories
            </button>
          </div>
        )}

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#14213D] hover:bg-[#23395B] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:-translate-y-0.5"
          >
            <span>View All Resources</span>
            <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export const FeaturedResourcesSection = () => {
  const { resources, recordView } = useApp();
  const sectionRef = useRef(null);

  const popularResources = [...resources]
    .filter((r) => r.isPublished)
    .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
    .slice(0, 3);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.featured-editorial-card', {
        y: 34,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [popularResources.length]);

  return (
    <section ref={sectionRef} className="relative bg-[#F8F7F3] py-16 sm:py-20 border-b border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-[#F59E0B]" />
              Most Downloaded
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D]">
              Popular Resources Among <span className="text-[#F59E0B]">Students</span>
            </h2>
          </div>
          <Link
            to="/explore?sort=downloads"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#14213D] hover:text-[#F59E0B] transition-colors"
          >
            <span>Explore Top Downloads</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {popularResources.map((res, idx) => {
            const fmt = getFormatStyle(res.fileType);
            return (
              <div
                key={res.id}
                className="featured-editorial-card group bg-white rounded-3xl border border-[#E8E6DF] hover:border-[#F59E0B]/70 shadow-[0_14px_40px_-18px_rgba(20,33,61,0.1)] hover:shadow-[0_22px_50px_-18px_rgba(245,158,11,0.22)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Editorial Document Preview Banner */}
                <div className="relative bg-[#F7F1ED] p-6 border-b border-[#E8E6DF] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded-xl bg-white border border-[#E8E6DF] shadow-sm flex flex-col items-center justify-center">
                      <FileCheck className="w-5 h-5 text-[#F59E0B]" />
                      <span className="text-[9px] font-black text-[#14213D] mt-0.5">{fmt.label}</span>
                    </div>
                    <div>
                      <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#D97706]">
                        #0{idx + 1} Featured
                      </span>
                      <div className="text-xs font-bold text-[#14213D] mt-0.5">{res.category}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#E8E6DF] text-xs font-extrabold text-[#14213D]">
                      <Download className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>{(res.downloads || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#64748B] mb-2">
                      <span className="text-[#14213D]">{res.subject}</span>
                      <span>•</span>
                      <span>{res.semester}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#14213D] group-hover:text-[#D97706] transition-colors leading-snug">
                      {res.title}
                    </h3>
                    <p className="text-xs text-[#64748B] mt-2 line-clamp-2 leading-relaxed">
                      {res.description || 'Verified academic study resource curated for university students.'}
                    </p>
                  </div>

                  <Link
                    to={`/resource/${res.id}`}
                    onClick={() => recordView(res.id)}
                    className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-[#F8F7F3] group-hover:bg-[#14213D] text-[#14213D] group-hover:text-white font-bold text-xs transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
