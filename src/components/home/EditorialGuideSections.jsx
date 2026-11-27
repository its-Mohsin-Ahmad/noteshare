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
  GraduationCap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const WhyNoteShareSection = () => {
  const sectionRef = useRef(null);

  const features = [
    {
      num: '01',
      title: 'Organized Academic Resources',
      desc: 'Find notes, past papers, and study materials arranged cleanly by department, subject, and semester.'
    },
    {
      num: '02',
      title: 'Easy Resource Discovery',
      desc: 'Search and filter academic materials across semesters and categories without unnecessary complexity.'
    },
    {
      num: '03',
      title: 'Student-Friendly Experience',
      desc: 'A clean editorial platform designed to make finding and saving study resources effortless.'
    },
    {
      num: '04',
      title: 'Accessible Learning Materials',
      desc: 'Access published notes, preview PDFs in-browser, and bookmark key materials from your student account.'
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
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
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
          <div className="lg:col-span-6 why-photo-wrap relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-200 aspect-[4/3]">
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

          {/* Right: Editorial Heading + 4 Feature Blocks */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                Why Choose NoteShare
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D] leading-[1.15]">
                Everything in One Place. <span className="text-[#F59E0B]">Learning Made Easier.</span>
              </h2>
            </div>

            <div className="space-y-4">
              {features.map((item) => (
                <div
                  key={item.num}
                  className="why-feature-item bg-white rounded-2xl p-5 border border-[#E8E6DF] hover:border-[#F59E0B]/70 shadow-2xs transition-all flex items-start gap-4"
                >
                  <span className="font-display text-xl font-bold text-[#F59E0B] bg-[#FFF0D6] border border-[#F59E0B]/30 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-[#14213D]">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-1 leading-relaxed">{item.desc}</p>
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

export const HowItWorksSection = () => {
  const sectionRef = useRef(null);

  const steps = [
    {
      num: '01',
      title: 'Create Your Account',
      desc: 'Register for a student account with your department, degree program, and semester.',
      icon: UserPlus
    },
    {
      num: '02',
      title: 'Explore Resources',
      desc: 'Browse subjects, semesters, lecture notes, and verified past papers effortlessly.',
      icon: Compass
    },
    {
      num: '03',
      title: 'Access Your Materials',
      desc: 'Open resource details, preview PDFs in-browser, and download available academic files.',
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
            Simple Workflow
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
                  <h3 className="text-lg font-extrabold text-[#14213D] mb-2">
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

export const StudentNeedsSection = () => {
  const sectionRef = useRef(null);

  const pillars = [
    {
      tag: 'Academic Structure',
      title: 'Built Around University Curricula',
      desc: 'Every note, slide deck, and past paper maps cleanly to a department, subject code, and semester from 1st to 8th.',
      icon: Layers
    },
    {
      tag: 'Instant Inspection',
      title: 'In-Browser Document Previews',
      desc: 'Review real PDFs and study images right inside the browser modal before downloading to your device.',
      icon: Eye
    },
    {
      tag: 'Student Collaboration',
      title: 'Moderated Student Contributions',
      desc: 'Students can upload helpful notes through their portal for administrative verification and campus-wide sharing.',
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
                <h3 className="text-lg font-extrabold text-[#14213D] mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);

  const faqs = [
    {
      q: 'What is NoteShare?',
      a: 'NoteShare is a university academic resource management platform where students can browse, preview, bookmark, and download verified lecture notes, past examination papers, assignments, and slide decks.'
    },
    {
      q: 'How can I create a student account?',
      a: 'Click "Create Account" in the top navigation bar, complete your personal and academic details (department, degree program, and semester), optionally upload a profile photo, and register instantly.'
    },
    {
      q: 'How can I find notes for my semester?',
      a: 'Use the Search Panel in the hero section, click any card in "Find Resources by Semester", or visit the Explore Resources page and filter by Semester 1 through Semester 8.'
    },
    {
      q: 'How do I download past papers?',
      a: 'Open the Past Papers page or click any past paper card to inspect its details and preview it in-browser, then click the Download button to save the available file.'
    },
    {
      q: 'Can I search by department and subject?',
      a: 'Yes. Both the hero search bar and the Explore Resources page let you filter directly by Department, Subject, Semester, and Resource Category.'
    },
    {
      q: 'How can I contact the administration?',
      a: 'You can reach out anytime through the Contact page linked in the footer, or sign in to your Student Portal to submit resource requests and view official announcements.'
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
            Support & Clarity
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14213D]">
            Frequently Asked <span className="text-[#F59E0B]">Questions</span>
          </h2>
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
                  <span className="text-sm sm:text-base font-extrabold text-[#14213D]">{item.q}</span>
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

export const FinalCtaSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.final-cta-card', {
        y: 36,
        opacity: 0,
        duration: 0.85,
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
    <section ref={sectionRef} className="relative bg-[#F8F7F3] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="final-cta-card relative rounded-[32px] p-8 sm:p-12 lg:p-14 text-white border border-[#23395B] shadow-2xl overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
          style={{
            background: 'linear-gradient(135deg, #0D1930 0%, #14213D 55%, #23395B 100%)'
          }}
        >
          {/* Subtle Orange Glow & Floating Academic Accents */}
          <div className="absolute -top-24 -right-20 w-80 h-80 rounded-full bg-[#F59E0B]/20 blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full bg-[#F59E0B]/10 blur-[80px] pointer-events-none" />
          <BookOpen className="hidden lg:block absolute right-10 bottom-6 w-36 h-36 text-white/[0.04] pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#F59E0B] text-xs font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>University Academic Network</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]">
              Your Next Study Session <span className="text-[#F59E0B]">Starts Here.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Explore academic resources and make your university learning journey more organized.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3.5 shrink-0">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#F59E0B] hover:bg-[#D97706] text-[#14213D] shadow-lg shadow-[#F59E0B]/25 transition-all hover:-translate-y-0.5"
            >
              <span>Explore Resources</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all"
            >
              <span>Create Account</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
