import React from 'react';
import { HeaderBanner } from '../../components/common/HeaderBanner';
import { FileText, CheckCircle2 } from 'lucide-react';

export const TermsConditions = () => {
  return (
    <div className="space-y-12 pb-16">
      <HeaderBanner
        badge="Legal & Honor Code"
        title="Terms & Conditions"
        highlightWord="Conditions"
        subtitle="Review the code of academic integrity and terms governing use of NOTEshare."
        breadcrumb={[{ label: 'Terms and Conditions' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7EAF0] shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
            <FileText className="w-8 h-8 text-[#14213D]" />
            <div>
              <h2 className="text-xl font-black text-[#14213D]">Academic Honor Code & Platform Terms</h2>
              <p className="text-xs text-slate-500">University Academic Integrity Guidelines</p>
            </div>
          </div>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#14213D]">1. Permitted Academic Use</h3>
            <p>
              Materials made available through NOTEshare, including past examination papers and lecture handouts, are intended strictly for individual preparation, revision, and study assistance.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#14213D]">2. Prohibition of Exam Cheating and Live Exam Breaches</h3>
            <p>
              Accessing or uploading examination papers while an active university examination session is currently underway is strictly prohibited and constitutes an immediate violation of the university disciplinary code.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#14213D]">3. Quality and Review Approval</h3>
            <p>
              Administrative staff reserve the right to review, edit metadata, request adjustments, or remove submitted content that violates curriculum standards, academic ethics, or copyright regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-[#14213D]">4. Intellectual Property Attribution</h3>
            <p>
              Original authorship by university faculty or contributing students is preserved in resource citations. Students agree not to remove creator attributions when sharing materials with peers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
