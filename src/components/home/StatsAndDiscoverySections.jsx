import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  BookOpen,
  Download,
  Layers,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Code,
  Cpu,
  Laptop,
  Calculator,
  Atom,
  Briefcase,
  Building2,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

gsap.registerPlugin(ScrollTrigger);

const getDepartmentVisual = (name = '') => {
  const n = name.toLowerCase();
  if (n.includes('software')) return { icon: Laptop, tint: 'bg-amber-50 text-[#D97706] border-amber-200/80' };
  if (n.includes('computer')) return { icon: Code, tint: 'bg-slate-100 text-[#14213D] border-slate-200' };
  if (n.includes('electrical') || n.includes('information')) return { icon: Cpu, tint: 'bg-orange-50 text-[#EA580C] border-orange-200/80' };
  if (n.includes('math')) return { icon: Calculator, tint: 'bg-amber-50 text-[#D97706] border-amber-200/80' };
  if (n.includes('physics')) return { icon: Atom, tint: 'bg-slate-100 text-[#14213D] border-slate-200' };
  if (n.includes('business')) return { icon: Briefcase, tint: 'bg-orange-50 text-[#EA580C] border-orange-200/80' };
  return { icon: Building2, tint: 'bg-slate-100 text-[#14213D] border-slate-200' };
};

export const StatsSection = () => {
  const { students, resources, subjects } = useApp();
  const sectionRef = useRef(null);

  const publishedCount = resources.filter((r) => r.isPublished).length;
  const totalDownloadsCount = resources.reduce((acc, r) => acc + (r.downloads || 0), 0);

  const statsData = [
    {
      id: 'students',
      value: students.length,
      suffix: '+',
      label: 'Registered Students',
      sublabel: 'Active student accounts',
      icon: Users
    },
    {
      id: 'resources',
      value: publishedCount,
      suffix: '+',
      label: 'Notes & Past Papers',
      sublabel: 'Verified published files',
      icon: BookOpen
    },
    {
      id: 'downloads',
      value: totalDownloadsCount,
      suffix: '+',
      label: 'Total Downloads',
      sublabel: 'Recorded study sessions',
      icon: Download
    },
    {
      id: 'subjects',
      value: subjects.length,
      suffix: '+',
      label: 'Academic Subjects',
      sublabel: 'Across all semesters',
      icon: Layers
    }
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true
        }
      });

      statsData.forEach((stat) => {
        const el = sectionRef.current.querySelector(`[data-stat-id="${stat.id}"]`);
        if (!el) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.value,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.val).toLocaleString()}${stat.suffix}`;
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [students.length, publishedCount, totalDownloadsCount, subjects.length]);

  return (
    <section ref={sectionRef} className="relative bg-[#F8F7F3] py-12 sm:py-16 border-b border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E8E6DF] shadow-[0_12px_36px_-18px_rgba(20,33,61,0.1)] p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E6DF]">
            {statsData.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="stat-item group py-5 sm:py-2 sm:px-6 first:pt-0 sm:first:pl-0 last:pb-0 sm:last:pr-0 flex items-start gap-4 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF0D6]/80 border border-[#F59E0B]/30 text-[#D97706] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div
                      data-stat-id={stat.id}
                      className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D]"
                    >
                      {stat.value.toLocaleString()}
                      {stat.suffix}
                    </div>
                    <div className="text-sm font-bold text-[#14213D] mt-1">{stat.label}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">{stat.sublabel}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export const DepartmentsSection = () => {
  const { departments, subjects, resources } = useApp();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const scrollTrack = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.dept-card', {
        y: 30,
        opacity: 0,
        duration: 0.7,
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
  }, [departments.length]);

  return (
    <section ref={sectionRef} className="relative bg-[#F2F1EC]/70 py-16 sm:py-20 border-b border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              Academic Faculties
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D]">
              Explore Your <span className="text-[#F59E0B]">Department</span>
            </h2>
            <p className="text-sm text-[#64748B] mt-2 leading-relaxed">
              Discover academic resources organized around your field of study.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollTrack(-1)}
              aria-label="Scroll departments left"
              className="w-10 h-10 rounded-xl bg-white border border-[#E8E6DF] hover:border-[#F59E0B] text-[#14213D] flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack(1)}
              aria-label="Scroll departments right"
              className="w-10 h-10 rounded-xl bg-white border border-[#E8E6DF] hover:border-[#F59E0B] text-[#14213D] flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop horizontal carousel, Mobile responsive grid */}
        <div
          ref={trackRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:flex md:gap-5 md:overflow-x-auto md:pb-4 md:snap-x md:snap-mandatory gap-4"
          style={{ scrollbarWidth: 'thin' }}
        >
          {departments.map((dept) => {
            const { icon: Icon, tint } = getDepartmentVisual(dept.name);
            const deptSubjectsCount = subjects.filter((s) => s.department === dept.name).length;
            const deptResourcesCount = resources.filter((r) => r.department === dept.name && r.isPublished).length;

            return (
              <div
                key={dept.id}
                className="dept-card md:min-w-[290px] md:max-w-[290px] md:snap-start bg-white rounded-2xl p-6 border border-[#E8E6DF] hover:border-[#F59E0B]/70 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${tint}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F8F7F3] border border-[#E8E6DF] text-[#14213D]">
                      {dept.code || dept.name.slice(0, 3).toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#14213D] group-hover:text-[#D97706] transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed">
                    {dept.description || `Curated study materials for ${dept.name}.`}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E8E6DF] flex items-center justify-between">
                  <div className="text-xs font-semibold text-[#64748B]">
                    <span className="text-[#14213D] font-bold">{deptSubjectsCount}</span> Subjects •{' '}
                    <span className="text-[#14213D] font-bold">{deptResourcesCount}</span> Files
                  </div>
                  <Link
                    to={`/explore?department=${encodeURIComponent(dept.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#14213D] group-hover:text-[#F59E0B] transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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

export const SemestersSection = () => {
  const { semesters, subjects, resources } = useApp();
  const [activeSemester, setActiveSemester] = useState(semesters[0]?.name || 'Semester 1');
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const scrollTrack = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.sem-card', {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 84%',
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [semesters.length]);

  return (
    <section ref={sectionRef} className="relative bg-[#F8F7F3] py-16 sm:py-20 border-b border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#F59E0B]" />
              Semester Roadmap
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D]">
              Find Resources by <span className="text-[#F59E0B]">Semester</span>
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Quickly access academic materials from your current semester.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollTrack(-1)}
              aria-label="Previous semesters"
              className="w-10 h-10 rounded-xl bg-white border border-[#E8E6DF] hover:border-[#F59E0B] text-[#14213D] flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack(1)}
              aria-label="Next semesters"
              className="w-10 h-10 rounded-xl bg-white border border-[#E8E6DF] hover:border-[#F59E0B] text-[#14213D] flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin' }}
        >
          {semesters.slice(0, 8).map((sem, idx) => {
            const isSelected = activeSemester === sem.name;
            const semSubjects = subjects.filter((s) => s.semester === sem.name).length;
            const semResources = resources.filter((r) => r.semester === sem.name && r.isPublished).length;
            const num = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={sem.id}
                onClick={() => setActiveSemester(sem.name)}
                className={`sem-card min-w-[235px] max-w-[235px] snap-start rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#14213D] text-white border-[#14213D] shadow-xl shadow-[#14213D]/15 -translate-y-1'
                    : 'bg-white text-[#14213D] border-[#E8E6DF] hover:border-[#F59E0B] shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-display text-2xl font-bold ${
                        isSelected ? 'text-[#F59E0B]' : 'text-[#14213D]/30 group-hover:text-[#F59E0B]'
                      }`}
                    >
                      {num}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40'
                          : 'bg-[#F8F7F3] text-[#64748B] border border-[#E8E6DF]'
                      }`}
                    >
                      {sem.term || 'Active'}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold">{sem.label || sem.name}</h3>
                  <p className={`text-xs mt-1 ${isSelected ? 'text-slate-300' : 'text-[#64748B]'}`}>
                    {semSubjects} Subjects • {semResources} Resources
                  </p>
                </div>

                <Link
                  to={`/explore?semester=${encodeURIComponent(sem.name)}`}
                  className={`mt-5 pt-3 border-t flex items-center justify-between text-xs font-bold ${
                    isSelected
                      ? 'border-white/15 text-[#F59E0B]'
                      : 'border-[#E8E6DF] text-[#14213D] group-hover:text-[#F59E0B]'
                  }`}
                >
                  <span>Browse {sem.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
