import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Clock, Building2 } from 'lucide-react';
import { HeaderBanner } from '../../components/common/HeaderBanner';
import { useApp } from '../../context/AppContext';

export const ContactUs = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Resource Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      showToast('Thank you! Your message has been received by our support team.', 'success');
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="space-y-12 pb-16">
      <HeaderBanner
        badge="Help & Contact"
        title="Contact Academic Support"
        highlightWord="Support"
        subtitle="Have questions about exams, notes, or student accounts? We are here to help."
        breadcrumb={[{ label: 'Contact Us' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card (col-span-5) */}
          <div className="lg:col-span-5 bg-[#0D1930] rounded-3xl p-8 text-white border border-[#1F3558] shadow-xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#F4A62A] uppercase tracking-wider">
                Get in Touch
              </span>
              <h2 className="text-2xl font-black text-white">
                University Academic Secretariat
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our academic repository team assists students, department heads, and faculty with resource archiving, uploads, and examination date sheets.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#1F3558] text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#14213D] text-[#F4A62A] border border-[#1F3558]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Campus Location</div>
                  <div className="text-slate-400 mt-0.5">Faculty of Computing & Academic Complex, Sector H-12, Islamabad</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#14213D] text-[#F4A62A] border border-[#1F3558]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Email Address</div>
                  <div className="text-slate-400 mt-0.5">support@noteshare.edu • registrar@noteshare.edu</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#14213D] text-[#F4A62A] border border-[#1F3558]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Telephone Support</div>
                  <div className="text-slate-400 mt-0.5">+92 (51) 9876-543 / +92 (51) 9876-544</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#14213D] text-[#F4A62A] border border-[#1F3558]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Desk Hours</div>
                  <div className="text-slate-400 mt-0.5">Monday – Friday: 8:30 AM – 5:00 PM (PKT)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[#E7EAF0] shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-[#14213D]">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900">Message Dispatched!</h3>
                <p className="text-xs text-emerald-700">
                  Thank you for reaching out. An academic coordinator will review your inquiry and reply via email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Muhammad Bilal"
                      required
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@noteshare.edu"
                      required
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Subject *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  >
                    <option value="Resource Inquiry">Question About Specific Notes / Past Paper</option>
                    <option value="Syllabus Request">Request Syllabus or Course Material</option>
                    <option value="Account Help">Student Account or Registration Support</option>
                    <option value="Report Issue">Report Duplicate or Broken Document</option>
                    <option value="Faculty Contribution">Faculty / Teacher Contributor Access</option>
                    <option value="Other">Other University Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your query..."
                    required
                    className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
