import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border text-sm font-medium ${
          isSuccess
            ? 'bg-[#0D1930] text-white border-[#F4A62A]/40'
            : isError
            ? 'bg-rose-900 text-white border-rose-700'
            : 'bg-[#14213D] text-white border-slate-700'
        }`}
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#F4A62A] flex-shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
