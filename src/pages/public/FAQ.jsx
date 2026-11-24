import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, BookOpen, Download, UserCheck, Shield } from 'lucide-react';
import { HeaderBanner } from '../../components/common/HeaderBanner';

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'What is NOTEshare and who can access it?',
      a: 'NOTEshare is a centralized university academic repository designed to organize lecture notes, past examination papers, handouts, and laboratory manuals. All university students and faculty can freely browse, preview, and download published materials.',
      cat: 'General'
    },
    {
      q: 'Are past examination papers verified by university faculty?',
      a: 'Yes. All past papers published on NOTEshare are verified by department coordinators, teaching assistants, or the Examination Cell to ensure they match official university syllabi and grading criteria.',
      cat: 'Exams'
    },
    {
      q: 'How can students submit notes or papers?',
      a: 'Logged-in students can visit the "My Uploads" section in the Student Portal, fill out the document details, and upload their notes or solved past papers. The submission will enter an administrative review queue before publication.',
      cat: 'Submissions'
    },
    {
      q: 'Do I need to pay to download educational materials?',
      a: 'No. NOTEshare is 100% free for educational use across all undergraduate and graduate departments in our university community.',
      cat: 'Downloads'
    },
    {
      q: 'What should I do if a file is corrupted or belongs to the wrong subject?',
      a: 'Every resource details page has a "Report Issue" button. Clicking it lets you flag the document for review by platform administrators, who can re-assign or replace the file.',
      cat: 'Quality'
    },
    {
      q: 'How does the offline / browser file download work?',
      a: 'NOTEshare uses browser IndexedDB and binary blob streams to store documents locally. When you click download, your browser instantly saves the verified PDF or DOC document directly to your device storage.',
      cat: 'Technical'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      <HeaderBanner
        badge="Frequently Asked Questions"
        title="Help & Questions"
        highlightWord="Questions"
        subtitle="Find answers to common questions about finding notes, examination papers, and uploads."
        breadcrumb={[{ label: 'FAQ' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E7EAF0] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#14213D] hover:text-[#F4A62A] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-50 text-[#F4A62A] flex items-center justify-center text-xs font-black flex-shrink-0">
                      Q
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#F4A62A] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
