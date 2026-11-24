import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileCheck,
  Search,
  Download,
  Star,
  Users,
  CheckCircle,
  ShieldCheck,
  Bell,
  ArrowRight,
  TrendingUp,
  BookmarkCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { HeaderBanner } from '../../components/common/HeaderBanner';

export const About = () => {
  const featureList = [
    { title: 'Organized Notes', icon: BookOpen, desc: 'Clean, verified lecture summaries by semester and subject.' },
    { title: 'Past Papers', icon: FileCheck, desc: 'Official midterm and final term examination archives.' },
    { title: 'Powerful Search', icon: Search, desc: 'Instant filtering across subjects, codes, and years.' },
    { title: 'Easy Downloads', icon: Download, desc: 'One-click local downloads directly to your device.' },
    { title: 'Save Favorites', icon: Star, desc: 'Bookmark and access essential resources anytime.' },
    { title: 'Track Downloads', icon: TrendingUp, desc: 'Personal history log of all accessed educational documents.' },
    { title: 'Get Notifications', icon: Bell, desc: 'Real-time alerts when new exams and handouts are posted.' },
    { title: 'Trusted Platform', icon: ShieldCheck, desc: 'Academic faculty verified materials and syllabus match.' }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner (Matching Screenshot 6) */}
      <HeaderBanner
        badge="About NOTEshare"
        title="About NoteShare"
        highlightWord="NoteShare"
        subtitle="A modern platform to access and share university notes, past papers and academic resources."
        breadcrumb={[{ label: 'About' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Our Story & Our Features (Side by side matching Screenshot 6) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Our Story (col-span-5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7EAF0] shadow-sm space-y-5">
            <h2 className="text-2xl font-black text-[#14213D] flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#F4A62A] rounded-full inline-block" />
              Our Story
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              NOTEshare was created with a simple vision — to make academic resources easily accessible for every student. We understand the struggle of finding good quality notes and past papers, so we built this platform to bring everything together in one place.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you're preparing for exams, doing assignments, or just want to learn more, NOTEshare is here to support your academic journey.
            </p>

            <div className="pt-2">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-all shadow-sm hover:scale-105"
              >
                <span>Explore Resources</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Our Features (col-span-7 - 8 boxes grid matching Screenshot 6) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7EAF0] shadow-sm space-y-5">
            <h2 className="text-2xl font-black text-[#14213D] flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#F4A62A] rounded-full inline-block" />
              Our Features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {featureList.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#F4A62A] hover:bg-amber-50/30 transition-all flex items-center gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#14213D] group-hover:text-[#F4A62A] group-hover:scale-105 transition-all shadow-xs flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#14213D] group-hover:text-[#F4A62A] transition-colors truncate">
                        {feat.title}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">{feat.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Banner (Matching Screenshot 6) */}
        <div className="bg-[#0D1930] rounded-3xl p-6 sm:p-8 text-white border border-[#1F3558] shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#1F3558]">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-[#F4A62A] mb-1">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white">12K+</div>
              <div className="text-xs text-slate-300 font-medium">Registered Students</div>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="flex items-center justify-center gap-2 text-[#F4A62A] mb-1">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white">8K+</div>
              <div className="text-xs text-slate-300 font-medium">Notes & Papers</div>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="flex items-center justify-center gap-2 text-[#F4A62A] mb-1">
                <Download className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white">50K+</div>
              <div className="text-xs text-slate-300 font-medium">Downloads</div>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="flex items-center justify-center gap-2 text-[#F4A62A] mb-1">
                <Star className="w-6 h-6 fill-[#F4A62A]" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white">4.8/5</div>
              <div className="text-xs text-slate-300 font-medium">User Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Our Mission (Matching Screenshot 6) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7EAF0] shadow-sm overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
                <span className="w-2.5 h-6 bg-[#F4A62A] rounded-full inline-block" />
                Our Mission
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Our mission is to empower students with easy access to quality educational resources, helping them learn better, prepare smarter, and achieve greater success in their academic goals.
              </p>

              <div className="pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-white text-[#14213D] border border-slate-300 hover:border-[#F4A62A] transition-all shadow-xs"
                >
                  <span>Join Our Community</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F4A62A]" />
                </Link>
              </div>
            </div>

            {/* University students collaborating photo */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                  alt="Students Collaborating"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
