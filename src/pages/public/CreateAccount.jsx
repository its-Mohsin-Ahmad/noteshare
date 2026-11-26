import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building,
  GraduationCap,
  Calendar,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Upload,
  Camera,
  Trash2,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/common/Logo';

export const CreateAccount = () => {
  const { registerStudent, departments, degreePrograms, semesters } = useApp();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [university, setUniversity] = useState('National University of Sciences & Technology');
  const [department, setDepartment] = useState('Computer Science');
  const [degreeProgram, setDegreeProgram] = useState('BS Computer Science');
  const [semester, setSemester] = useState('Semester 1');
  const [session, setSession] = useState('2024-2028');

  // Custom User Profile Photo
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreePrivacy, setAgreePrivacy] = useState(true);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size must be less than 5MB.');
      return;
    }

    setError('');
    setAvatarFile(file);
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  const handleRemovePhoto = () => {
    setAvatarFile(null);
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Password strength logic
  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: 'Too short', color: 'bg-slate-200' };
    if (password.length < 6) return { score: 25, label: 'Weak', color: 'bg-rose-500' };
    if (password.length < 8) return { score: 50, label: 'Fair', color: 'bg-amber-500' };
    if (/[0-9]/.test(password) && /[A-Z]/.test(password)) {
      return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
    }
    return { score: 75, label: 'Good', color: 'bg-sky-500' };
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      if (!fullName.trim() || !email.trim() || !regNo.trim()) {
        setError('Please fill out all required personal fields.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms || !agreePrivacy) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await registerStudent({
        fullName,
        email,
        password,
        regNo,
        university,
        department,
        degreeProgram,
        semester,
        session
      }, avatarFile);

      // Launch celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setTimeout(() => {
        navigate('/student');
      }, 600);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-[#E7EAF0] p-6 sm:p-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo size="normal" variant="dark" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#14213D]">
            Create Student Account
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Join the NOTEshare academic network to download verified past papers, access subject notes, and save materials.
          </p>
        </div>

        {/* Step Progress Bar (Specification 11) */}
        <div className="flex items-center justify-between relative max-w-sm mx-auto">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-[#F4A62A] -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          />

          {[1, 2, 3].map((s) => (
            <div key={s} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step > s
                    ? 'bg-[#14213D] text-[#F4A62A]'
                    : step === s
                    ? 'bg-[#F4A62A] text-[#0D1930] shadow-md shadow-[#F4A62A]/30 ring-4 ring-amber-100'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-1">
                {s === 1 ? 'Personal' : s === 2 ? 'Academic' : 'Profile'}
              </span>
            </div>
          ))}
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Muhammad Bilal"
                    required
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Reg No. *</label>
                <input
                  type="text"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder="FA22-BCS-089"
                  required
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">University Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student.name@noteshare.edu"
                  required
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>
            </div>

            {/* Password strength indicator */}
            {password && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Password strength:</span>
                  <span className="font-bold">{strength.label}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: `${strength.score}%` }} />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white transition-all shadow-md flex items-center justify-center gap-2 mt-4"
            >
              <span>Continue to Academic Info</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Academic Information */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">University / Institute</label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department *</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Degree Program *</label>
                <select
                  value={degreeProgram}
                  onChange={(e) => setDegreeProgram(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                >
                  {degreePrograms.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Semester *</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                >
                  {semesters.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Session</label>
                <input
                  type="text"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  placeholder="2024-2028"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue to Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Profile Setup & Agreement */}
        {step === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Upload Your Profile Picture
              </label>
              <p className="text-[11px] text-slate-500 mb-4">
                Upload your passport-style student portrait or university photo.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl bg-[#F8F7F3] border-2 border-dashed border-slate-300 hover:border-[#F4A62A] transition-all">
                {/* Photo Preview Avatar */}
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-200 flex items-center justify-center">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <User className="w-12 h-12 stroke-[1.5]" />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2.5 rounded-full bg-[#14213D] text-[#F4A62A] hover:bg-[#F4A62A] hover:text-[#0D1930] shadow-md transition-all cursor-pointer"
                    title="Upload or change photo"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                {/* Upload action and instructions */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2.5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#14213D] text-white hover:bg-[#F4A62A] hover:text-[#0D1930] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{avatarPreview ? 'Change Photo' : 'Upload Your Photo'}</span>
                    </button>
                    {avatarPreview && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Supported: JPG, PNG, WEBP &bull; Max size: 5MB
                  </p>
                  {avatarFile && (
                    <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      ✓ {avatarFile.name} ({(avatarFile.size / 1024).toFixed(0)} KB)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded text-[#F4A62A] focus:ring-[#F4A62A] mt-0.5"
                />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#F4A62A] font-bold underline" target="_blank">
                    Terms & Conditions
                  </Link>{' '}
                  and university academic honor code.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  className="rounded text-[#F4A62A] focus:ring-[#F4A62A] mt-0.5"
                />
                <span>
                  I agree to the{' '}
                  <Link to="/privacy" className="text-[#F4A62A] font-bold underline" target="_blank">
                    Privacy Policy
                  </Link>{' '}
                  and educational data handling practices.
                </span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-all shadow-lg shadow-[#F4A62A]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading & Registering...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Complete Registration</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have a NOTEshare student account?{' '}
          <Link to="/login" className="font-bold text-[#F4A62A] hover:underline">
            Log In Here
          </Link>
        </div>
      </div>
    </div>
  );
};
