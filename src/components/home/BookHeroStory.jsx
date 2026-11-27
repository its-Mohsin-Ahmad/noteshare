import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  FileText,
  FileCheck,
  ClipboardList,
  Presentation,
  Layers,
  Building2,
  Sparkles,
  GraduationCap,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import heroBookImg from '../../assets/hero-book.png';

gsap.registerPlugin(ScrollTrigger, Flip);

export const BookHeroStory = () => {
  const { subjects, semesters } = useApp();
  const navigate = useNavigate();

  // Search panel state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Refs for GSAP context & choreography
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const bookOuterRef = useRef(null);
  const bookInnerRef = useRef(null);
  const bookTiltRef = useRef(null);
  const glowRef = useRef(null);
  const bgTypeRef = useRef(null);
  const decorRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (selectedSubject) params.set('subject', selectedSubject);
    if (selectedSemester) params.set('semester', selectedSemester);
    if (selectedCategory) params.set('category', selectedCategory);
    navigate(`/explore?${params.toString()}`);
  };

  const scrollToStory = () => {
    if (!stageRef.current) return;
    const targetY = stageRef.current.offsetTop + 520;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // Recalculate ScrollTrigger after book image loads
  const handleImageLoad = () => {
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. INITIAL PAGE LOAD CINEMATIC TIMELINE
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTl
        .from('.hero-bg-type', {
          opacity: 0,
          scale: 0.96,
          duration: 1.2,
          ease: 'power2.inOut'
        })
        .from(
          '.hero-glow',
          {
            scale: 0.55,
            opacity: 0,
            duration: 1.1,
            ease: 'power2.out'
          },
          '-=1.0'
        )
        .from(
          '.hero-label',
          {
            y: 16,
            opacity: 0,
            duration: 0.65
          },
          '-=0.85'
        )
        .from(
          '.hero-heading-line',
          {
            yPercent: 105,
            opacity: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: 'expo.out'
          },
          '-=0.5'
        )
        .from(
          '.hero-desc',
          {
            y: 20,
            opacity: 0,
            duration: 0.7
          },
          '-=0.6'
        )
        .from(
          '.hero-cta',
          {
            y: 16,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12
          },
          '-=0.5'
        )
        .from(
          bookOuterRef.current,
          {
            y: 70,
            rotateX: 12,
            scale: 0.88,
            opacity: 0,
            duration: 1.15,
            ease: 'expo.out'
          },
          '-=0.95'
        )
        .from(
          '.hero-float-page',
          {
            y: 26,
            scale: 0.8,
            opacity: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out'
          },
          '-=0.7'
        )
        .from(
          '.hero-search-panel',
          {
            y: 28,
            opacity: 0,
            duration: 0.75,
            ease: 'power3.out'
          },
          '-=0.65'
        );

      // Gentle continuous ambient float on inner book wrapper (independent of ScrollTrigger)
      gsap.to(bookInnerRef.current, {
        y: -10,
        rotationZ: 0.8,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Ambient float on tiny pages
      gsap.to('.hero-float-page', {
        y: (i) => (i % 2 === 0 ? -9 : 9),
        rotation: (i) => (i % 2 === 0 ? 4 : -4),
        duration: (i) => 2.8 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 2. RESPONSIVE SCROLL STORYTELLING WITH MATCHMEDIA
      const mm = gsap.matchMedia();

      // Desktop & Tablet: Book starts DEAD CENTER, then glides smoothly to the RIGHT side
      mm.add('(min-width: 768px)', () => {
        gsap.set(['.story-beat-1', '.story-beat-2', '.story-beat-3'], {
          opacity: 0,
          y: 40,
          pointerEvents: 'none'
        });
        gsap.set('.story-doc-card', {
          opacity: 0,
          y: 24,
          scale: 0.92
        });

        const storyTl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top top',
            end: '+=2800',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });

        // SCENE 1 -> SCENE 2:
        // Top Hero Header & Bottom Search Panel fade out;
        // Centered Book with Hands glides smoothly to the RIGHT side in 3D!
        storyTl
          .to(
            '.hero-top-row',
            {
              opacity: 0,
              y: -36,
              duration: 0.85,
              ease: 'power2.inOut',
              pointerEvents: 'none'
            },
            0
          )
          .to(
            '.hero-search-panel',
            {
              opacity: 0,
              y: 36,
              duration: 0.75,
              ease: 'power2.inOut',
              pointerEvents: 'none'
            },
            0
          )
          .to(
            bgTypeRef.current,
            {
              xPercent: -12,
              y: -35,
              opacity: 0.6,
              duration: 2.2,
              ease: 'none'
            },
            0
          )
          .to(
            decorRef.current,
            {
              y: -45,
              duration: 2.2,
              ease: 'none'
            },
            0
          )
          .to(
            bookOuterRef.current,
            {
              xPercent: 38,
              yPercent: -12,
              scale: 0.72,
              rotateY: -14,
              rotateX: 6,
              duration: 1.35,
              ease: 'power2.inOut'
            },
            0.05
          )
          .to(
            glowRef.current,
            {
              xPercent: 38,
              yPercent: -12,
              scale: 1.15,
              opacity: 0.9,
              duration: 1.35
            },
            0.05
          )

          // SCENE 3A: Story Beat 01 — Everything Starts with Knowledge (Left side)
          .to(
            '.story-beat-1',
            {
              opacity: 1,
              y: 0,
              pointerEvents: 'auto',
              duration: 0.85,
              ease: 'power3.out'
            },
            1.0
          )
          .to(
            '.story-beat-1',
            {
              opacity: 0,
              y: -35,
              pointerEvents: 'none',
              duration: 0.7,
              ease: 'power2.in'
            },
            2.2
          )

          // SCENE 3B: Story Beat 02 — Find the Resources You Need + Floating Document Cards
          .to(
            bookOuterRef.current,
            {
              rotateY: -7,
              rotateX: 9,
              scale: 0.75,
              duration: 1.0,
              ease: 'power1.inOut'
            },
            2.4
          )
          .to(
            '.story-beat-2',
            {
              opacity: 1,
              y: 0,
              pointerEvents: 'auto',
              duration: 0.85,
              ease: 'power3.out'
            },
            2.5
          )
          .to(
            '.story-doc-card',
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.14,
              duration: 0.65,
              ease: 'power3.out'
            },
            2.7
          )
          .to(
            '.story-beat-2',
            {
              opacity: 0,
              y: -35,
              pointerEvents: 'none',
              duration: 0.7,
              ease: 'power2.in'
            },
            3.9
          )

          // SCENE 3C: Story Beat 03 — Make Every Study Session Count
          .to(
            '.story-beat-3',
            {
              opacity: 1,
              y: 0,
              pointerEvents: 'auto',
              duration: 0.85,
              ease: 'power3.out'
            },
            4.2
          )

          // SCENE 4: The Book Opens & Pages Fan Outward
          .to(
            bookOuterRef.current,
            {
              xPercent: 34,
              yPercent: -16,
              scale: 0.82,
              rotateY: 5,
              rotateX: 12,
              duration: 1.25,
              ease: 'power2.inOut'
            },
            4.7
          )
          .to(
            '.hero-float-page-1',
            {
              x: -95,
              y: -70,
              rotation: -18,
              scale: 1.16,
              opacity: 1,
              duration: 1.1,
              ease: 'power2.out'
            },
            4.8
          )
          .to(
            '.hero-float-page-2',
            {
              x: 85,
              y: -80,
              rotation: 20,
              scale: 1.18,
              opacity: 1,
              duration: 1.1,
              ease: 'power2.out'
            },
            4.85
          )
          .to(
            '.hero-float-page-3',
            {
              x: -65,
              y: 60,
              rotation: -12,
              scale: 1.12,
              opacity: 1,
              duration: 1.1,
              ease: 'power2.out'
            },
            4.9
          )
          .to(
            glowRef.current,
            {
              scale: 1.4,
              opacity: 1,
              duration: 1.0
            },
            4.8
          );
      });

      // Mobile (< 768px): Unpinned, clean vertical reveal for story cards
      mm.add('(max-width: 767px)', () => {
        gsap.utils.toArray('.mobile-story-card').forEach((card) => {
          gsap.from(card, {
            y: 28,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
              once: true
            }
          });
        });
      });

      // 3. MOUSE-FOLLOW 3D PARALLAX ON DESKTOP
      if (window.matchMedia('(min-width: 1024px)').matches && bookTiltRef.current && stageRef.current) {
        const rotX = gsap.quickTo(bookTiltRef.current, 'rotateX', { duration: 0.55, ease: 'power3.out' });
        const rotY = gsap.quickTo(bookTiltRef.current, 'rotateY', { duration: 0.55, ease: 'power3.out' });
        const bgX = gsap.quickTo(bgTypeRef.current, 'x', { duration: 0.8, ease: 'power3.out' });

        const handleMouseMove = (e) => {
          const rect = stageRef.current.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          rotY(relX * 10);
          rotX(-relY * 8);
          bgX(-relX * 24);
        };

        const handleMouseLeave = () => {
          rotY(0);
          rotX(0);
          bgX(0);
        };

        const stageEl = stageRef.current;
        stageEl.addEventListener('mousemove', handleMouseMove);
        stageEl.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          stageEl.removeEventListener('mousemove', handleMouseMove);
          stageEl.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative overflow-x-hidden">
      {/* ===================================================================== */}
      {/* PINNED HERO + 3D BOOK SCROLL STORYTELLING STAGE                       */}
      {/* ===================================================================== */}
      <section
        ref={stageRef}
        className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden pt-6 pb-6 sm:pt-10 sm:pb-8"
        style={{
          background: 'linear-gradient(180deg, #F7F1ED 0%, #F7F1ED 55%, #FCE4D2 84%, #F5C39B 100%)'
        }}
      >
        {/* Subtle Grain Texture Overlay */}
        <div className="bg-grain-overlay absolute inset-0 pointer-events-none z-0" />

        {/* Thin Decorative Architectural Lines & Floating Particles */}
        <div ref={decorRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="hidden md:block absolute top-12 left-10 right-10 h-px bg-[#14213D]/[0.05]" />
          <div className="hidden md:block absolute top-0 bottom-0 left-[7%] w-px bg-[#14213D]/[0.04]" />
          <div className="hidden md:block absolute top-0 bottom-0 right-[7%] w-px bg-[#14213D]/[0.04]" />
          <span className="absolute top-[22%] left-[12%] w-2 h-2 rounded-full bg-[#F59E0B]/40" />
          <span className="absolute top-[30%] right-[12%] w-1.5 h-1.5 rounded-full bg-[#14213D]/25" />
          <span className="absolute bottom-[30%] left-[20%] w-2.5 h-2.5 rounded-full border border-[#F59E0B]/45" />
        </div>

        {/* Very Large Low-Opacity Background Typography */}
        <div
          ref={bgTypeRef}
          aria-hidden="true"
          className="hero-bg-type absolute inset-x-0 top-[22%] md:top-[18%] flex justify-center items-center pointer-events-none select-none z-0 overflow-hidden"
        >
          <span className="font-display text-[22vw] sm:text-[18vw] lg:text-[16.5rem] font-bold tracking-[-0.04em] leading-none text-[#14213D]/[0.05] whitespace-nowrap">
            NoteShare
          </span>
        </div>

        {/* MAIN STAGE CONTAINER */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
          
          {/* TOP ROW (BookVerse Composition: Left Heading + CTAs, Right Description) */}
          <div className="hero-top-row grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-1 sm:pt-2 z-20">
            {/* Top Left: Label + Heading + CTAs */}
            <div className="md:col-span-7 space-y-3.5">
              <div className="hero-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#E5DDD5] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#14213D]/80">
                  Your University Resource Platform
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.55rem] font-bold tracking-[-0.03em] text-[#14213D] leading-[1.06]">
                <span className="block overflow-hidden">
                  <span className="hero-heading-line block">Discover Your Next</span>
                </span>
                <span className="block overflow-hidden mt-1">
                  <span className="hero-heading-line block">
                    Great{' '}
                    <span className="text-[#F59E0B]">Study Resource</span>.
                  </span>
                </span>
              </h1>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to="/explore"
                  className="hero-cta inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#14213D] hover:bg-[#1E2F54] text-white shadow-lg shadow-[#14213D]/15 transition-all hover:-translate-y-0.5"
                >
                  <span>Explore Resources</span>
                  <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
                </Link>

                <button
                  type="button"
                  onClick={scrollToStory}
                  className="hero-cta inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-[#14213D] bg-white/85 hover:bg-white border border-[#E5DDD5] hover:border-[#F59E0B] transition-all shadow-xs cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#F59E0B]" />
                  <span>Discover NoteShare</span>
                </button>
              </div>
            </div>

            {/* Top Right: Editorial Description */}
            <div className="md:col-span-5 md:pt-8 lg:pl-8">
              <p className="hero-desc text-xs sm:text-sm lg:text-[15px] text-[#475569] leading-relaxed font-normal max-w-md md:ml-auto">
                Explore university notes, past papers, lecture materials, and academic resources — everything you need for your learning journey in one place.
              </p>
            </div>
          </div>

          {/* DESKTOP STORYTELLING OVERLAY BEATS (01, 02, 03 — Left Half while Book Glides Right) */}
          <div className="hidden md:block absolute inset-y-0 left-4 sm:left-6 lg:left-8 w-[48%] pointer-events-none z-20">
            {/* 01 — Everything Starts with Knowledge */}
            <div className="story-beat-1 absolute inset-0 flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs font-black tracking-[0.2em] text-[#F59E0B] bg-[#FFF0D6] px-3 py-1 rounded-full border border-[#F59E0B]/30">
                  01
                </span>
                <span className="h-px w-12 bg-[#14213D]/20" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#14213D]/60">
                  Curated Foundation
                </span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-[-0.025em] text-[#14213D] leading-tight">
                Everything Starts with <span className="text-[#F59E0B]">Knowledge.</span>
              </h2>
              <p className="text-sm lg:text-base text-[#475569] leading-relaxed max-w-md">
                Stop digging through scattered folders and chat groups. Access structured semester notes, verified syllabi, and faculty handouts organized cleanly by department and course.
              </p>
            </div>

            {/* 02 — Find the Resources You Need + Floating Document Cards */}
            <div className="story-beat-2 absolute inset-0 flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs font-black tracking-[0.2em] text-[#F59E0B] bg-[#FFF0D6] px-3 py-1 rounded-full border border-[#F59E0B]/30">
                  02
                </span>
                <span className="h-px w-12 bg-[#14213D]/20" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#14213D]/60">
                  Instant Discovery
                </span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-[-0.025em] text-[#14213D] leading-tight">
                Find the <span className="text-[#F59E0B]">Resources</span> You Need.
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed max-w-md">
                Preview PDFs in your browser, save exam papers to your personal library, and revise faster before every midterm and final.
              </p>

              {/* Floating Editorial Document Cards */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
                <div className="story-doc-card bg-white/95 p-3.5 rounded-2xl border border-[#E5DDD5] shadow-md">
                  <FileText className="w-5 h-5 text-[#F59E0B] mb-2" />
                  <div className="text-xs font-extrabold text-[#14213D]">Lecture Notes</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Verified PDFs</div>
                </div>
                <div className="story-doc-card bg-white/95 p-3.5 rounded-2xl border border-[#E5DDD5] shadow-md">
                  <FileCheck className="w-5 h-5 text-[#14213D] mb-2" />
                  <div className="text-xs font-extrabold text-[#14213D]">Past Papers</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Solved Exams</div>
                </div>
                <div className="story-doc-card bg-white/95 p-3.5 rounded-2xl border border-[#E5DDD5] shadow-md">
                  <Presentation className="w-5 h-5 text-[#EA580C] mb-2" />
                  <div className="text-xs font-extrabold text-[#14213D]">Slide Decks</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Weekly Topics</div>
                </div>
              </div>
            </div>

            {/* 03 — Make Every Study Session Count */}
            <div className="story-beat-3 absolute inset-0 flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs font-black tracking-[0.2em] text-[#F59E0B] bg-[#FFF0D6] px-3 py-1 rounded-full border border-[#F59E0B]/30">
                  03
                </span>
                <span className="h-px w-12 bg-[#14213D]/20" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#14213D]/60">
                  Ready to Study
                </span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-[-0.025em] text-[#14213D] leading-tight">
                Make Every Study <span className="text-[#F59E0B]">Session Count.</span>
              </h2>
              <p className="text-sm lg:text-base text-[#475569] leading-relaxed max-w-md">
                Join thousands of students sharing high-quality academic notes, lab guides, and examination archives across every semester.
              </p>
              <div className="pt-2">
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-lg shadow-[#F59E0B]/25 transition-all hover:-translate-y-0.5"
                >
                  <span>Explore Resources</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* CENTER HERO VISUAL: LARGE OPEN BOOK WITH HANDS (Dead Center First, Glides Right on Scroll) */}
          <div className="relative flex-1 flex items-end justify-center perspective-1500 -mb-8 sm:-mb-12 pt-2 z-10 pointer-events-none">
            {/* Subtle Warm Orange Glow Behind Book */}
            <div
              ref={glowRef}
              className="hero-glow absolute bottom-8 w-80 h-80 sm:w-[480px] sm:h-[380px] rounded-full bg-[#F59E0B]/25 blur-[80px] pointer-events-none"
            />

            {/* Outer Scroll-Controlled Book Container (Centered by Flexbox) */}
            <div
              ref={bookOuterRef}
              className="relative preserve-3d w-full max-w-[440px] sm:max-w-[600px] lg:max-w-[700px] xl:max-w-[760px] flex items-end justify-center"
            >
              {/* Mouse-Follow 3D Tilt Wrapper */}
              <div ref={bookTiltRef} className="relative preserve-3d w-full flex items-end justify-center">
                {/* Continuous Gentle Float Wrapper */}
                <div ref={bookInnerRef} className="relative preserve-3d w-full flex items-end justify-center">
                  
                  {/* Floating Editorial Page 1 (Top Left) */}
                  <div
                    aria-hidden="true"
                    className="hero-float-page hero-float-page-1 hidden sm:flex flex-col gap-1.5 absolute top-2 left-2 sm:left-4 w-16 h-20 bg-white/95 rounded-lg border border-[#E5DDD5] shadow-md p-2.5 -rotate-12 z-10 pointer-events-none"
                  >
                    <div className="w-6 h-1 rounded bg-[#F59E0B]/70" />
                    <div className="w-full h-1 rounded bg-slate-200" />
                    <div className="w-4/5 h-1 rounded bg-slate-200" />
                    <div className="w-full h-1 rounded bg-slate-200" />
                    <div className="w-2/3 h-1 rounded bg-slate-200" />
                  </div>

                  {/* Floating Editorial Page 2 (Top Right) */}
                  <div
                    aria-hidden="true"
                    className="hero-float-page hero-float-page-2 hidden sm:flex flex-col gap-1.5 absolute top-4 right-2 sm:right-6 w-14 h-18 bg-white/95 rounded-lg border border-[#E5DDD5] shadow-md p-2 rotate-12 z-10 pointer-events-none"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-3 h-3 rounded-full bg-[#FFF0D6] border border-[#F59E0B]/40" />
                      <span className="w-4 h-1 rounded bg-slate-200" />
                    </div>
                    <div className="w-full h-1 rounded bg-slate-200 mt-1" />
                    <div className="w-5/6 h-1 rounded bg-slate-200" />
                    <div className="w-3/4 h-1 rounded bg-slate-200" />
                  </div>

                  {/* Floating Academic Badge 3 (Bottom Left) */}
                  <div
                    aria-hidden="true"
                    className="hero-float-page hero-float-page-3 hidden sm:flex items-center gap-2 absolute bottom-12 left-0 sm:-left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl border border-[#E5DDD5] shadow-lg -rotate-6 z-20 pointer-events-none"
                  >
                    <GraduationCap className="w-4 h-4 text-[#F59E0B]" />
                    <span className="text-[10px] font-extrabold text-[#14213D]">Verified Notes</span>
                  </div>

                  {/* SUPPLIED TRANSPARENT OPEN-BOOK WITH HANDS IMAGE */}
                  <img
                    src={heroBookImg}
                    alt="Hands holding open study book floating in NoteShare"
                    onLoad={handleImageLoad}
                    className="relative z-10 w-full h-auto max-h-[300px] sm:max-h-[390px] lg:max-h-[450px] object-contain select-none pointer-events-none drop-shadow-[0_28px_42px_rgba(20,33,61,0.22)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SEARCH PANEL (Sits cleanly in front of the base of the centered hands/book) */}
        <div className="hero-search-panel relative z-30 max-w-5xl w-full mx-auto px-4 sm:px-6">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_-15px_rgba(20,33,61,0.14)] border border-[#E5DDD5] p-3 sm:p-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
              {/* Resource Name */}
              <div className="lg:col-span-4 relative">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 pl-3 mb-0.5">
                  Resource Name
                </label>
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-[#F59E0B] ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter notes, paper, or topic..."
                    className="w-full px-2.5 py-1.5 text-xs sm:text-sm bg-transparent text-[#14213D] placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="lg:col-span-3 sm:border-l border-[#E8DFD7] sm:pl-3">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full py-1.5 text-xs sm:text-sm bg-transparent text-[#14213D] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="">All Subjects</option>
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Semester */}
              <div className="lg:col-span-2 lg:border-l border-[#E8DFD7] lg:pl-3">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Semester
                </label>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full py-1.5 text-xs sm:text-sm bg-transparent text-[#14213D] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="">All Semesters</option>
                  {semesters.map((sem) => (
                    <option key={sem.id} value={sem.name}>
                      {sem.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="lg:col-span-2 sm:border-l border-[#E8DFD7] sm:pl-3">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-1.5 text-xs sm:text-sm bg-transparent text-[#14213D] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="">All Types</option>
                  <option value="Notes">Notes</option>
                  <option value="Past Papers">Past Papers</option>
                  <option value="Assignments">Assignments</option>
                  <option value="Lecture Slides">Lecture Slides</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-1 sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full lg:w-auto px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-md shadow-[#F59E0B]/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-4 h-4 lg:hidden" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* MOBILE STORYTELLING CARDS (< 768px ONLY, NO PINNING)                  */}
      {/* ===================================================================== */}
      <section className="md:hidden bg-[#F7F1ED] px-4 py-10 space-y-4 border-b border-[#E5DDD5]">
        <div className="mobile-story-card bg-white rounded-2xl p-5 border border-[#E5DDD5] shadow-xs space-y-2">
          <span className="inline-block text-[11px] font-black tracking-widest text-[#F59E0B] bg-[#FFF0D6] px-2.5 py-0.5 rounded-full">
            01 — KNOWLEDGE
          </span>
          <h3 className="text-lg font-extrabold text-[#14213D]">Everything Starts with Knowledge.</h3>
          <p className="text-xs text-[#475569] leading-relaxed">
            Access organized semester notes, verified syllabi, and faculty handouts in one clean repository.
          </p>
        </div>

        <div className="mobile-story-card bg-white rounded-2xl p-5 border border-[#E5DDD5] shadow-xs space-y-2">
          <span className="inline-block text-[11px] font-black tracking-widest text-[#F59E0B] bg-[#FFF0D6] px-2.5 py-0.5 rounded-full">
            02 — DISCOVERY
          </span>
          <h3 className="text-lg font-extrabold text-[#14213D]">Find the Resources You Need.</h3>
          <p className="text-xs text-[#475569] leading-relaxed">
            Preview PDFs instantly, save past papers, and review lecture slides before every exam.
          </p>
        </div>

        <div className="mobile-story-card bg-white rounded-2xl p-5 border border-[#E5DDD5] shadow-xs space-y-3">
          <span className="inline-block text-[11px] font-black tracking-widest text-[#F59E0B] bg-[#FFF0D6] px-2.5 py-0.5 rounded-full">
            03 — ACHIEVE
          </span>
          <h3 className="text-lg font-extrabold text-[#14213D]">Make Every Study Session Count.</h3>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F59E0B] text-white text-xs font-bold"
          >
            <span>Explore Resources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
