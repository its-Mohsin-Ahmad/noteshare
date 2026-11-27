import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  BookOpen,
  Download,
  Layers,
  ArrowRight,
  Code,
  Cpu,
  Laptop,
  Calculator,
  Atom,
  Briefcase,
  Building2,
  GraduationCap,
  Search,
  CheckCircle2,
  FileText,
  FileCheck,
  FolderOpen,
  FlaskConical,
  BookMarked,
  Presentation,
  Filter,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

gsap.registerPlugin(ScrollTrigger);

// Helper to assign visual icons and accent colors to departments
const getDepartmentVisual = (name = '') => {
  const n = name.toLowerCase();
  if (n.includes('software')) return { icon: Laptop, tint: 'bg-amber-50 text-[#D97706] border-amber-200/80' };
  if (n.includes('computer')) return { icon: Code, tint: 'bg-slate-100 text-[#14213D] border-slate-200' };
  if (n.includes('electrical') || n.includes('electronic') || n.includes('systems')) return { icon: Cpu, tint: 'bg-orange-50 text-[#EA580C] border-orange-200/80' };
  if (n.includes('civil') || n.includes('architecture')) return { icon: Building2, tint: 'bg-stone-100 text-stone-800 border-stone-200' };
  if (n.includes('mechanical') || n.includes('chemical')) return { icon: Cpu, tint: 'bg-amber-50 text-amber-800 border-amber-200' };
  if (n.includes('math')) return { icon: Calculator, tint: 'bg-amber-50 text-[#D97706] border-amber-200/80' };
  if (n.includes('physics')) return { icon: Atom, tint: 'bg-slate-100 text-[#14213D] border-slate-200' };
  if (n.includes('chem') || n.includes('bio') || n.includes('micro') || n.includes('env')) return { icon: FlaskConical, tint: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  if (n.includes('business') || n.includes('account') || n.includes('econ')) return { icon: Briefcase, tint: 'bg-orange-50 text-[#EA580C] border-orange-200/80' };
  if (n.includes('medical') || n.includes('pharm') || n.includes('health')) return { icon: GraduationCap, tint: 'bg-rose-50 text-rose-700 border-rose-200' };
  if (n.includes('law') || n.includes('political') || n.includes('relation')) return { icon: BookMarked, tint: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
  return { icon: BookOpen, tint: 'bg-slate-100 text-[#14213D] border-slate-200' };
};

// 1. STATS SECTION (Registered Students, Available Resources, Total Downloads, Academic Departments)
export const StatsSection = () => {
  const { students, resources, departments } = useApp();
  const sectionRef = useRef(null);

  const publishedCount = resources.filter((r) => r.isPublished).length;
  const totalDownloadsCount = resources.reduce((acc, r) => acc + (r.downloads || 0), 0);

  const statsData = [
    {
      id: 'students',
      value: students.length,
      suffix: '+',
      label: 'Registered Students',
      sublabel: 'Active university accounts',
      icon: Users
    },
    {
      id: 'resources',
      value: publishedCount,
      suffix: '+',
      label: 'Available Resources',
      sublabel: 'Verified notes & papers',
      icon: BookOpen
    },
    {
      id: 'downloads',
      value: totalDownloadsCount,
      suffix: '+',
      label: 'Total Downloads',
      sublabel: 'Study materials accessed',
      icon: Download
    },
    {
      id: 'departments',
      value: departments.length,
      suffix: '+',
      label: 'Academic Departments',
      sublabel: 'Covering all disciplines',
      icon: Building2
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
  }, [students.length, publishedCount, totalDownloadsCount, departments.length]);

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

// 2. RESOURCE CATEGORIES SECTION (6 Attractively Designed Resource Cards)
export const ResourceCategoriesSection = () => {
  const { resources } = useApp();
  const sectionRef = useRef(null);

  const categories = [
    {
      id: 'Notes',
      title: 'University Notes',
      desc: 'Handwritten notes, comprehensive chapter summaries, formulas, and revision cheatsheets.',
      icon: FileText,
      tint: 'bg-amber-50 text-[#D97706] border-amber-200/80',
      tag: 'Lecture Materials'
    },
    {
      id: 'Past Papers',
      title: 'Past Examination Papers',
      desc: 'Midterm, final-term, and seasonal examination papers with marking schemes and solutions.',
      icon: FileCheck,
      tint: 'bg-orange-50 text-[#EA580C] border-orange-200/80',
      tag: 'Exam Archives'
    },
    {
      id: 'Assignments',
      title: 'Assignments & Quizzes',
      desc: 'Semester assignments, laboratory tasks, question prompts, and sample homework answers.',
      icon: FolderOpen,
      tint: 'bg-blue-50 text-blue-700 border-blue-200/80',
      tag: 'Coursework'
    },
    {
      id: 'Lecture Slides',
      title: 'Lecture Slides & Handouts',
      desc: 'Official faculty presentation decks, PDF slide handouts, and syllabus outlines.',
      icon: Presentation,
      tint: 'bg-purple-50 text-purple-700 border-purple-200/80',
      tag: 'Class Slides'
    },
    {
      id: 'Books',
      title: 'Books & Reference Materials',
      desc: 'Recommended textbooks, open-access academic publications, and subject references.',
      icon: BookMarked,
      tint: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      tag: 'Textbooks'
    },
    {
      id: 'Lab Manuals',
      title: 'Practical & Lab Manuals',
      desc: 'Engineering workbench guides, code notebooks, scientific apparatus manuals, and experiment guides.',
      icon: FlaskConical,
      tint: 'bg-rose-50 text-rose-700 border-rose-200/80',
      tag: 'Laboratory'
    }
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.cat-card', {
        y: 28,
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
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#F8F7F3] py-16 sm:py-24 border-b border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            Academic Resource Categories
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D] leading-tight">
            Everything You Need for Your <span className="text-[#F59E0B]">Academic Journey</span>
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] mt-3">
            Find organized learning materials, study notes, and examination resources in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = resources.filter((r) => r.isPublished && (r.category === cat.id || (cat.id === 'Past Papers' && (r.examType === 'Midterm' || r.examType === 'Final Term')))).length;

            return (
              <div
                key={cat.id}
                className="cat-card bg-white rounded-3xl p-7 border border-[#E8E6DF] hover:border-[#F59E0B]/70 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${cat.tint}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F8F7F3] border border-[#E8E6DF] text-[#64748B]">
                      {cat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#14213D] group-hover:text-[#D97706] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-2.5 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E8E6DF] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#14213D] bg-[#FFF0D6]/80 px-2.5 py-1 rounded-lg border border-[#F59E0B]/20">
                    {count} Available
                  </span>
                  <Link
                    to={`/explore?category=${encodeURIComponent(cat.id)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14213D] group-hover:text-[#F59E0B] transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
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

// 3. INTERACTIVE CONNECTED ACADEMIC HIERARCHY EXPLORER
// Department -> Degree Program -> Semester -> Subject -> Direct Filtered Resources
export const AcademicHierarchyExplorer = () => {
  const { departments, degreePrograms, semesters, subjects, resources } = useApp();
  const [selectedDept, setSelectedDept] = useState('Computer Science');
  const [selectedProgram, setSelectedProgram] = useState('BS Computer Science');
  const [selectedSemester, setSelectedSemester] = useState('Semester 1');

  // Filter programs based on selected department
  const availablePrograms = useMemo(() => {
    const list = degreePrograms.filter((p) => p.department === selectedDept);
    return list.length > 0 ? list : degreePrograms.slice(0, 4);
  }, [degreePrograms, selectedDept]);

  // Synchronize program when department changes
  useEffect(() => {
    if (availablePrograms.length > 0 && !availablePrograms.some((p) => p.name === selectedProgram)) {
      setSelectedProgram(availablePrograms[0].name);
    }
  }, [availablePrograms, selectedProgram]);

  // Filter subjects based on program, department, and semester
  const availableSubjects = useMemo(() => {
    return subjects.filter((s) => {
      const matchDept = !selectedDept || s.department === selectedDept;
      const matchSem = !selectedSemester || s.semester === selectedSemester;
      return matchDept && matchSem;
    });
  }, [subjects, selectedDept, selectedSemester]);

  return (
    <section className="relative bg-[#F2F1EC]/70 py-16 sm:py-24 border-b border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
            <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
            Connected Academic Pathway
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D]">
            Explore by <span className="text-[#F59E0B]">Department & Program</span>
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] mt-2">
            Select your department, degree program, and semester to instantly access course notes and past papers.
          </p>
        </div>

        {/* 4-Step Interactive Breadcrumb Card */}
        <div className="bg-white rounded-3xl border border-[#E8E6DF] shadow-md p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Department Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14213D] mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#14213D] text-[#F59E0B] text-[10px] flex items-center justify-center font-bold">1</span>
                Academic Department
              </label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full bg-[#F8F7F3] border border-[#E8E6DF] text-[#14213D] font-bold text-sm rounded-2xl px-4 py-3 focus:outline-none focus:border-[#F59E0B] cursor-pointer"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Degree Program Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14213D] mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#14213D] text-[#F59E0B] text-[10px] flex items-center justify-center font-bold">2</span>
                Degree Program
              </label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full bg-[#F8F7F3] border border-[#E8E6DF] text-[#14213D] font-bold text-sm rounded-2xl px-4 py-3 focus:outline-none focus:border-[#F59E0B] cursor-pointer"
              >
                {availablePrograms.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Semester Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14213D] mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#14213D] text-[#F59E0B] text-[10px] flex items-center justify-center font-bold">3</span>
                Current Semester
              </label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full bg-[#F8F7F3] border border-[#E8E6DF] text-[#14213D] font-bold text-sm rounded-2xl px-4 py-3 focus:outline-none focus:border-[#F59E0B] cursor-pointer"
              >
                {semesters.slice(0, 8).map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.label || s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Step 4: Available Subjects for this Selection */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#14213D]">
                Course Subjects for <span className="text-[#D97706]">{selectedProgram}</span>
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Showing courses for {selectedSemester} in the Department of {selectedDept}
              </p>
            </div>
            <Link
              to={`/explore?department=${encodeURIComponent(selectedDept)}&semester=${encodeURIComponent(selectedSemester)}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#14213D] hover:text-[#D97706] bg-white px-4 py-2 rounded-xl border border-[#E8E6DF]"
            >
              <span>View All Files</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {availableSubjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {availableSubjects.map((sub) => {
                const subResources = resources.filter((r) => r.isPublished && (r.subject === sub.name || r.subjectCode === sub.code));
                return (
                  <div
                    key={sub.id}
                    className="bg-white rounded-2xl p-5 border border-[#E8E6DF] hover:border-[#F59E0B] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-[#FFF0D6] border border-[#F59E0B]/30 text-[#D97706]">
                          {sub.code}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F8F7F3] text-[#64748B]">
                          {sub.type || 'Core'}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#14213D] group-hover:text-[#D97706] transition-colors">
                        {sub.name}
                      </h4>
                      <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed">
                        {sub.description || `Academic course materials for ${sub.name}.`}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#E8E6DF] flex items-center justify-between">
                      <span className="text-xs font-bold text-[#64748B]">
                        {subResources.length} files available
                      </span>
                      <Link
                        to={`/explore?subject=${encodeURIComponent(sub.name)}&semester=${encodeURIComponent(selectedSemester)}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#14213D] group-hover:text-[#F59E0B]"
                      >
                        <span>Open Course</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-[#E8E6DF] text-center">
              <FolderOpen className="w-10 h-10 text-[#64748B]/40 mx-auto mb-3" />
              <h4 className="text-base font-bold text-[#14213D]">No specific subjects listed for this semester yet</h4>
              <p className="text-xs text-[#64748B] mt-1 mb-4">
                You can still explore general departmental resources or switch semesters.
              </p>
              <Link
                to={`/explore?department=${encodeURIComponent(selectedDept)}`}
                className="inline-flex items-center gap-2 bg-[#14213D] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#23395B]"
              >
                Browse {selectedDept} Department
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// 4. BROWSE ACADEMIC DEPARTMENTS (All 30 Departments in 4-column responsive grid with search filter & view all toggle)
export const DepartmentsSection = () => {
  const { departments, subjects, resources } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  const filteredDepartments = useMemo(() => {
    if (!searchQuery.trim()) return departments;
    const q = searchQuery.toLowerCase();
    return departments.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        (d.code && d.code.toLowerCase().includes(q)) ||
        (d.description && d.description.toLowerCase().includes(q))
    );
  }, [departments, searchQuery]);

  const displayedDepartments = showAll || searchQuery.trim() ? filteredDepartments : filteredDepartments.slice(0, 8);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.dept-card', {
        y: 26,
        opacity: 0,
        duration: 0.65,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [displayedDepartments.length]);

  return (
    <section ref={sectionRef} id="departments-section" className="relative bg-[#F8F7F3] py-16 sm:py-24 border-b border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Department Search Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
              <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" />
              Academic Faculties & Disciplines
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D] leading-tight">
              Explore Resources by <span className="text-[#F59E0B]">Department</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-2.5 leading-relaxed">
              Find notes, past papers, assignments, and study materials organized by your academic department.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full lg:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-[#64748B] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E8E6DF] rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-[#14213D] placeholder-[#64748B]/60 focus:outline-none focus:border-[#F59E0B] shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#64748B] hover:text-[#14213D]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayedDepartments.map((dept) => {
            const { icon: Icon, tint } = getDepartmentVisual(dept.name);
            const deptSubjectsCount = subjects.filter((s) => s.department === dept.name).length;
            const deptResourcesCount = resources.filter((r) => r.department === dept.name && r.isPublished).length;

            return (
              <div
                key={dept.id}
                className="dept-card bg-white rounded-3xl p-6 border border-[#E8E6DF] hover:border-[#F59E0B]/70 shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${tint}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#F8F7F3] border border-[#E8E6DF] text-[#14213D]">
                      {dept.code || dept.name.slice(0, 3).toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#14213D] group-hover:text-[#D97706] transition-colors leading-snug">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-2 line-clamp-2 leading-relaxed">
                    {dept.description || `Academic resources and materials for ${dept.name}.`}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E8E6DF] flex items-center justify-between">
                  <div className="text-[11px] font-semibold text-[#64748B]">
                    <span className="text-[#14213D] font-bold">{deptSubjectsCount || dept.totalPrograms || 2}</span> Programs •{' '}
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

        {/* View All Departments Toggle Button */}
        {!searchQuery.trim() && departments.length > 8 && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white border border-[#E8E6DF] hover:border-[#F59E0B] text-[#14213D] font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>{showAll ? 'Show Fewer Departments' : `View All ${departments.length} Departments`}</span>
              <ArrowRight className={`w-4 h-4 transition-transform ${showAll ? '-rotate-90' : 'rotate-90'}`} />
            </button>
            <div className="text-xs text-[#64748B] mt-2 font-medium">
              Showing {displayedDepartments.length} of {departments.length} accredited university departments
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// 5. CHOOSE YOUR DEGREE PROGRAM SECTION (Categorized by Faculty)
export const DegreeProgramsSection = () => {
  const { degreePrograms } = useApp();
  const [activeFaculty, setActiveFaculty] = useState('All');
  const sectionRef = useRef(null);

  const faculties = [
    'All',
    'Engineering & Computing',
    'Business & Management',
    'Natural & Applied Sciences',
    'Social Sciences & Humanities',
    'Health Sciences'
  ];

  const filteredPrograms = useMemo(() => {
    if (activeFaculty === 'All') return degreePrograms;
    return degreePrograms.filter((p) => p.faculty === activeFaculty);
  }, [degreePrograms, activeFaculty]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.prog-card', {
        y: 26,
        opacity: 0,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredPrograms.length]);

  return (
    <section ref={sectionRef} className="relative bg-[#F2F1EC]/70 py-16 sm:py-24 border-b border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#F59E0B]" />
              Accredited Curricula
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D]">
              Choose Your <span className="text-[#F59E0B]">Degree Program</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-2">
              Allow students to explore programs within their departments.
            </p>
          </div>

          {/* Faculty Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {faculties.map((fac) => (
              <button
                key={fac}
                type="button"
                onClick={() => setActiveFaculty(fac)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFaculty === fac
                    ? 'bg-[#14213D] text-white shadow-sm'
                    : 'bg-white text-[#14213D]/75 border border-[#E8E6DF] hover:border-[#F59E0B]'
                }`}
              >
                {fac}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="prog-card bg-white rounded-3xl p-6 border border-[#E8E6DF] hover:border-[#F59E0B]/70 shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-extrabold px-3 py-1 rounded-lg bg-[#FFF0D6] border border-[#F59E0B]/30 text-[#D97706]">
                    {prog.code}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F8F7F3] border border-[#E8E6DF] text-[#64748B]">
                    {prog.level || 'Undergraduate'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#14213D] group-hover:text-[#D97706] transition-colors leading-snug">
                  {prog.name}
                </h3>
                <div className="mt-2 text-xs font-medium text-[#64748B] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Department of {prog.department}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E6DF] flex items-center justify-between">
                <span className="text-xs font-bold text-[#14213D]">
                  {prog.duration || '4 Years (8 Semesters)'}
                </span>
                <Link
                  to={`/explore?department=${encodeURIComponent(prog.department)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14213D] group-hover:text-[#F59E0B] transition-colors"
                >
                  <span>Explore Program</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. BROWSE BY SEMESTER (1st to 8th Semester Cards dynamically reflecting selected program)
export const SemestersSection = () => {
  const { semesters, degreePrograms, subjects, resources } = useApp();
  const [selectedProgramName, setSelectedProgramName] = useState('BS Computer Science');
  const sectionRef = useRef(null);

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
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#F8F7F3] py-16 sm:py-24 border-b border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#F59E0B]" />
              Structured Roadmaps
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D]">
              Find Resources by <span className="text-[#F59E0B]">Semester</span>
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Quickly access course folders and study files tailored to your current semester.
            </p>
          </div>

          {/* Quick Degree Program Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#64748B] whitespace-nowrap">Active Program:</span>
            <select
              value={selectedProgramName}
              onChange={(e) => setSelectedProgramName(e.target.value)}
              className="bg-white border border-[#E8E6DF] rounded-xl px-3.5 py-2 text-xs font-bold text-[#14213D] focus:outline-none focus:border-[#F59E0B] shadow-2xs cursor-pointer"
            >
              {degreePrograms.slice(0, 10).map((p) => (
                <option key={p.id} value={p.name}>
                  {p.code} - {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 8 Semester Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {semesters.slice(0, 8).map((sem, idx) => {
            const semSubjects = subjects.filter((s) => s.semester === sem.name).length;
            const semResources = resources.filter((r) => r.semester === sem.name && r.isPublished).length;
            const num = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={sem.id}
                className="sem-card bg-white rounded-3xl p-6 border border-[#E8E6DF] hover:border-[#F59E0B]/70 shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-3xl font-bold text-[#14213D]/25 group-hover:text-[#F59E0B] transition-colors">
                      {num}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F8F7F3] text-[#64748B] border border-[#E8E6DF]">
                      {sem.term || 'Fall/Spring'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#14213D] group-hover:text-[#D97706] transition-colors">
                    {sem.label || sem.name}
                  </h3>
                  <div className="mt-2 space-y-1 text-xs text-[#64748B]">
                    <div>
                      <span className="font-bold text-[#14213D]">{semSubjects || 4}</span> Available Subjects
                    </div>
                    <div>
                      <span className="font-bold text-[#14213D]">{semResources}</span> Notes & Past Papers
                    </div>
                  </div>
                </div>

                <Link
                  to={`/explore?semester=${encodeURIComponent(sem.name)}`}
                  className="mt-6 pt-4 border-t border-[#E8E6DF] flex items-center justify-between text-xs font-bold text-[#14213D] group-hover:text-[#F59E0B] transition-colors"
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
