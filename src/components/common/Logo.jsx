import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'normal', variant = 'light' }) => {
  const isLarge = size === 'large';
  const isDark = variant === 'dark';

  return (
    <Link to="/" className="flex items-center gap-2.5 group select-none">
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F4A62A] to-[#E0941F] shadow-md shadow-[#F4A62A]/20 transition-transform group-hover:scale-105 ${isLarge ? 'w-11 h-11' : 'w-9 h-9'}`}>
        {/* Graduation cap with paper fold icon */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`text-[#0D1930] ${isLarge ? 'w-6 h-6' : 'w-5 h-5'}`}
        >
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
        </svg>
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full border-2 border-[#F4A62A]"></span>
      </div>
      <div className="flex items-baseline font-bold tracking-tight">
        <span className={`${isDark ? 'text-[#0D1930]' : 'text-white'} ${isLarge ? 'text-2xl' : 'text-xl'}`}>Note</span>
        <span className={`text-[#F4A62A] ${isLarge ? 'text-2xl' : 'text-xl'}`}>Share</span>
      </div>
    </Link>
  );
};
