import React from 'react';
import { Bell, CheckCheck, Trash2, FileText, Megaphone, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentNotifications = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useApp();

  const studentNotifs = notifications.filter((n) => n.target === 'student');

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
            <Bell className="w-7 h-7 text-[#F4A62A]" />
            <span>Student Notification Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Stay updated with new notes uploads, approved student submissions, and examination datesheets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={clearNotifications}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-rose-600 hover:bg-rose-50"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {studentNotifs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <Bell className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-[#14213D]">No notifications yet</h3>
          <p className="text-xs text-slate-500">
            You're all caught up! New exam announcements and submission approvals will show up here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E7EAF0] overflow-hidden shadow-sm divide-y divide-slate-100">
          {studentNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors cursor-pointer ${
                !n.read ? 'bg-amber-50/40' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    n.type === 'submission'
                      ? 'bg-emerald-50 text-emerald-600'
                      : n.type === 'announcement'
                      ? 'bg-purple-50 text-purple-600'
                      : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  {n.type === 'submission' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : n.type === 'announcement' ? (
                    <Megaphone className="w-5 h-5" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#14213D]">{n.title}</span>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#F4A62A]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                  <div className="text-[10px] text-slate-400">{n.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
