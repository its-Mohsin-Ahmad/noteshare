import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  FileCheck,
  ChevronRight,
  Code,
  Calculator,
  Atom,
  Laptop,
  Database,
  Cpu,
  Cloud,
  Network,
  Globe,
  Share2,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const renderIcon = (iconName, subjectName = '') => {
  const s = subjectName.toLowerCase();
  if (iconName === 'Calculator' || s.includes('math')) return <Calculator className="w-6 h-6 text-white" />;
  if (iconName === 'Atom' || s.includes('phy')) return <Atom className="w-6 h-6 text-white" />;
  if (iconName === 'Laptop' || s.includes('software')) return <Laptop className="w-6 h-6 text-white" />;
  if (iconName === 'Database' || s.includes('database') || s.includes('db')) return <Database className="w-6 h-6 text-white" />;
  if (iconName === 'TrendingUp' || s.includes('data structure')) return <TrendingUp className="w-6 h-6 text-white" />;
  if (iconName === 'Cpu' || s.includes('operating') || s.includes('os') || s.includes('ai')) return <Cpu className="w-6 h-6 text-white" />;
  if (iconName === 'Cloud' || s.includes('cloud')) return <Cloud className="w-6 h-6 text-white" />;
  if (iconName === 'Network' || s.includes('network')) return <Network className="w-6 h-6 text-white" />;
  if (iconName === 'Globe' || s.includes('web')) return <Globe className="w-6 h-6 text-white" />;
  if (iconName === 'Share2' || s.includes('discrete')) return <Share2 className="w-6 h-6 text-white" />;
  return <Code className="w-6 h-6 text-white" />;
};

export const SubjectCard = ({ subject }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E7EAF0] p-4 sm:p-5 hover:shadow-xl hover:border-[#F4A62A]/50 transition-all duration-300 flex flex-col justify-between group">
      <div className="flex items-start gap-4">
        {/* Navy Icon Container with Orange Bottom-Right Cutout (Image 1) */}
        <div className="relative w-14 h-14 rounded-2xl bg-[#14213D] border border-[#1F3558] flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden group-hover:scale-105 transition-transform">
          {renderIcon(subject.icon, subject.name)}
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#F4A62A]"
            style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#14213D] group-hover:text-[#F4A62A] transition-colors truncate">
              {subject.name}
            </h3>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F4A62A] group-hover:translate-x-1 transition-all" />
          </div>

          <div className="text-xs font-semibold text-slate-400 mt-0.5">
            {subject.code}
          </div>

          <div className="flex items-center gap-3 mt-2 text-xs text-[#788397]">
            <span className="flex items-center gap-1 font-medium">
              <FileText className="w-3.5 h-3.5 text-[#14213D]" />
              {subject.notesCount || 0} Notes
            </span>
            <span className="flex items-center gap-1 font-medium">
              <FileCheck className="w-3.5 h-3.5 text-[#F4A62A]" />
              {subject.papersCount || 0} Papers
            </span>
          </div>
        </div>
      </div>

      {/* View Resources Link Button */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
        <Link
          to={`/explore?subject=${encodeURIComponent(subject.name)}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14213D] group-hover:text-[#F4A62A] hover:underline"
        >
          <span>View Resources</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
