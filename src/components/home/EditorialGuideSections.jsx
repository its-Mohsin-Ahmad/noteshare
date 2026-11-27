import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  UserPlus,
  Compass,
  Download,
  FileText,
  FileCheck,
  Sparkles,
  ChevronDown,
  Layers,
  Eye,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Share2,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 1. WHY CHOOSE NOTESHARE? (2-Column Editorial Layout with 6 Benefit Blocks)
export const WhyNoteShareSection = () => {
  const sectionRef = useRef(null);

  const features = [
    {
      num: '01',
      title: 'Organized Academic Hierarchy',
      desc: 'All course files map strictly to academic departments, degree programs, semesters, and course codes.'
    },
    {
      num: '02',
      title: 'Instant In-Browser Previews',
      desc: 'Inspect full PDF documents, past exams, and slides directly in your browser before committing to a download.'
    },
    {
      num: '03',
      title: 'Past Examination Archives',
      desc: 'Access verified midterm and final-term examination papers across all semesters to prepare with confidence.'
    },
    {
      num: '04',
      title: 'Student-Driven Sharing',
      desc: 'Upload and contribute lecture summaries and revision guides through your student dashboard with admin moderation.'
    },
    {
      num: '05',
      title: 'Smart Search & Filters',
      desc: 'Filter thousands of academic records by department, semester, subject code, or resource format in real time.'
    },
    {
      num: '06',
      title: '100% Free & Open Access',
      desc: 'No paywalls, hidden fees, or gated content — education built openly for the entire university student body.'
    }
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.why-photo-wrap', {
        x: -35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        }
      });

      gsap.from('.why-feature-item', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#F2F1EC]/70 py-16 sm:py-24 border-b border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: University Library Photo + Floating Document Previews */}
          <div className="lg:col-span-5 why-photo-wrap relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-200 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop"
                alt="University Academic Library"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(20,33,61,0.35) 0%, rgba(245,158,11,0.18) 100%)' }}
              />
            </div>

            {/* Floating Document Preview 1 */}
            <div className="hidden sm:flex items-center gap-3 absolute -top-5 -right-3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E8E6DF] shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-[#FFF0D6] border border-[#F59E0B]/30 text-[#D97706] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#14213D]">Curated Notes</div>
                <div className="text-[11px] text-[#64748B]">Semester-wise folders</div>
              </div>
            </div>

            {/* Floating Document Preview 2 */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 left-4 bg-[#14213D] text-white p-3.5 rounded-2xl border border-[#23395B] shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-[#14213D] flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold">Past Exam Archives</div>
                <div className="text-[11px] text-slate-300">Midterms & Finals</div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Heading + 6 Feature Blocks */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                Why Choose NoteShare
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D] leading-[1.15]">
                Everything You Need. <span className="text-[#F59E0B]">One Academic Platform.</span>
              </h2>
              <p className="text-sm text-[#64748B] mt-2">
                A purpose-built academic hub engineered for university coursework, lecture revisions, and exam prep.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((item) => (
                <div
                  key={item.num}
                  className="why-feature-item bg-white rounded-2xl p-5 border border-[#E8E6DF] hover:border-[#F59E0B]/70 shadow-2xs transition-all flex items-start gap-4"
                >
                  <span className="font-display text-lg font-bold text-[#F59E0B] bg-[#FFF0D6] border border-[#F59E0B]/30 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#14213D]">{item.title}</h3>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 2. HOW NOTESHARE WORKS (3 Connected Steps)
export const HowItWorksSection = () => {
  const sectionRef = useRef(null);

  const steps = [
    {
      num: '01',
      title: 'Select Your Department & Program',
      desc: 'Choose your academic department and degree program to automatically filter matching course materials.',
      icon: UserPlus
    },
    {
      num: '02',
      title: 'Discover & Preview Documents',
      desc: 'Browse lecture notes, past exams, or assignments and preview full PDF pages directly in your browser.',
      icon: Compass
    },
    {
      num: '03',
      title: 'Download, Study & Excel',
      desc: 'Save verified academic files locally, bookmark key references to your portal, and prepare for exams.',
      icon: Download
    }
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.how-step-card', {
        y: 34,
        opacity: 0,
        duration: 0.75,
        stagger: 0.14,
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
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
            Simple Academic Workflow
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D]">
            Start Learning in <span className="text-[#F59E0B]">Three Simple Steps</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-7">
          {/* Thin orange connecting line on desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-14 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#F59E0B]/30 via-[#F59E0B] to-[#F59E0B]/30 z-0"
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="how-step-card relative z-10 bg-white rounded-3xl p-7 border border-[#E8E6DF] hover:border-[#F59E0B]/70 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#14213D] text-[#F59E0B] flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-display text-4xl font-bold text-[#14213D]/15">{step.num}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#14213D] mb-2">
                    Step {step.num} – {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// 3. DESIGNED AROUND STUDENT NEEDS (Platform Pillars)
export const StudentNeedsSection = () => {
  const sectionRef = useRef(null);

  const pillars = [
    {
      tag: 'Academic Structure',
      title: 'Curricula-Aligned Hierarchy',
      desc: 'Every note, slide deck, and past paper maps cleanly to an academic department, subject code, and semester from 1st to 8th.',
      icon: Layers
    },
    {
      tag: 'Instant Inspection',
      title: 'In-Browser Document Previews',
      desc: 'Review real PDFs and study slides directly inside the browser modal before downloading to your mobile or laptop.',
      icon: Eye
    },
    {
      tag: 'Student Collaboration',
      title: 'Verified Student Contributions',
      desc: 'Students can upload helpful notes and past papers through their portal for administrative review and campus-wide sharing.',
      icon: ShieldCheck
    }
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.needs-card', {
        y: 30,
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
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#F2F1EC]/65 py-16 sm:py-20 border-b border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
            Platform Philosophy
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D]">
            Designed Around <span className="text-[#F59E0B]">Student Needs</span>
          </h2>
          <p className="text-sm text-[#64748B] mt-2">
            Every workflow on NoteShare is crafted to help university students study smarter and stay prepared.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="needs-card bg-white rounded-3xl p-7 border border-[#E8E6DF] hover:border-[#F59E0B]/70 shadow-2xs hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF0D6] border border-[#F59E0B]/30 text-[#D97706] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F8F7F3] text-[#14213D] border border-[#E8E6DF]">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#14213D] mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// 4. FREQUENTLY ASKED QUESTIONS (The 7 Specific Questions from Prompt)
export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);

  const faqs = [
    {
      q: 'How does NoteShare organize university study resources?',
      a: 'NoteShare arranges academic resources in a structured hierarchy: Academic Department → Degree Program → Semester (1st through 8th) → Subject Code → Specific Resource Category (Notes, Past Papers, Assignments, Lecture Slides, Books, Lab Manuals). This allows students to locate verified documents without searching through clutter.'
    },
    {
      q: 'Can I preview notes and past papers before downloading?',
      a: 'Yes! Every resource card features a quick "Preview" button. Clicking it opens an in-browser PDF reader modal where you can inspect pages, examine formulas, and verify content before downloading the file to your computer or mobile device.'
    },
    {
      q: 'How do administrators add or manage degree programs and departments?',
      a: 'Administrators have full management privileges in the NoteShare Admin Dashboard. Under the "Departments & Programs" tab, administrators can add new university departments, configure degree programs (level, duration, faculty), create subjects, and assign course codes with automatic real-time sync.'
    },
    {
      q: 'Are all resources on NoteShare free to download?',
      a: 'Yes, NoteShare is 100% free and open for university students and educators. You can browse, preview, and download study notes, lecture slide decks, and past examination papers without any subscription fees or hidden paywalls.'
    },
    {
      q: 'How can students contribute their own lecture notes or past papers?',
      a: 'Registered students can sign in to their Student Portal and click "Upload Resource". Select your department, degree program, semester, and course code, then upload your PDF, DOCX, or PPTX file. Uploads are reviewed by administrators before being published university-wide.'
    },
    {
      q: 'What document formats are supported on NoteShare?',
      a: 'NoteShare primarily supports PDF documents (the standard for academic notes and past exam papers), as well as Microsoft PowerPoint slide decks (.pptx) and Microsoft Word documents (.docx).'
    },
    {
      q: 'How can I find resources specific to my semester and course?',
      a: 'You can use the interactive "Explore by Department & Program" hierarchy on the homepage, select your current semester in "Find Resources by Semester", or navigate to the Explore Resources page and filter directly by Department, Program, Semester (1 to 8), and Subject.'
    }
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
            Support & Platform Guide
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D]">
            Frequently Asked <span className="text-[#F59E0B]">Questions</span>
          </h2>
          <p className="text-sm text-[#64748B] mt-2">
            Everything you need to know about navigating, previewing, and downloading resources on NoteShare.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className={`faq-item bg-white rounded-2xl border transition-all ${
                  isOpen ? 'border-[#F59E0B]/70 shadow-md' : 'border-[#E8E6DF] hover:border-[#F59E0B]/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full px-6 py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-[#14213D]">{item.q}</span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? 'bg-[#F59E0B] text-white rotate-180' : 'bg-[#F8F7F3] text-[#14213D]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-0 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#E8E6DF]/60 mt-1 pt-3 animate-fadeIn">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// 5. FINAL CALL TO ACTION SECTION (Navy Panel, Subtle Orange Glow, Minimal Particles)
export const FinalCtaSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.cta-box', {
        scale: 0.96,
        opacity: 0,
        duration: 0.8,
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
    <section ref={sectionRef} className="relative bg-[#F8F7F3] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cta-box relative overflow-hidden rounded-3xl bg-[#14213D] text-white p-8 sm:p-12 lg:p-16 border border-[#23395B] shadow-2xl">
          {/* Subtle Orange Glow Radial */}
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#F59E0B]/20 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#F59E0B]/10 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#F59E0B] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              University Resource Hub
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready to Discover Your Next <span className="text-[#F59E0B]">Study Resource?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
              Explore thousands of verified lecture notes, past examination papers, and study guides tailored to your university degree.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 bg-[#F59E0B] text-[#14213D] font-extrabold text-sm px-6 py-3.5 rounded-2xl hover:bg-[#D97706] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Explore Resources</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold text-sm px-6 py-3.5 rounded-2xl border border-white/20 transition-all hover:-translate-y-0.5"
              >
                <span>Create Free Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
