import React from 'react';
import { HeaderBanner } from '../../components/common/HeaderBanner';
import { ShieldCheck, Lock, FileText } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <div className="space-y-12 pb-16">
      <HeaderBanner
        badge="Legal & Privacy"
        title="Privacy Policy"
        highlightWord="Policy"
        subtitle="Learn how NOTEshare handles academic profile data and uploaded documents responsibly."
        breadcrumb={[{ label: 'Privacy Policy' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7EAF0] shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
            <ShieldCheck className="w-8 h-8 text-[#F4A62A]" />
            <div>
              <h2 className="text-xl font-black text-[#14213D]">NOTEshare Academic Data Ethics</h2>
              <p className="text-xs text-slate-500">Effective Date: Academic Session 2024–2026</p>
            </div>
          </div>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#14213D]">1. Information Collection</h3>
            <p>
              NOTEshare collects student names, university emails, departmental affiliations, degree programs, and academic registration numbers strictly to personalize resource discovery and manage access to exam archives.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#14213D]">2. Browser Storage and Local Data Architecture</h3>
            <p>
              This implementation stores student profiles, favorites, download records, and system settings inside your browser using encrypted LocalStorage and IndexedDB file storage. Your documents remain under your local control.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#14213D]">3. Uploaded Educational Materials</h3>
            <p>
              When submitting student notes or examination answers, contributors confirm that the materials do not contain confidential examination leaks, unreleased grading keys, or copyrighted textbooks without proper citation.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#14213D]">4. Data Protection</h3>
            <p>
              Student emails and personal IDs are never commercialized, sold, or shared with third-party advertising services. NOTEshare is solely dedicated to academic excellence and university community support.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
